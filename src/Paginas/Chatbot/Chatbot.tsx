import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header_pailapp from "../../Componentes/Header_pailapp";
import Navbar from "../../Componentes/Navbar";
import ChatBotPrincipal from "../../Componentes/Chatbot/ChatbotPrincipal"
import { SafeAreaView } from "react-native-safe-area-context";
import estilos_global, { colores } from "../../estilos_global";

export default function ChatbotPrincipal({ navigation }: any) {
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={[estilos_global.fondo_2, { flex: 1 }]}>

        <View style={{backgroundColor: colores.color_2}}>
          <Header_pailapp/>
        </View> 

        <ScrollView
          style={{ flex: 1, backgroundColor: '#000000' }}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >
        
        <View style={styles.container}>

            <ChatBotPrincipal/>

        </View>

        </ScrollView>

        <View style={{backgroundColor: colores.color_2}}>
          <Navbar navigation={navigation} />
        </View> 

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE4C7",
  },
});