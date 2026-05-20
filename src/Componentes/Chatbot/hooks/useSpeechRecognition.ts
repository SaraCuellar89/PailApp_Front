import { useCallback, useEffect, useRef, useState } from "react";
import {
  SpeechRecognitionModule,
  SpeechRecognitionSubscription,
} from "../types";

let speechRecognitionModule: SpeechRecognitionModule | null = null;

try {
  speechRecognitionModule =
    require("expo-speech-recognition").ExpoSpeechRecognitionModule;
} catch {
  speechRecognitionModule = null;
}

type UseSpeechRecognitionProps = {
  onTranscript: (transcript: string) => void;
};

export const useSpeechRecognition = ({
  onTranscript,
}: UseSpeechRecognitionProps) => {
  const onTranscriptRef = useRef(onTranscript);
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [speechError, setSpeechError] = useState("");

  const speechRecognitionAvailable = Boolean(speechRecognitionModule);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  const stopListening = useCallback(() => {
    if (!speechRecognitionModule) return;
    speechRecognitionModule.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(async () => {
    setSpeechError("");

    if (!speechRecognitionModule) {
      setSpeechError(
        "El modulo de voz no esta disponible en esta build. Reconstruye la app nativa.",
      );
      return false;
    }

    const permission = await speechRecognitionModule.requestPermissionsAsync();
    if (!permission.granted) {
      setSpeechError("Debes permitir el uso del microfono para transcribir.");
      return false;
    }

    if (!speechRecognitionModule.isRecognitionAvailable()) {
      setSpeechError(
        "El reconocimiento de voz no esta disponible en este dispositivo.",
      );
      return false;
    }

    setLiveTranscript("");
    speechRecognitionModule.start({
      lang: "es-CO",
      interimResults: true,
      addsPunctuation: true,
      continuous: true,
      maxAlternatives: 1,
    });

    return true;
  }, []);

  const resetTranscript = useCallback(() => {
    setLiveTranscript("");
  }, []);

  useEffect(() => {
    if (!speechRecognitionModule) return;

    const subscriptions: SpeechRecognitionSubscription[] = [
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
          onTranscriptRef.current(nextTranscript);
        }
      }),
      speechRecognitionModule.addListener("error", (event: any) => {
        setIsListening(false);
        setSpeechError(event.message || "No se pudo transcribir el audio.");
      }),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
      speechRecognitionModule?.abort();
    };
  }, []);

  return {
    isListening,
    liveTranscript,
    resetTranscript,
    speechError,
    speechRecognitionAvailable,
    startListening,
    stopListening,
  };
};
