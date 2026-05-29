// ─────────────────────────────────────────────────────────────────────────────
// imagenApi.ts
// Consulta la imagen de un plato al backend del agente.
// PARA DESACTIVAR: borra este archivo y quita las referencias en
// useChatbotConversation.ts y ChatBot.tsx marcadas con // IMAGEN
// ─────────────────────────────────────────────────────────────────────────────

import { API_BASE_URL } from "../../../../config/api";

// Emojis de comida que el agente usa al inicio del nombre del plato
const FOOD_EMOJI_REGEX =
  /[\u{1F32E}-\u{1F37F}\u{1F950}-\u{1F96F}\u{1F980}-\u{1F9FF}\u{2615}\u{1F374}\u{1F35C}-\u{1F364}\u{1F372}\u{1F373}]/u;

/**
 * Extrae el nombre del plato de la respuesta del agente.
 * Busca la línea que empieza con un emoji de comida (formato del agente: "🍲 Nombre / Variante").
 * Toma solo la primera variante (antes de "/") y limpia emojis y espacios.
 */
export function extraerNombrePlato(respuesta: string): string | null {
  const lineas = respuesta.split("\n");

  for (const linea of lineas) {
    const stripped = linea.trim();
    if (FOOD_EMOJI_REGEX.test(stripped)) {
      // Quitar el emoji inicial y tomar solo el primer nombre (antes de "/")
      const sinEmoji = stripped
        .replace(FOOD_EMOJI_REGEX, "")
        .split("/")[0]
        .replace(/[\u{1F300}-\u{1FFFF}]/gu, "") // quitar cualquier emoji restante
        .trim();
      if (sinEmoji.length > 2) return sinEmoji;
    }
  }

  return null;
}

/**
 * Pide la imagen al endpoint GET /api/imagen?plato=...
 * Retorna la URL o null si no hay resultado o falla la petición.
 */
export async function fetchImagenPlato(nombrePlato: string): Promise<string | null> {
  try {
    const url = `${API_BASE_URL}/api/imagen?plato=${encodeURIComponent(nombrePlato)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) } as any);
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.imageUrl === "string" ? data.imageUrl : null;
  } catch {
    return null;
  }
}
