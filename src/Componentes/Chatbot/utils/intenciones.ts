const intentAliases: Record<string, string[]> = {
  feliz: ["feliz", "alegre", "contento", "contenta", "genial", "bien"],
  triste: ["triste", "mal", "desanimado", "desanimada", "llorar"],
  hambre: ["hambre", "hambriento", "antojo", "comer"],
  receta: ["receta", "cocinar", "preparar", "ingrediente", "ingredientes"],
  rapido: ["rapido", "rapida", "facil", "pronto", "minutos"],
  saludable: ["saludable", "sano", "sana", "ligero", "ensalada"],
  dulce: ["dulce", "postre", "galleta", "brownie", "chocolate"],
  salado: ["salado", "snack", "papas", "queso"],
  hola: ["hola", "buenas", "saludos", "hey"],
  gracias: ["gracias", "agradezco", "perfecto"],
};

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const inferChatbotIntent = (text: string): string | null => {
  const normalized = normalize(text);

  for (const [intent, aliases] of Object.entries(intentAliases)) {
    if (aliases.some((alias) => normalized.includes(alias))) {
      return intent;
    }
  }

  return normalized.trim() ? "default" : null;
};
