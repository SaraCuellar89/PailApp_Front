import type { ImagePickerAsset } from "expo-image-picker";

const PAILAPP_API_URL = "http://35.174.135.238";

export type ParsedAssistantRecipe = {
  titulo: string;
  descripcion: string;
  ingredientes: string;
  preparacion: string;
  tiempo_preparacion: string;
  tipo_tiempo: string;
  dificultad: string;
};

type SaveAssistantRecipeOptions = {
  titulo?: string;
  archivo?: ImagePickerAsset | null;
};

const cleanLine = (line: string) =>
  line
    .replace(/^#{1,6}\s*/, "")
    .replace(/^[-*]\s*/, "")
    .replace(/^\d+[.)]\s*/, "")
    .trim();

const normalizeText = (text: string) =>
  text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const hasAnySectionName = (line: string, names: string[]) => {
  const normalized = line
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return names.some((name) => normalized.includes(name));
};

const findSection = (lines: string[], sectionNames: string[]) => {
  const startIndex = lines.findIndex((line) => hasAnySectionName(line, sectionNames));
  if (startIndex < 0) return [];

  const sectionLines: string[] = [];
  const sectionHeaders = [
    "ingredientes",
    "preparacion",
    "pasos",
    "procedimiento",
    "descripcion",
  ];

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const isNextSection =
      /:$/u.test(line) || hasAnySectionName(line, sectionHeaders);

    if (sectionLines.length > 0 && isNextSection) break;
    sectionLines.push(line);
  }

  return sectionLines.map(cleanLine).filter(Boolean);
};

const getTitle = (lines: string[]) => {
  const firstUsefulLine =
    lines.find(
      (line) =>
        !hasAnySectionName(line, [
          "ingredientes",
          "preparacion",
          "pasos",
          "procedimiento",
          "descripcion",
        ]),
    ) ?? "Receta del asistente";

  return (
    cleanLine(firstUsefulLine)
      .replace(/^receta\s*(de|para)?\s*/i, "")
      .replace(/:$/u, "")
      .slice(0, 80)
      .trim() || "Receta del asistente"
  );
};

const getEstimatedTime = (text: string) => {
  const match = text.match(/(\d+)\s*(minutos|minuto|min|horas|hora|hrs|hr|h)\b/i);
  if (!match) return { tiempo_preparacion: "30", tipo_tiempo: "min" };

  const unit = match[2].toLowerCase();
  return {
    tiempo_preparacion: match[1],
    tipo_tiempo: unit.startsWith("h") ? "h" : "min",
  };
};

const getDifficulty = (text: string) => {
  const lower = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (lower.includes("dificil")) return "dificil";
  if (lower.includes("media") || lower.includes("intermedia")) return "media";
  return "facil";
};

const parseAssistantRecipe = (content: string): ParsedAssistantRecipe => {
  const lines = normalizeText(content);
  const ingredientes = findSection(lines, ["ingredientes"]);
  const preparacion = findSection(lines, [
    "preparacion",
    "pasos",
    "procedimiento",
  ]);
  const descripcion = findSection(lines, ["descripcion"]);
  const time = getEstimatedTime(content);

  return {
    titulo: getTitle(lines),
    descripcion:
      descripcion.join("\n") ||
      "Receta sugerida por el asistente de cocina de PailApp.",
    ingredientes: JSON.stringify(
      (ingredientes.length > 0
        ? ingredientes
        : ["Ingredientes sugeridos por el asistente"]
      ).map((ingrediente, index) => `${index + 1}. ${ingrediente}`),
    ),
    preparacion: preparacion.join("\n") || content,
    tiempo_preparacion: time.tiempo_preparacion,
    tipo_tiempo: time.tipo_tiempo,
    dificultad: getDifficulty(content),
  };
};

export const getAssistantRecipeDraft = (content: string) =>
  parseAssistantRecipe(content);

const findPublicationId = (payload: any): number | null => {
  if (!payload || typeof payload !== "object") return null;

  const candidates = [
    payload.id_publicacion,
    payload.publicacion_id,
    payload.id,
    payload.insertId,
    payload?.data?.id_publicacion,
    payload?.data?.publicacion_id,
    payload?.data?.id,
    payload?.data?.insertId,
    payload?.data?.publicacion?.id_publicacion,
    payload?.data?.publicacion?.publicacion_id,
  ];

  const found = candidates.find((value) => Number.isFinite(Number(value)));
  return found ? Number(found) : null;
};

const findUploadedRecipeId = async (token: string, titulo: string) => {
  const response = await fetch(`${PAILAPP_API_URL}/publicaciones/todas_usuario`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok || !data.success || !Array.isArray(data.data)) return null;

  const uploadedRecipe = data.data.find((item: any) => item?.titulo === titulo);
  return uploadedRecipe?.id_publicacion ? Number(uploadedRecipe.id_publicacion) : null;
};

export const saveAssistantRecipe = async (
  content: string,
  token: string,
  idUsuario?: number | string | null,
  options: SaveAssistantRecipeOptions = {},
) => {
  const recipe = parseAssistantRecipe(content);
  const formData = new FormData();
  const fecha_creacion = new Date().toISOString().slice(0, 19).replace("T", " ");

  formData.append("titulo", options.titulo?.trim() || recipe.titulo);
  formData.append("descripcion", recipe.descripcion);
  formData.append("ingredientes", recipe.ingredientes);
  formData.append("preparacion", recipe.preparacion);
  formData.append("tiempo_preparacion", recipe.tiempo_preparacion);
  formData.append("tipo_tiempo", recipe.tipo_tiempo);
  formData.append("dificultad", recipe.dificultad);
  formData.append("fecha_creacion", fecha_creacion);
  if (idUsuario) formData.append("id_usuario", String(idUsuario));

  if (options.archivo?.uri) {
    const uri = options.archivo.uri;
    const nombre = uri.split("/").pop() ?? "receta.jpg";
    const extension = nombre.split(".").pop() || "jpg";
    const tipo = `image/${extension === "jpg" ? "jpeg" : extension}`;

    formData.append("archivo", {
      uri,
      name: nombre,
      type: tipo,
    } as any);
  }

  const uploadResponse = await fetch(`${PAILAPP_API_URL}/publicaciones/subir`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const uploadData = await uploadResponse.json();
  if (!uploadResponse.ok || !uploadData.success) {
    throw new Error(uploadData?.message || "No se pudo subir la receta");
  }

  const publicationId =
    findPublicationId(uploadData) ??
    (await findUploadedRecipeId(token, options.titulo?.trim() || recipe.titulo));

  if (!publicationId) {
    throw new Error("La receta se subio, pero no se pudo identificar para guardarla");
  }

  const saveResponse = await fetch(`${PAILAPP_API_URL}/guardados/guardar/${publicationId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const saveData = await saveResponse.json();
  if (!saveResponse.ok || !saveData.success) {
    throw new Error(saveData?.message || "No se pudo guardar la receta");
  }

  return publicationId;
};
