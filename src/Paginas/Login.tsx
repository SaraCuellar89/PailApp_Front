import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../Componentes/Header";
import Formu_Inicio from "../Componentes/Formu_Inicio";
import estilos_global from "../estilos_global";

export default function Login({ navigation }: any) {
  return (
    <View style={[estilos_global.fondo_2, { flex: 1 }]}>
      
      <Header title="Iniciar sesión" onBack={() => navigation.goBack()}/>

      <Formu_Inicio
        onRegisterPress={() => navigation.navigate("Registro")}
        onChatBot={() => navigation.navigate("Chatbot")}
      />

    </View>
  );
}
