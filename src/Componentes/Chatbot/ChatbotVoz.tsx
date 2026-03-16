import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../Estilos/Chatbot/Chatbotvoz";

export default function ChatVoz() {

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      <View style={styles.statusBar}>
        <Text style={{ color: "#fff" }}>Escuchando...</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../../Img/robotito2.png")}
          style={styles.robot}
          resizeMode="contain"
        />

        <TouchableOpacity>
        <Image
          source={require("../../Img/icono-micro.png")}
          style={{ width: 80, height: 80 }}
        />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chatbot")} >
            <Image
          source={require("../../Img/icono-teclado.png")}
          style={{ width: 80, height: 80, margin: 30 }}
        />
            </TouchableOpacity>
      </View>

    </View>
  );
}

