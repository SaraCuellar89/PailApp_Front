import { useCallback, useEffect, useRef, useState } from "react";
import { createAudioPlayer, setAudioModeAsync } from "expo-audio";
import * as FileSystem from "expo-file-system/legacy";
import { API_BASE_URL } from "../../../../config/api";

export const useChatbotAudio = () => {
  const soundRef = useRef<any>(null);
  const lastAudioUriRef = useRef<string | null>(null);
  const [lastSpokenMessageId, setLastSpokenMessageId] = useState<string | null>(
    null,
  );

  const stopAudio = useCallback(async () => {
    if (!soundRef.current) return;

    try {
      soundRef.current.pause();
      soundRef.current.release();
    } catch {}

    soundRef.current = null;
  }, []);

  const playAudioFromUri = useCallback(
    async (audioUri: string) => {
      await stopAudio();

      const sound = createAudioPlayer({ uri: audioUri });
      sound.play();
      soundRef.current = sound;
    },
    [stopAudio],
  );

  const speakText = useCallback(
    async (messageId: string, text: string) => {
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

      const data = await response.json();

      // Si el backend indica que el audio no está disponible (key agotada, etc.)
      // simplemente salimos sin lanzar error para no interrumpir el chat
      if (!data?.audioDisponible || !data?.audioBase64) {
        console.warn("TTS omitido por el servidor:", data?.reason ?? "sin_razon");
        return;
      }

      const audioBase64 = String(data.audioBase64);

      const fileUri = `${FileSystem.cacheDirectory}tts-${Date.now()}.mp3`;
      await FileSystem.writeAsStringAsync(fileUri, audioBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await playAudioFromUri(fileUri);
      lastAudioUriRef.current = fileUri;
      setLastSpokenMessageId(messageId);
    },
    [playAudioFromUri, stopAudio],
  );

  const replayLastAudio = useCallback(async () => {
    const lastAudioUri = lastAudioUriRef.current;
    if (!lastAudioUri) return;
    await playAudioFromUri(lastAudioUri);
  }, [playAudioFromUri]);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
    }).catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return {
    lastSpokenMessageId,
    replayLastAudio,
    speakText,
    stopAudio,
  };
};
