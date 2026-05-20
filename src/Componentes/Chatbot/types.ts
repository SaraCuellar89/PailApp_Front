export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
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
