import { ChatMessage, ChatbotUsage } from "../types";

export const MAX_SESSION_TOKENS    = 3600; // 8 interacciones × 450 tokens
export const TOKENS_PER_INTERACTION = 450;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const estimateTokens = (text: string) =>
  Math.max(0, Math.ceil(text.trim().length / 4));

export const getChatbotUsage = (messages: ChatMessage[]): ChatbotUsage => {
  const usedTokens = messages.reduce(
    (total, message) => total + estimateTokens(message.content),
    0,
  );
  const remainingTokens = Math.max(0, MAX_SESSION_TOKENS - usedTokens);

  return {
    usedTokens,
    remainingTokens,
    progress: clamp(usedTokens / MAX_SESSION_TOKENS, 0, 1),
    remainingInteractions: Math.max(
      0,
      Math.floor(remainingTokens / TOKENS_PER_INTERACTION),
    ),
  };
};
