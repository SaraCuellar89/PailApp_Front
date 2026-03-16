import React, { useEffect, useState } from "react";
import { View,Text,TextInput,TouchableOpacity,ScrollView, } from "react-native";
import { useRoute } from "@react-navigation/native";
import { styles } from "../../Estilos/Chatbot/ChatbotConver";
import { fromByteArray } from "base64-js";
import RNFS from "react-native-fs";
import Sound from "react-native-sound";
import {
  ELEVENLABS_API_KEY,
  ELEVENLABS_MODEL_ID,
  ELEVENLABS_VOICE_ID,
} from "../config/elevenlabs";
import { API_BASE_URL } from "../config/api";

interface Mensaje {
  id: number;
  texto: string;
  tipo: "usuario" | "bot";
}

export default function ChatBotConver() {
  const route = useRoute<any>();
  const mensajeInicial = route.params?.mensajeInicial;

  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  useEffect(() => {
    if (mensajeInicial) {
      agregarMensaje(mensajeInicial);
    }
  }, []);

  const agregarMensaje = (texto: string) => {
    const mensajeUsuario: Mensaje = {
      id: Date.now(),
      texto,
      tipo: "usuario",
    };

    setMensajes((prev) => [...prev, mensajeUsuario]);

    setTimeout(() => {
      const mensajeBot: Mensaje = {
        id: Date.now() + 1,
        texto:
          "Hola, soy tu asistente de cocina. ¿Qué quieres cocinar hoy?",
        tipo: "bot",
      };

      setMensajes((prev) => [...prev, mensajeBot]);
    }, 1500);
  };

  const enviarNuevoMensaje = () => {
    if (nuevoMensaje.trim() === "") return;

    agregarMensaje(nuevoMensaje);
    setNuevoMensaje("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {mensajes.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.burbuja,
              msg.tipo === "usuario" ? styles.usuario : styles.bot,
            ]}
          >
            <Text>{msg.texto}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputConteiner}>
        <TextInput
          style={styles.input}
          placeholder="Escribe otro mensaje..."
          value={nuevoMensaje}
          onChangeText={setNuevoMensaje}
        />
        <TouchableOpacity style={styles.botonn} onPress={enviarNuevoMensaje}>
          <Text>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

