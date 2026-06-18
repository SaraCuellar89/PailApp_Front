import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { requestChatNonStream, requestChatStream } from "../api/chatbotApi";
import { ChatMessage, ChatbotUsage } from "../types";
import { createInitialAssistantMessage, createMessage } from "../utils/messages";
import { getChatbotUsage } from "../utils/usage";
import { inferChatbotIntent } from "../utils/intenciones";
import { useChatbotAudio } from "./useChatbotAudio";
import { useSpeechRecognition } from "./useSpeechRecognition";
// IMAGEN: quita estas dos líneas para desactivar imágenes
import { extraerNombrePlato, fetchImagenPlato } from "../api/imagenApi";

type UseChatbotConversationProps = {
  idUsuario?: number | string | null;
  initialMessage?: string;
  initialVoiceMode?: boolean;
  onIntencion?: (intencion: string | null) => void;
  onRespuesta?: (texto: string) => void;  // ← nuevo: texto completo de la respuesta
  onUsageChange?: (usage: ChatbotUsage) => void;
  setCambiar_tamano?: (value: boolean) => void;
};

export const useChatbotConversation = ({
  idUsuario,
  initialMessage,
  initialVoiceMode = false,
  onIntencion,
  onRespuesta,
  onUsageChange,
  setCambiar_tamano,
}: UseChatbotConversationProps) => {
  const initialMessageRef = useRef(initialMessage?.trim() || null);
  const [input, setInput] = useState("");
  const [editingUserMessageId, setEditingUserMessageId] = useState<string | null>(
    null,
  );
  const [conversationId, setConversationId] = useState<number | string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    createInitialAssistantMessage(),
  ]);

  const audio = useChatbotAudio();
  const speech = useSpeechRecognition({ onTranscript: setInput });
  const {
    isListening,
    liveTranscript,
    resetTranscript,
    speechError,
    speechRecognitionAvailable,
    startListening,
    stopListening,
  } = speech;
  const {
    lastSpokenMessageId,
    replayLastAudio,
    speakText,
    stopAudio,
  } = audio;

  const usage = useMemo(() => getChatbotUsage(messages), [messages]);

  const replaceMessageContent = useCallback((id: string, content: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, content } : msg)),
    );
  }, []);

  // IMAGEN: esta función añade imageUrl a un mensaje existente sin tocar el resto
  const setMessageImage = useCallback((id: string, imageUrl: string | null) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, imageUrl } : msg)),
    );
  }, []);

  const appendMessageContent = useCallback((id: string, delta: string) => {
    if (!delta) return;
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, content: `${msg.content}${delta}` } : msg,
      ),
    );
  }, []);

  const closeVoiceMode = useCallback(() => {
    if (isListening) {
      stopListening();
    }
    setVoiceMode(false);
  }, [isListening, stopListening]);

  const startVoiceMode = useCallback(async () => {
    const started = await startListening();
    if (!started) return;

    setCambiar_tamano?.(false);
    setVoiceMode(true);
  }, [setCambiar_tamano, startListening]);

  const toggleVoiceMode = useCallback(() => {
    if (voiceMode) {
      closeVoiceMode();
      return;
    }

    startVoiceMode().catch(() => {
      setVoiceMode(false);
    });
  }, [closeVoiceMode, startVoiceMode, voiceMode]);

  const sendMessage = useCallback(
    async (overrideMessage?: string) => {
      const mensaje = (overrideMessage ?? input).trim();
      if (!mensaje || loading) return;

      if (isListening) {
        stopListening();
      }

      await stopAudio();
      setVoiceMode(false);
      setCambiar_tamano?.(true);
      onIntencion?.(inferChatbotIntent(mensaje));

      const userMessage = createMessage("user", mensaje);
      const editingUserId = editingUserMessageId;
      const editingUserIndex = editingUserId
        ? messages.findIndex(
            (message) => message.id === editingUserId && message.role === "user",
          )
        : -1;
      const existingAssistant = editingUserIndex >= 0
        ? messages
            .slice(editingUserIndex + 1)
            .find((message) => message.role === "assistant")
        : null;
      const assistantPlaceholder = existingAssistant ?? createMessage("assistant", "");

      if (editingUserId && editingUserIndex >= 0) {
        setMessages((prev) =>
          prev.map((message) => {
            if (message.id === editingUserId) {
              return { ...message, content: mensaje };
            }

            if (message.id === assistantPlaceholder.id) {
              return { ...message, content: "", imageUrl: null };
            }

            return message;
          }),
        );
      } else {
        setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      }

      setEditingUserMessageId(null);
      setInput("");
      resetTranscript();
      setLoading(true);

      try {
        let respuestaFinal = "";

        try {
          const streamResponse = await requestChatStream(mensaje, {
            onChunk: (delta) =>
              appendMessageContent(assistantPlaceholder.id, delta),
            onDone: (respuesta) =>
              replaceMessageContent(assistantPlaceholder.id, respuesta),
            onMeta: (meta) => {
              if (meta?.conversationId) setConversationId(meta.conversationId);
            },
          }, { conversationId, idUsuario });
          respuestaFinal = streamResponse.respuesta;
          if (streamResponse.conversationId) {
            setConversationId(streamResponse.conversationId);
          }
        } catch {
          const response = await requestChatNonStream(mensaje, {
            conversationId,
            idUsuario,
          });
          respuestaFinal = response.respuesta;
          if (response.conversationId) {
            setConversationId(response.conversationId);
          }
          replaceMessageContent(assistantPlaceholder.id, respuestaFinal);
        }

        onIntencion?.(inferChatbotIntent(`${mensaje} ${respuestaFinal}`));

        // ← Dispara la cola de animaciones con el texto completo
        onRespuesta?.(respuestaFinal);

        // TTS en su propio try/catch
        try {
          await speakText(assistantPlaceholder.id, respuestaFinal);
        } catch (ttsError) {
          console.warn("TTS fallo, se continua sin audio:", ttsError);
        }

        // IMAGEN: buscar imagen del plato en paralelo, no bloquea el chat
        const nombrePlato = extraerNombrePlato(respuestaFinal);
        if (nombrePlato) {
          fetchImagenPlato(nombrePlato)
            .then((imageUrl) => setMessageImage(assistantPlaceholder.id, imageUrl))
            .catch(() => {});
        }

      } catch (error: any) {
        replaceMessageContent(
          assistantPlaceholder.id,
          error?.message || "Error al conectar con el asistente",
        );
      } finally {
        setLoading(false);
      }
    },
    [
      appendMessageContent,
      editingUserMessageId,
      conversationId,
      idUsuario,
      input,
      loading,
      messages,
      onIntencion,
      onRespuesta,
      replaceMessageContent,
      resetTranscript,
      setCambiar_tamano,
      isListening,
      setMessageImage,
      speakText,
      stopAudio,
      stopListening,
    ],
  );

  const repeatAssistantAudio = useCallback(
    async (messageId: string, content: string) => {
      if (loading) return;

      if (lastSpokenMessageId === messageId) {
        await replayLastAudio();
        return;
      }

      await speakText(messageId, content);
    },
    [lastSpokenMessageId, loading, replayLastAudio, speakText],
  );

  const editUserMessage = useCallback(
    (messageId: string) => {
      const userMessage = messages.find(
        (message) => message.id === messageId && message.role === "user",
      );
      if (!userMessage) return;

      setVoiceMode(false);
      setEditingUserMessageId(messageId);
      setInput(userMessage.content);
    },
    [messages],
  );

  const resendUserMessage = useCallback(
    (messageId: string) => {
      if (loading) return;

      const userMessage = messages.find(
        (message) => message.id === messageId && message.role === "user",
      );
      if (!userMessage) return;

      sendMessage(userMessage.content);
    },
    [loading, messages, sendMessage],
  );

  useEffect(() => {
    onUsageChange?.(usage);
  }, [onUsageChange, usage]);

  useEffect(() => {
    if (!initialVoiceMode || !speechRecognitionAvailable) return;
    startVoiceMode().catch(() => {
      setVoiceMode(false);
    });
  }, [initialVoiceMode, speechRecognitionAvailable, startVoiceMode]);

  useEffect(() => {
    const pendingInitialMessage = initialMessageRef.current;
    if (!pendingInitialMessage) return;

    initialMessageRef.current = null;
    sendMessage(pendingInitialMessage);
  }, [sendMessage]);

  return {
    input,
    isListening,
    lastSpokenMessageId,
    liveTranscript,
    loading,
    messages,
    editUserMessage,
    editingUserMessageId,
    replayLastAudio,
    repeatAssistantAudio,
    resendUserMessage,
    sendMessage,
    setInput,
    speechError,
    speechRecognitionAvailable,
    toggleVoiceMode,
    usage,
    voiceMode,
  };
};
