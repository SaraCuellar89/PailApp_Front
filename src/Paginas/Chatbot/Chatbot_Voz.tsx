/**
 * Atajo de navegacion que reutiliza la pantalla del chatbot arrancando directamente en modo voz.
 */

import React from "react";
import ChatbotPrincipal from "./Chatbot";

export default function ChatbotVozPage({ navigation }: any) {
  return <ChatbotPrincipal navigation={navigation} initialVoiceMode={true} />;
}
