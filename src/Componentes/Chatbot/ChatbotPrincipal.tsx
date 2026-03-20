import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  NativeEventSubscription,
  PanResponder,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { createAudioPlayer, setAudioModeAsync } from "expo-audio";
import * as FileSystem from "expo-file-system/legacy";
import { API_BASE_URL } from "../../../config/api";
import { styles } from "../../Estilos/Chatbot/ChatbotPrincipal";

let speechRecognitionModule: any = null;

try {
  speechRecognitionModule = require("expo-speech-recognition").ExpoSpeechRecognitionModule;
} catch {
  speechRecognitionModule = null;
}

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const createMessage = (
  role: ChatMessage["role"],
  content: string,
): ChatMessage => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
});

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const formatTranscript = (transcript: string) =>
  transcript.trim() || "Empieza a hablar, te estoy escuchando...";

export default function ChatbotPrincipal() {
  const route = useRoute<any>();
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef<ScrollView | null>(null);
  const soundRef = useRef<ReturnType<typeof createAudioPlayer> | null>(null);
  const lastAudioUriRef = useRef<string | null>(null);
  const lastSpokenMessageIdRef = useRef<string | null>(null);
  const initialMessageRef = useRef<string | null>(
    route.params?.mensajeInicial?.trim() || null,
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusProgress, setFocusProgress] = useState(0);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [speechError, setSpeechError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage(
      "assistant",
      "Hola, soy tu asistente de cocina. ¿Que quieres cocinar hoy?",
    ),
  ]);

  const expandedMode = voiceMode || focusProgress > 0.82;
  const robotSize = useMemo(() => {
    const compactBase = Math.min(width * 0.42, 190);
    const expandedBase = Math.min(width * 0.94, height * 0.7);
    const progress = voiceMode ? 1 : focusProgress;
    const interpolatedBase =
      compactBase + (expandedBase - compactBase) * progress;
    return Math.max(110, Math.min(expandedBase, interpolatedBase));
  }, [focusProgress, height, voiceMode, width]);

  const chatWidth = useMemo(() => {
    const base = Math.min(width * 0.88, 420);
    const scale = 1 - focusProgress * 0.22;
    return Math.max(220, Math.min(width - 24, base * scale));
  }, [focusProgress, width]);

  const chatHidden = voiceMode || focusProgress > 0.82;
  const chatOpacity = clamp(1 - focusProgress * 1.35, 0, 1);
  const speechRecognitionAvailable = Boolean(speechRecognitionModule);

  const replaceMessageContent = (id: string, content: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, content } : msg)),
    );
  };

  const appendMessageContent = (id: string, delta: string) => {
    if (!delta) return;
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, content: `${msg.content}${delta}` } : msg,
      ),
    );
  };

  const stopAudio = async () => {
    if (!soundRef.current) return;

    try {
      soundRef.current.pause();
      soundRef.current.remove();
    } catch {}

    soundRef.current = null;
  };

  const speakText = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    await stopAudio();

    const response = await fetch(`${API_BASE_URL}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: cleanText }),
    });

    if (!response.ok) {
      const raw = await response.text();
      throw new Error(raw || "No se pudo generar el audio");
    }

    const fileUri = `${FileSystem.cacheDirectory}tts-${Date.now()}.mp3`;
    const data = await response.json();
    const audioBase64 = String(data?.audioBase64 || "");

    if (!audioBase64) {
      throw new Error(data?.error || "La respuesta TTS no incluyo audio");
    }

    await FileSystem.writeAsStringAsync(fileUri, audioBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    lastAudioUriRef.current = fileUri;
    await playAudioFromUri(fileUri);
  };

  const playAudioFromUri = async (audioUri: string) => {
    await stopAudio();

    const sound = createAudioPlayer({ uri: audioUri });
    sound.play();
    soundRef.current = sound;
  };

  const replayLastAudio = async () => {
    const lastAudioUri = lastAudioUriRef.current;
    if (!lastAudioUri || loading) return;

    await playAudioFromUri(lastAudioUri);
  };

  const requestChatNonStream = async (mensaje: string) => {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje, tipoUsuario: "free" }),
    });

    const rawBody = await response.text();
    let data: any = null;

    try {
      data = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      data = { error: "Respuesta invalida del servidor" };
    }

    if (!response.ok) {
      throw new Error(
        data?.error || data?.message || "Error al conectar con el agente",
      );
    }

    return String(data?.respuesta || "No hubo respuesta del agente.");
  };

  const requestChatStream = async (
    mensaje: string,
    assistantId: string,
    onFirstChunk?: () => void,
  ) => {
    const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje, tipoUsuario: "free" }),
    });

    if (!response.ok) throw new Error("Streaming no disponible");

    const streamBody = (response as any).body;
    if (!streamBody?.getReader) throw new Error("Streaming no soportado");

    const TextDecoderCtor = (globalThis as any).TextDecoder;
    if (!TextDecoderCtor) throw new Error("TextDecoder no disponible");

    const reader = streamBody.getReader();
    const decoder = new TextDecoderCtor("utf-8");
    let buffer = "";
    let done = false;
    let fullText = "";
    let firstChunk = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      buffer += decoder.decode(value || new Uint8Array(), {
        stream: !doneReading,
      });

      let separatorIndex = buffer.indexOf("\n\n");
      while (separatorIndex !== -1) {
        const rawEvent = buffer.slice(0, separatorIndex);
        buffer = buffer.slice(separatorIndex + 2);

        const lines = rawEvent.split(/\r?\n/);
        let event = "message";
        const dataLines: string[] = [];

        for (const line of lines) {
          if (line.startsWith("event:")) {
            event = line.slice(6).trim();
          } else if (line.startsWith("data:")) {
            dataLines.push(line.slice(5).trim());
          }
        }

        if (dataLines.length) {
          const dataText = dataLines.join("\n");
          let payload: any = {};

          try {
            payload = JSON.parse(dataText);
          } catch {
            payload = {};
          }

          if (event === "chunk") {
            const delta = String(payload?.delta || "");
            if (delta) {
              if (!firstChunk) {
                firstChunk = true;
                onFirstChunk?.();
              }
              fullText += delta;
              appendMessageContent(assistantId, delta);
            }
          } else if (event === "done") {
            const respuesta = String(payload?.respuesta || fullText);
            if (respuesta && respuesta !== fullText) {
              replaceMessageContent(assistantId, respuesta);
              fullText = respuesta;
            }
          } else if (event === "error") {
            throw new Error(payload?.error || "Error interno del servidor");
          }
        }

        separatorIndex = buffer.indexOf("\n\n");
      }
    }

    const finalText = fullText.trim();
    if (!finalText) throw new Error("El stream no devolvio texto");
    return finalText;
  };

  const stopListening = () => {
    if (!speechRecognitionModule) return;
    speechRecognitionModule.stop();
    setIsListening(false);
  };

  const startListening = async () => {
    setSpeechError("");

    if (!speechRecognitionModule) {
      setSpeechError(
        "El modulo de voz no esta disponible en esta build. Reconstruye la app nativa.",
      );
      return;
    }

    const permission = await speechRecognitionModule.requestPermissionsAsync();
    if (!permission.granted) {
      setSpeechError("Debes permitir el uso del microfono para transcribir.");
      return;
    }

    if (!speechRecognitionModule.isRecognitionAvailable()) {
      setSpeechError(
        "El reconocimiento de voz no esta disponible en este dispositivo.",
      );
      return;
    }

    setVoiceMode(true);
    setLiveTranscript("");
    speechRecognitionModule.start({
      lang: "es-CO",
      interimResults: true,
      addsPunctuation: true,
      continuous: true,
      maxAlternatives: 1,
    });
  };

  const toggleVoiceMode = () => {
    if (voiceMode) {
      if (isListening) {
        stopListening();
      }
      setVoiceMode(false);
      return;
    }

    startListening().catch(() => {
      setIsListening(false);
      setSpeechError("No fue posible iniciar el microfono.");
    });
  };

  const sendMessage = async (overrideMessage?: string) => {
    const mensaje = (overrideMessage ?? input).trim();
    if (!mensaje || loading) return;

    if (isListening) {
      stopListening();
    }

    await stopAudio();
    setVoiceMode(false);
    const userMessage = createMessage("user", mensaje);
    const assistantPlaceholder = createMessage("assistant", "");

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setInput("");
    setLiveTranscript("");
    setLoading(true);

    try {
      let respuestaFinal = "";

      try {
        respuestaFinal = await requestChatStream(
          mensaje,
          assistantPlaceholder.id,
          () =>
          setLoading(false),
        );
      } catch {
        respuestaFinal = await requestChatNonStream(mensaje);
        replaceMessageContent(assistantPlaceholder.id, respuestaFinal);
      }

      await speakText(respuestaFinal);
      lastSpokenMessageIdRef.current = assistantPlaceholder.id;
    } catch (error: any) {
      replaceMessageContent(
        assistantPlaceholder.id,
        error?.message || `Error conexion (${API_BASE_URL}/api/chat)`,
      );
    } finally {
      setLoading(false);
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  };

  const robotPanResponder = useMemo(() => {
    let startValue = focusProgress;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => !voiceMode,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        !voiceMode && Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
      onPanResponderGrant: () => {
        startValue = focusProgress;
      },
      onPanResponderMove: (_, gestureState) => {
        const next = startValue + -gestureState.dy / 220;
        setFocusProgress(clamp(next, 0, 1));
      },
      onPanResponderRelease: (_, gestureState) => {
        const projected = startValue + -gestureState.dy / 220;
        const shouldExpand = projected > 0.5 || -gestureState.vy > 0.8;
        setFocusProgress(shouldExpand ? 1 : 0);
      },
    });
  }, [focusProgress, voiceMode]);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const initialMessage = initialMessageRef.current;
    if (!initialMessage) return;
    initialMessageRef.current = null;
    sendMessage(initialMessage);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, loading]);

  useEffect(() => {
    if (!speechRecognitionModule) return;

    const subscriptions: NativeEventSubscription[] = [
      speechRecognitionModule.addListener("start", () => {
        setIsListening(true);
        setSpeechError("");
      }),
      speechRecognitionModule.addListener("end", () => {
        setIsListening(false);
      }),
      speechRecognitionModule.addListener("result", (event: any) => {
        const nextTranscript = event.results
          ?.map((item: any) => item.transcript)
          .join(" ")
          .trim();

        if (nextTranscript) {
          setLiveTranscript(nextTranscript);
          setInput(nextTranscript);
        }
      }),
      speechRecognitionModule.addListener("error", (event: any) => {
        setIsListening(false);
        setSpeechError(event.message || "No se pudo transcribir el audio.");
      }),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
      speechRecognitionModule.abort();
    };
  }, []);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 72}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.robotGestureArea,
            expandedMode && styles.robotGestureAreaExpanded,
          ]}
          {...robotPanResponder.panHandlers}
        >
          <Text style={[styles.gestureHint, expandedMode && styles.hiddenHint]}>
            {voiceMode
              ? "Habla y veras tu mensaje en vivo"
              : "Desliza el personaje hacia arriba o abajo"}
          </Text>

          <Image
            source={require("../../Img/robotito1.png")}
            style={[
              styles.robot,
              expandedMode && styles.robotExpanded,
              voiceMode && styles.robotVoiceMode,
              { width: robotSize, height: robotSize * 0.78 },
            ]}
            resizeMode="contain"
          />
        </View>

        {voiceMode ? (
          <View style={styles.voicePanel}>
            <Text style={styles.voiceStatus}>
              {isListening ? "Escuchando..." : "Microfono listo"}
            </Text>
            <Text style={styles.voiceTranscript}>
              {formatTranscript(liveTranscript)}
            </Text>
            {speechError ? (
              <Text style={styles.voiceError}>{speechError}</Text>
            ) : null}
          </View>
        ) : !chatHidden ? (
          <View style={[styles.chatBox, { width: chatWidth, opacity: chatOpacity }]}>
            <ScrollView
              ref={scrollRef}
              style={styles.scroll}
              contentContainerStyle={styles.chatContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) =>
                message.content ? (
                  <View
                    key={message.id}
                    style={[
                      styles.bubble,
                      message.role === "user"
                        ? styles.userBubble
                        : styles.botBubble,
                    ]}
                  >
                    <Text style={styles.bubbleText}>{message.content}</Text>
                    {message.role === "assistant" &&
                    lastSpokenMessageIdRef.current === message.id ? (
                      <TouchableOpacity
                        style={styles.replayButton}
                        onPress={() => replayLastAudio().catch(() => {})}
                        disabled={loading}
                      >
                        <Text
                          style={[
                            styles.replayButtonText,
                            loading && styles.iconDisabled,
                          ]}
                        >
                          Repetir audio
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : null,
              )}

              {loading && (
                <View
                  style={[styles.bubble, styles.botBubble, styles.loadingBubble]}
                >
                  <ActivityIndicator size="small" color="#000" />
                  <Text style={styles.loadingText}>Pensando...</Text>
                </View>
              )}
            </ScrollView>
          </View>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, voiceMode && styles.inputVoiceMode]}
          placeholder={voiceMode ? "Tu voz aparecera aqui..." : "Escribe tu mensaje..."}
          placeholderTextColor="#666"
          value={input}
          onChangeText={setInput}
          editable={!loading}
          onSubmitEditing={() => sendMessage()}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={toggleVoiceMode}
          disabled={loading || !speechRecognitionAvailable}
        >
          <Image
            source={require("../../Img/icono-micro.png")}
            style={[
              styles.iconButton,
              loading && styles.iconDisabled,
              voiceMode && styles.iconActive,
              !speechRecognitionAvailable && styles.iconDisabled,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendMessage()} disabled={loading}>
          <Image
            source={require("../../Img/icono-enviado.png")}
            style={[styles.iconButton, loading && styles.iconDisabled]}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
