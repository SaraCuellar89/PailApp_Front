export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  // IMAGEN: campo opcional para la imagen del plato (Spoonacular)
  // Para quitar la funcionalidad basta con ignorar este campo en ChatBot.tsx
  imageUrl?: string | null;
};

export type ChatbotUsage = {
  usedTokens: number;
  remainingTokens: number;
  progress: number;
  remainingInteractions: number;
};

export type SpeechRecognitionPermission = {
  granted: boolean;
};

export type SpeechRecognitionSubscription = {
  remove: () => void;
};

export type SpeechRecognitionModule = {
  requestPermissionsAsync: () => Promise<SpeechRecognitionPermission>;
  isRecognitionAvailable: () => boolean;
  start: (options: Record<string, unknown>) => void;
  stop: () => void;
  abort: () => void;
  addListener: (
    eventName: string,
    listener: (event: any) => void,
  ) => SpeechRecognitionSubscription;
};
