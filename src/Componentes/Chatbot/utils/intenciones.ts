const intentAliases: Record<string, string[]> = {
  feliz:     ["feliz", "alegre", "contento", "contenta", "genial", "bien", "excelente", "perfecto", "buenisimo"],
  triste:    ["triste", "mal", "desanimado", "desanimada", "llorar", "deprimido", "deprimida"],
  enojado:   ["enojado", "molesto", "molesta", "fastidio", "rabia", "odio", "no me gusta", "pesimo", "horrible"],
  hambre:    ["hambre", "hambriento", "antojo", "comer", "tengo ganas"],
  receta:    ["receta", "cocinar", "preparar", "ingrediente", "ingredientes", "como hago", "como preparo"],
  rapido:    ["rapido", "rapida", "facil", "pronto", "minutos", "sencillo", "rapido de hacer"],
  saludable: ["saludable", "sano", "sana", "ligero", "ensalada", "bajo en calorias", "fitness"],
  dulce:     ["dulce", "postre", "galleta", "brownie", "chocolate", "torta", "pastel"],
  salado:    ["salado", "snack", "papas", "queso", "cracker"],
  hola:      ["hola", "buenas", "saludos", "hey", "buenos dias", "buenas tardes", "buenas noches"],
  gracias:   ["gracias", "agradezco", "perfecto", "genial gracias", "muchas gracias"],
  victoria:  ["listo", "perfecto", "excelente", "eso es todo", "guardado", "guardada"],
};

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Retorna la primera intención detectada (compatibilidad con el flujo anterior) */
export const inferChatbotIntent = (text: string): string | null => {
  const normalized = normalize(text);
  for (const [intent, aliases] of Object.entries(intentAliases)) {
    if (aliases.some((alias) => normalized.includes(alias))) {
      return intent;
    }
  }
  return normalized.trim() ? "default" : null;
};

/**
 * Retorna TODAS las intenciones encontradas en el texto, en orden de aparición.
 * Sirve para armar una cola de animaciones dinámica.
 * Máximo 4 intenciones para no saturar.
 */
export const inferirTodasLasIntenciones = (text: string): string[] => {
  const normalized = normalize(text);
  const encontradas: string[] = [];

  for (const [intent, aliases] of Object.entries(intentAliases)) {
    if (aliases.some((alias) => normalized.includes(alias))) {
      encontradas.push(intent);
      if (encontradas.length >= 4) break;
    }
  }

  return encontradas.length > 0 ? encontradas : ["default"];
};
