import { ChatMessage, ChatRole } from "../types";

export const createMessage = (
  role: ChatRole,
  content: string,
): ChatMessage => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
});

export const createInitialAssistantMessage = () =>
  createMessage(
    "assistant",
    "Hola, soy tu asistente de cocina. Que quieres cocinar hoy?",
  );
