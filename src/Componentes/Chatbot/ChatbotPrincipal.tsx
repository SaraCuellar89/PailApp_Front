import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../Estilos/Chatbot/ChatbotPrincipal";

export default function ChatbotPrincipal() {
  
  const navigation = useNavigation<any>()
  const [mensaje, setMensaje] = useState("");

  const enviarMensaje = () => {
    if (mensaje.trim() === "") return;

    navigation.navigate("Chatbot_Conversacion", {
      mensajeInicial: mensaje,
    })

    setMensaje("");
  }
  
  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.question}>
          ¿Qué quieres cocinar hoy?
        </Text>

        <Image
          source={require("../../Img/robotito1.png")}
          style={styles.robot}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Escribe tu mensaje..." value={mensaje} onChangeText={setMensaje}/>
        <TouchableOpacity>
          <Image
          source={require("../../Img/icono-micro.png")}
          style={{ width: 36, height: 36, marginLeft: 5, marginRight: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={enviarMensaje}>
          <Image
          source={require("../../Img/icono-enviado.png")}
          style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}