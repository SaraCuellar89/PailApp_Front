import React from "react";
import { View, StyleSheet } from "react-native";
import ChatBotConver from "../../Componentes/Chatbot/ChatbotConver";
import Header from "../../Componentes/Header";

export default function Chatbot_Conversacion({ navigation}: any) {
    return(
        <View style={styles.container}>

            <Header title="Chatbot" onBack={() => navigation.goBack()}/>

            <ChatBotConver/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDE4C7",
    },
})