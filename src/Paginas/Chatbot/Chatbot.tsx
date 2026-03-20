import React from "react";
import { View, StyleSheet } from "react-native";
import Header_pailapp from "../../Componentes/Header_pailapp";
import Navbar from "../../Componentes/Navbar";
import ChatBotPrincipal from "../../Componentes/Chatbot/ChatbotPrincipal";
import { SafeAreaView } from "react-native-safe-area-context";
import estilos_global, { colores } from "../../estilos_global";

type ChatbotPageProps = {
  navigation: any;
  initialVoiceMode?: boolean;
};

export default function ChatbotPrincipal({
  navigation,
  initialVoiceMode = false,
}: ChatbotPageProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={[estilos_global.fondo_2, { flex: 1 }]}>
        <View style={{ backgroundColor: colores.color_2 }}>
          <Header_pailapp />
        </View>

        <View style={styles.container}>
          <ChatBotPrincipal initialVoiceMode={initialVoiceMode} />
        </View>

        <View style={{ backgroundColor: colores.color_2 }}>
          <Navbar navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE4C7",
  },
});
