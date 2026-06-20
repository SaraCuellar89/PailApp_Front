const intentAliases: Record<string, string[]> = {
  feliz: [
    "feliz", "alegre", "contento", "contenta", "genial", "bien", "excelente",
    "perfecto", "buenisimo", "buenisima", "encantado", "encantada", "emocionado",
    "emocionada", "felicidad", "maravilloso", "maravillosa", "chevere", "bacano",
    "bacana", "chido", "chida", "increible", "fantastico", "fantastica",
    "satisfecho", "satisfecha", "animado", "animada", "optimista", "positivo",
    "positiva", "entusiasmado", "entusiasmada", "me alegra", "que bueno",
    "que rico", "que bien", "me encanta", "me gusta", "estoy bien",
  ],
  triste: [
    "triste", "mal", "desanimado", "desanimada", "llorar", "deprimido",
    "deprimida", "melancolico", "melancolica", "nostalgia", "nostalgico",
    "nostalgica", "decaido", "decaida", "abatido", "abatida", "apenado",
    "apenada", "amargado", "amargada", "desconsolado", "desconsolada",
    "afligido", "afligida", "angustiado", "angustiada", "cabizbajo",
    "cabisbaja", "sin ganas", "no tengo ganas", "que tristeza", "que pena",
    "me siento mal", "estoy mal", "muy mal", "me cayo el mundo",
  ],
  enojado: [
    "enojado", "enojada", "molesto", "molesta", "fastidio", "rabia", "odio",
    "no me gusta", "pesimo", "pesima", "horrible", "furioso", "furiosa",
    "irritado", "irritada", "frustrado", "frustrada", "indignado", "indignada",
    "harto", "harta", "hastiado", "hastiada", "que rabia", "que fastidio",
    "me tiene cansado", "me tiene cansada", "no aguanto", "no soporto",
    "me irrita", "me molesta", "estoy harto", "estoy harta", "que asco",
    "desastre", "fatal", "terrible", "detesto", "aborrezco",
  ],
  hambre: [
    "hambre", "hambriento", "hambrienta", "antojo", "comer", "tengo ganas",
    "muerto de hambre", "muerta de hambre", "me muero de hambre", "comida",
    "algo de comer", "que comer", "para comer", "que rico comer", "me provoca",
    "se me antoja", "quisiera comer", "quiero comer", "voy a comer",
    "hora de comer", "lista para comer", "listo para comer", "pedir comida",
    "pedir algo", "quiero algo", "tengo mucha hambre", "estoy con hambre",
    "me da hambre", "apetito", "apetitoso", "apetitosa",
  ],
  receta: [
    "receta", "cocinar", "preparar", "ingrediente", "ingredientes",
    "como hago", "como preparo", "como se hace", "como se cocina",
    "como se prepara", "paso a paso", "instrucciones", "modo de preparacion",
    "preparacion", "elaboracion", "como elaborar", "me enseñas", "ensenme",
    "dame una receta", "quiero la receta", "dime como", "explicame como",
    "que necesito para", "cuanto tiempo se cocina", "cuanto tiempo tarda",
    "a que temperatura", "en el horno", "en la olla", "en el sarten",
    "en la freidora", "al vapor", "a la plancha", "a la parrilla",
    "hervir", "freir", "saltear", "hornear", "mezclar", "batir",
  ],
  rapido: [
    "rapido", "rapida", "facil", "pronto", "minutos", "sencillo", "sencilla",
    "rapido de hacer", "sin complicaciones", "en poco tiempo", "express",
    "economico de tiempo", "ahorra tiempo", "en menos de", "media hora",
    "cinco minutos", "diez minutos", "veinte minutos", "treinta minutos",
    "sin esfuerzo", "sin mucho esfuerzo", "practico", "practica",
    "sin complicarse", "simple", "simplemente", "de forma rapida",
    "lo mas rapido", "lo antes posible", "urgente", "de emergencia",
    "de un momento a otro", "de inmediato", "ya", "ahorita",
  ],
  saludable: [
    "saludable", "sano", "sana", "ligero", "ligera", "ensalada", "bajo en calorias",
    "fitness", "dieta", "a dieta", "light", "nutritivo", "nutritiva",
    "balanceado", "balanceada", "sin grasa", "sin azucar", "sin sal",
    "bajo en sodio", "bajo en grasa", "bajo en carbohidratos", "proteina",
    "vitaminas", "minerales", "fibra", "antioxidante", "organico", "organica",
    "natural", "sin procesados", "sin conservantes", "vegano", "vegana",
    "vegetariano", "vegetariana", "sin gluten", "sin lactosa", "keto",
    "paleo", "para bajar de peso", "para subir de peso", "para ganar musculo",
    "comer bien", "alimentacion sana", "comida sana", "comida saludable",
  ],
  dulce: [
    "dulce", "postre", "galleta", "brownie", "chocolate", "torta", "pastel",
    "bizcocho", "queque", "cupcake", "muffin", "donut", "dona", "helado",
    "sorbete", "gelatina", "flan", "pudding", "cheesecake", "mousse",
    "tarta", "pie", "budin", "panque", "churros", "crepe", "waffle",
    "pancake", "mermelada", "confitura", "caramelo", "toffee", "trufas",
    "bombones", "chupeta", "gomitas", "marshmallows", "algo dulce",
    "antojo dulce", "se me antoja algo dulce", "quiero algo dulce",
    "postre rapido", "postre facil", "miel", "azucar",
  ],
  salado: [
    "salado", "snack", "papas", "queso", "cracker", "pizza", "hamburguesa",
    "hot dog", "perro caliente", "sanwich", "sandwich", "empanada",
    "arepa", "tacos", "burritos", "nachos", "guacamole", "salsas",
    "alitas", "wings", "nuggets", "deditos", "croquetas", "tequeños",
    "patacones", "tostones", "yuca", "maiz", "palomitas", "popcorn",
    "mariscos", "ceviche", "chorizos", "salchichas", "jamon", "salchicha",
    "algo salado", "antojo salado", "se me antoja algo salado",
    "quiero algo salado", "bocados", "picada", "picar algo",
  ],
  gracias: [
    "gracias", "agradezco", "muchas gracias", "mil gracias", "te agradezco",
    "muy amable", "que amable", "gentil", "que gentil", "bondadoso",
    "bondadosa", "generoso", "generosa", "excelente ayuda", "buena ayuda",
    "de nada", "con gusto", "servicio excelente", "me ayudaste mucho",
    "me sirvio mucho", "fue util", "muy util", "lo que necesitaba",
    "justo lo que buscaba", "perfecto gracias", "listo gracias",
    "ya con eso", "eso era todo", "suficiente", "es todo por ahora",
  ],
  victoria: [
    "listo", "perfecto", "excelente", "eso es todo", "guardado", "guardada",
    "lo logramos", "lo logre", "lo logre", "consegui", "conseguimos",
    "funciono", "resulto", "quedo bien", "quedo perfecto", "salio bien",
    "salio perfecto", "exitoso", "exitosa", "bien hecho", "lo hice",
    "lo hicimos", "completado", "completada", "terminado", "terminada",
    "finalizado", "finalizada", "logro", "meta cumplida", "objetivo cumplido",
    "que logro", "lo consegui", "lo conseguimos", "mision cumplida",
    "era lo que buscaba", "era lo que necesitaba", "perfecto asi",
  ],
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