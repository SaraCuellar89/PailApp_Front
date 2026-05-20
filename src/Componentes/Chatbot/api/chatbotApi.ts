import { API_BASE_URL } from "../../../../config/api";

type StreamHandlers = {
  onChunk: (delta: string) => void;
  onDone: (respuesta: string, payload?: any) => void;
  onFirstChunk?: () => void;
  onMeta?: (payload: any) => void;
};

type ChatRequestOptions = {
  conversationId?: number | string | null;
  idUsuario?: number | string | null;
  nuevaConversacion?: boolean;
};

const parseJsonSafely = (rawBody: string) => {
  try {
    return rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return { error: "Respuesta invalida del servidor" };
  }
};

const getChatPayload = (
  mensaje: string,
  { conversationId, idUsuario, nuevaConversacion }: ChatRequestOptions,
) => {
  if (!idUsuario) {
    throw new Error("Inicia sesion para usar el asistente.");
  }

  return {
    mensaje,
    idUsuario,
    ...(conversationId ? { conversationId } : {}),
    ...(nuevaConversacion ? { nuevaConversacion } : {}),
  };
};

export const requestChatNonStream = async (
  mensaje: string,
  options: ChatRequestOptions = {},
) => {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getChatPayload(mensaje, options)),
  });

  const rawBody = await response.text();
  const data = parseJsonSafely(rawBody);

  if (!response.ok) {
    throw new Error(
      data?.error || data?.message || "Error al conectar con el agente",
    );
  }

  return {
    ...data,
    respuesta: String(data?.respuesta || "No hubo respuesta del agente."),
  };
};

export const requestChatStream = async (
  mensaje: string,
  handlers: StreamHandlers,
  options: ChatRequestOptions = {},
) => {
  const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getChatPayload(mensaje, options)),
  });

  if (!response.ok) throw new Error("Streaming no disponible");

  const streamBody = (response as any).body;
  if (!streamBody?.getReader) throw new Error("Streaming no soportado");

  const TextDecoderCtor = (globalThis as any).TextDecoder;
  if (!TextDecoderCtor) throw new Error("TextDecoder no disponible");

  const reader = streamBody.getReader();
  const decoder = new TextDecoderCtor("utf-8");
  let buffer = "";
  let done = false;
  let fullText = "";
  let firstChunk = false;
  let metadata: any = {};

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    buffer += decoder.decode(value || new Uint8Array(), {
      stream: !doneReading,
    });

    let separatorIndex = buffer.indexOf("\n\n");
    while (separatorIndex !== -1) {
      const rawEvent = buffer.slice(0, separatorIndex);
      buffer = buffer.slice(separatorIndex + 2);

      const lines = rawEvent.split(/\r?\n/);
      let event = "message";
      const dataLines: string[] = [];

      for (const line of lines) {
        if (line.startsWith("event:")) {
          event = line.slice(6).trim();
        } else if (line.startsWith("data:")) {
          dataLines.push(line.slice(5).trim());
        }
      }

      if (dataLines.length) {
        const dataText = dataLines.join("\n");
        const payload = parseJsonSafely(dataText);

        if (event === "meta") {
          metadata = { ...metadata, ...payload };
          handlers.onMeta?.(payload);
        } else if (event === "chunk") {
          const delta = String(payload?.delta || "");
          if (delta) {
            if (!firstChunk) {
              firstChunk = true;
              handlers.onFirstChunk?.();
            }
            fullText += delta;
            handlers.onChunk(delta);
          }
        } else if (event === "done") {
          const respuesta = String(payload?.respuesta || fullText);
          metadata = { ...metadata, ...payload };
          if (respuesta && respuesta !== fullText) {
            fullText = respuesta;
            handlers.onDone(respuesta, payload);
          }
        } else if (event === "error") {
          throw new Error(payload?.error || "Error interno del servidor");
        }
      }

      separatorIndex = buffer.indexOf("\n\n");
    }
  }

  const finalText = fullText.trim();
  if (!finalText) throw new Error("El stream no devolvio texto");
  return {
    ...metadata,
    respuesta: finalText,
  };
};
