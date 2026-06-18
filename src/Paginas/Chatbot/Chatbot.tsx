import React, { useState, useContext, useCallback } from "react";
import { View } from "react-native";
import Header_pailapp from "../../Componentes/Navegacion/Header_pailapp";
import Navbar from "../../Componentes/Navegacion/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../../Estilos/Global/estilos_global";
import estilos_publicaciones from "../../Estilos/Publicaciones/publicaciones_css";
import estilos_robot from "../../Estilos/Chatbot/robot_css";
import Robot from "../../Componentes/Chatbot/Robot";
import ChatBot from "../../Componentes/Chatbot/ChatBot";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChatbotUsageBar from "../../Componentes/Chatbot/ChatbotUsageBar";
import { AuthContext } from "../../utils/Auth_Context";
import { useFocusEffect } from "@react-navigation/native";
import { ChatbotUsage } from "../../Componentes/Chatbot/types";


const initialUsage: ChatbotUsage = {
  usedTokens: 0,
  remainingTokens: 6000,
  progress: 0,
  remainingInteractions: 13,
};

const obtenerIdUsuario = (usuario: any) =>
  usuario?.idusuario ??
  usuario?.id_usuario ??
  usuario?.idUsuario ??
  usuario?.id ??
  null;

export default function Chatbot({navigation, route}: any) {

  // ================= Datos del usuario por un contexto definido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario } = authContext;

  // ================= Notificaciones =================
  const [cantidad_notificaciones, setCantidad_notificaciones] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const Obtener_Notificaciones = async () => {
        const res = await fetch(`http://35.174.135.238/notificaciones/todas`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${usuario.token}` }
        });
        const data = await res.json();
        if(data.success === true){
          setCantidad_notificaciones(data.data.info_notificaciones.length);
        } else {
          setCantidad_notificaciones(0);
        }
      };
      Obtener_Notificaciones();
    }, [])
  );

  const [cambiar_tamano, setCambiar_tamano] = useState(false);
  const [intencion, setIntencion]           = useState<string | null>(null);
  const [respuesta_bot, setRespuesta_bot]   = useState<string | null>(null); // ← nuevo
  const [chatUsage, setChatUsage]           = useState<ChatbotUsage>(initialUsage);
  const idUsuario = obtenerIdUsuario(usuario);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={{ backgroundColor: colores.color_2 }}>
        <Header_pailapp
          cantidad_notificaciones={cantidad_notificaciones}
        />
      </View>

      <View style={{ backgroundColor: colores.color_2, alignItems: "center" }}>
        <ChatbotUsageBar
          progress={chatUsage.progress}
          remainingInteractions={chatUsage.remainingInteractions}
        />
      </View>

      {/* Contenedor del robot */}
      <View style={estilos_robot.caja_robot_pantalla}>
        <Robot
          cambiar_tamano={cambiar_tamano}
          intencion={intencion}
          respuesta={respuesta_bot}   // ← nuevo: dispara la cola de animaciones
        />
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: '#000000' }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        scrollEnabled={false}
        extraScrollHeight={80}
      >
        <View style={estilos_publicaciones.container}>
          <ChatBot
            avatarUsuario={usuario?.avatar ?? null}
            idUsuario={idUsuario}
            tokenUsuario={usuario?.token}
            initialMessage={route?.params?.mensajeInicial}
            initialVoiceMode={Boolean(route?.params?.initialVoiceMode)}
            setCambiar_tamano={setCambiar_tamano}
            onIntencion={setIntencion}
            onRespuesta={setRespuesta_bot}  // ← nuevo: recibe el texto de la respuesta
            onUsageChange={setChatUsage}
          />
        </View>
      </KeyboardAwareScrollView>

      <View style={{ backgroundColor: colores.color_2 }}>
        <Navbar navigation={navigation} />
      </View>

    </SafeAreaView>
  );
}
