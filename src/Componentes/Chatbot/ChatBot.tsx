import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import Texto from "../Compartidos/Texto";
import estilos_prueba_chatbot from "../../Estilos/Chatbot/prueba_chatbot_css";
import { ChatbotUsage } from "./types";
import { useChatbotConversation } from "./hooks/useChatbotConversation";
import { saveAssistantRecipe } from "./api/saveAssistantRecipe";
import { Mensaje_Toast } from "../../utils/Mensaje_Toast";
import AssistantRecipeSaveModal from "./AssistantRecipeSaveModal";

const TypingIndicator = () => {
  const dots = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    const animations = dots.map((dot, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 120),
          Animated.timing(dot, {
            toValue: 1,
            duration: 240,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 240,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.delay(240),
        ]),
      ),
    );

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [dots]);

  return (
    <View style={estilos_prueba_chatbot.fila_mensaje}>
      <View
        style={[
          estilos_prueba_chatbot.mensaje_bot,
          estilos_prueba_chatbot.burbuja_escribiendo,
        ]}
      >
        {dots.map((dot, index) => (
          <Animated.View
            key={index}
            style={[
              estilos_prueba_chatbot.punto_escribiendo,
              {
                opacity: dot.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.35, 1],
                }),
                transform: [
                  {
                    translateY: dot.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -4],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

type ChatBotProps = {
  avatarUsuario?: string | null;
  idUsuario?: number | string | null;
  tokenUsuario?: string | null;
  initialMessage?: string;
  initialVoiceMode?: boolean;
  onIntencion?: (intencion: string | null) => void;
  onUsageChange?: (usage: ChatbotUsage) => void;
  setCambiar_tamano?: (value: boolean) => void;
};

export default function ChatBot({
  avatarUsuario,
  idUsuario,
  tokenUsuario,
  initialMessage,
  initialVoiceMode = false,
  onIntencion,
  onUsageChange,
  setCambiar_tamano,
}: ChatBotProps) {
  const { height } = useWindowDimensions();
  const scrollRef = useRef<ScrollView | null>(null);
  const [mensajes_guardados, setMensajes_guardados] = useState<string[]>([]);
  const [mensaje_guardando, setMensaje_guardando] = useState<string | null>(null);
  const [mensaje_para_guardar, setMensaje_para_guardar] = useState<{
    id: string;
    content: string;
  } | null>(null);
  const chatbot = useChatbotConversation({
    idUsuario,
    initialMessage,
    initialVoiceMode,
    onIntencion,
    onUsageChange,
    setCambiar_tamano,
  });

  const mensajes_visibles = chatbot.messages.slice(1);
  const mostrar_conversacion = mensajes_visibles.length > 0;

  const enviar = () => {
    chatbot.sendMessage();
  };

  const guardar_receta = async (
    idMensaje: string,
    contenido: string,
    options: Parameters<typeof saveAssistantRecipe>[3],
  ) => {
    if (!tokenUsuario || mensaje_guardando) return;

    try {
      setMensaje_guardando(idMensaje);
      await saveAssistantRecipe(contenido, tokenUsuario, idUsuario, options);
      setMensajes_guardados((prev) => [...prev, idMensaje]);
      setMensaje_para_guardar(null);
      Mensaje_Toast.exito("Receta guardada en Mis Platos");
    } catch (error: any) {
      Mensaje_Toast.error(error?.message || "No se pudo guardar la receta");
    } finally {
      setMensaje_guardando(null);
    }
  };

  const avatarSource = avatarUsuario
    ? { uri: avatarUsuario }
    : require("../../Img/icono-usuario.png");

  return (
    <View style={estilos_prueba_chatbot.contenedor}>
      {mostrar_conversacion ? (
        <ScrollView
          ref={scrollRef}
          style={[estilos_prueba_chatbot.caja_chat, { height: height * 0.3 }]}
          contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
          nestedScrollEnabled={true}
        >
          {mensajes_visibles.map((mensaje) =>
            mensaje.content ? (
              <View
                key={mensaje.id}
                style={[
                  estilos_prueba_chatbot.fila_mensaje,
                  mensaje.role === "user" &&
                    estilos_prueba_chatbot.fila_mensaje_usuario,
                ]}
              >
                <View
                  style={[
                    mensaje.role === "assistant"
                      ? estilos_prueba_chatbot.mensaje_bot
                      : estilos_prueba_chatbot.mensaje_usuario,
                  ]}
                >
                  <Texto style={estilos_prueba_chatbot.texto_mensaje}>
                    {mensaje.content}
                  </Texto>

                  {/* IMAGEN: bloque de imagen del plato. Quita este bloque para desactivar */}
                  {mensaje.role === "assistant" && mensaje.imageUrl ? (
                    <Image
                      source={{ uri: mensaje.imageUrl }}
                      style={{
                        width: "100%",
                        height: 180,
                        borderRadius: 10,
                        marginTop: 8,
                      }}
                      resizeMode="cover"
                    />
                  ) : null}
                  {/* FIN IMAGEN */}

                  {mensaje.role === "assistant" ? (
                    <>
                      <View style={estilos_prueba_chatbot.fila_acciones_mensaje}>
                        <TouchableOpacity
                          onPress={() =>
                            chatbot
                              .repeatAssistantAudio(mensaje.id, mensaje.content)
                              .catch(() => {})
                          }
                          disabled={chatbot.loading}
                          style={estilos_prueba_chatbot.boton_accion_mensaje}
                        >
                          <Image
                            source={require("../../Img/escuchar.png")}
                            resizeMode="contain"
                            style={[
                              estilos_prueba_chatbot.icono_accion_mensaje,
                              chatbot.loading &&
                                estilos_prueba_chatbot.icono_deshabilitado,
                            ]}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            setMensaje_para_guardar({
                              id: mensaje.id,
                              content: mensaje.content,
                            })
                          }
                          disabled={
                            chatbot.loading ||
                            !tokenUsuario ||
                            mensaje_guardando === mensaje.id ||
                            mensajes_guardados.includes(mensaje.id)
                          }
                          style={estilos_prueba_chatbot.boton_accion_mensaje}
                        >
                          <Image
                            source={
                              mensajes_guardados.includes(mensaje.id)
                                ? require("../../Img/icono-guardar-relleno.png")
                                : require("../../Img/icono-guardar.png")
                            }
                            resizeMode="contain"
                            style={[
                              estilos_prueba_chatbot.icono_accion_mensaje,
                              (chatbot.loading ||
                                !tokenUsuario ||
                                mensaje_guardando === mensaje.id) &&
                                estilos_prueba_chatbot.icono_deshabilitado,
                            ]}
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <View style={estilos_prueba_chatbot.fila_acciones_mensaje}>
                      <TouchableOpacity
                        onPress={() => chatbot.editUserMessage(mensaje.id)}
                        disabled={chatbot.loading}
                        style={estilos_prueba_chatbot.boton_accion_mensaje}
                      >
                        <Image
                          source={require("../../Img/icono-editar.png")}
                          resizeMode="contain"
                          style={[
                            estilos_prueba_chatbot.icono_accion_mensaje,
                            chatbot.loading &&
                              estilos_prueba_chatbot.icono_deshabilitado,
                          ]}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => chatbot.resendUserMessage(mensaje.id)}
                        disabled={chatbot.loading}
                        style={estilos_prueba_chatbot.boton_accion_mensaje}
                      >
                        <Image
                          source={require("../../Img/icono-enviado.png")}
                          resizeMode="contain"
                          style={[
                            estilos_prueba_chatbot.icono_accion_mensaje,
                            chatbot.loading &&
                              estilos_prueba_chatbot.icono_deshabilitado,
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {mensaje.role === "user" ? (
                  <Image
                    source={avatarSource}
                    resizeMode="contain"
                    style={estilos_prueba_chatbot.icono_usuario_mensaje}
                  />
                ) : null}
              </View>
            ) : null,
          )}

          {chatbot.loading ? <TypingIndicator /> : null}
        </ScrollView>
      ) : null}

      {chatbot.voiceMode ? (
        <View style={estilos_prueba_chatbot.contenedor_input}>
          <View style={estilos_prueba_chatbot.caja_hablar}>
            <LottieView
              source={require("../../Img/voice.json")}
              autoPlay
              loop
              style={estilos_prueba_chatbot.animacion_hablar}
            />
          </View>

          <TouchableOpacity
            onPress={chatbot.toggleVoiceMode}
            disabled={chatbot.loading}
          >
            <Image
              source={require("../../Img/icono-escuchar.png")}
              resizeMode="contain"
              style={estilos_prueba_chatbot.icono_hablar}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={enviar} disabled={chatbot.loading}>
            <Image
              source={require("../../Img/icono-enviado.png")}
              resizeMode="contain"
              style={[
                estilos_prueba_chatbot.icono_enviar,
                chatbot.loading && estilos_prueba_chatbot.icono_deshabilitado,
              ]}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={estilos_prueba_chatbot.contenedor_input}>
          <View style={estilos_prueba_chatbot.caja_input}>
            <TextInput
              style={estilos_prueba_chatbot.input}
              value={chatbot.input}
              onChangeText={chatbot.setInput}
              placeholder="Escribe algo..."
              placeholderTextColor="grey"
              editable={!chatbot.loading}
            />

            <TouchableOpacity
              onPress={chatbot.toggleVoiceMode}
              disabled={chatbot.loading || !chatbot.speechRecognitionAvailable}
            >
              <Image
                source={require("../../Img/icono-micro.png")}
                resizeMode="contain"
                style={[
                  estilos_prueba_chatbot.icono_hablar,
                  (chatbot.loading || !chatbot.speechRecognitionAvailable) &&
                    estilos_prueba_chatbot.icono_deshabilitado,
                ]}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={enviar} disabled={chatbot.loading}>
            <Image
              source={require("../../Img/icono-enviado.png")}
              resizeMode="contain"
              style={[
                estilos_prueba_chatbot.icono_enviar,
                chatbot.loading && estilos_prueba_chatbot.icono_deshabilitado,
              ]}
            />
          </TouchableOpacity>
        </View>
      )}

      <AssistantRecipeSaveModal
        visible={!!mensaje_para_guardar}
        content={mensaje_para_guardar?.content || ""}
        saving={!!mensaje_guardando}
        onCancel={() => {
          if (!mensaje_guardando) setMensaje_para_guardar(null);
        }}
        onConfirm={(options) => {
          if (!mensaje_para_guardar) return;
          guardar_receta(
            mensaje_para_guardar.id,
            mensaje_para_guardar.content,
            options,
          );
        }}
      />
    </View>
  );
}
