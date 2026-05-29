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
 * Busca la línea que empieza con un emoji de comida.
 */
export function extraerNombrePlato(respuesta: string): string | null {
  const lineas = respuesta.split("\n");

  for (const linea of lineas) {
    const stripped = linea.trim();
    if (FOOD_EMOJI_REGEX.test(stripped)) {
      const sinEmoji = stripped
        .replace(FOOD_EMOJI_REGEX, "")
        .split("/")[0]
        .replace(/[\u{1F300}-\u{1FFFF}]/gu, "")
        .trim();
      if (sinEmoji.length > 2) return sinEmoji;
    }
  }

  return null;
}

/**
 * Pide la imagen al endpoint GET /api/imagen?plato=...
 * Retorna la URL o null si no hay resultado o falla la peticin.
 *
 * NOTA: No usamos AbortSignal.timeout() porque no est disponible
 * en todas las versiones de Hermes/React Native. Usamos setTimeout manual.
 */
export async function fetchImagenPlato(nombrePlato: string): Promise<string | null> {
  const url = `${API_BASE_URL}/api/imagen?plato=${encodeURIComponent(nombrePlato)}`;
  console.log(`[IMAGEN] Buscando imagen para: "${nombrePlato}" -> ${url}`);

  // Timeout manual compatible con React Native / Hermes
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[IMAGEN] HTTP ${res.status} para "${nombrePlato}"`);
      return null;
    }

    const data = await res.json();
    const imageUrl = typeof data?.imageUrl === "string" ? data.imageUrl : null;
    console.log(`[IMAGEN] Resultado para "${nombrePlato}": ${imageUrl ?? "null"}`);
    return imageUrl;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn(`[IMAGEN] Error para "${nombrePlato}": ${err?.message}`);
    return null;
  }
}
