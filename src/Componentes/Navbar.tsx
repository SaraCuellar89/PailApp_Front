import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import estilos_navbar from "./css/navbar_css";
import estilos_global from "../estilos_global";

export default function Navbar({ navigation }: any) {
  return (
    <View style={[estilos_navbar.container, estilos_global.sombra_contenedor]}>

      <TouchableOpacity onPress={() => navigation.navigate("ChatbotVoz")}>
        <Image
          source={require("../Img/icono-robot.png")}
          style={estilos_navbar.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Foro")}>
        <Image
          source={require("../Img/icono-chat.png")}
          style={estilos_navbar.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("MisPlatos")}>
        <Image
          source={require("../Img/icono-comida.png")}
          style={estilos_navbar.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}> 
        <Image
          source={require("../Img/avatar_1.png")}
          style={[estilos_navbar.foto_perfil, estilos_navbar.icon]}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </View>
  );
}