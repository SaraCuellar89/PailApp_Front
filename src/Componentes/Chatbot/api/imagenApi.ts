// ─────────────────────────────────────────────────────────────────────────────
// imagenApi.ts
// Consulta la imagen de un plato al backend del agente.
// PARA DESACTIVAR: borra este archivo y quita las referencias en
// useChatbotConversation.ts y ChatBot.tsx marcadas con // IMAGEN
// ─────────────────────────────────────────────────────────────────────────────

import { AGENTE_BASE_URL } from "./chatbotApi";

/**
 * Extrae el primer nombre de plato de la respuesta del agente.
 * Busca la línea con emoji de comida (ej: "🍲 Arroz con pollo / ...").
 */
export function extraerNombrePlato(respuesta: string): string | null {
  const matchEmoji = respuesta.match(
    /[\u{1F32E}-\u{1F37F}\u{1F950}-\u{1F96F}\u{1F980}-\u{1F9FF}\u2615\u{1F374}\u{1F35C}-\u{1F364}]\s*([^\n\/]+)/u,
  );
  if (matchEmoji) return matchEmoji[1].split("/")[0].trim();
  return null;
}

/**
 * Pide la imagen al endpoint GET /api/imagen?plato=...
 * Retorna la URL o null si no hay resultado.
 */
export async function fetchImagenPlato(nombrePlato: string): Promise<string | null> {
  try {
    const url = `${AGENTE_BASE_URL}/api/imagen?plato=${encodeURIComponent(nombrePlato)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) } as any);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.imageUrl || null;
  } catch {
    return null;
  }
}
