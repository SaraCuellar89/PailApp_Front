import React from "react";
import { Image, PanResponderInstance, Text, View } from "react-native";
import { styles } from "../../Estilos/Chatbot/ChatbotPrincipal";

type ChatbotVozProps = {
  expandedMode: boolean;
  voiceMode: boolean;
  isListening: boolean;
  liveTranscript: string;
  speechError: string;
  robotSize: number;
  panHandlers: PanResponderInstance["panHandlers"];
};

const formatTranscript = (transcript: string) =>
  transcript.trim() || "Empieza a hablar, te estoy escuchando...";

export default function ChatbotVoz({
  expandedMode,
  voiceMode,
  isListening,
  liveTranscript,
  speechError,
  robotSize,
  panHandlers,
}: ChatbotVozProps) {
  return (
    <>
      <View
        style={[
          styles.robotGestureArea,
          expandedMode && styles.robotGestureAreaExpanded,
        ]}
        {...panHandlers}
      >
        <Text style={[styles.gestureHint, expandedMode && styles.hiddenHint]}>
          {voiceMode
            ? "Habla y veras tu mensaje en vivo"
            : "Desliza el personaje hacia arriba o abajo"}
        </Text>

        <Image
          source={require("../../Img/robotito1.png")}
          style={[
            styles.robot,
            expandedMode && styles.robotExpanded,
            voiceMode && styles.robotVoiceMode,
            { width: robotSize, height: robotSize * 0.78 },
          ]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.voicePanel}>
        <Text style={styles.voiceStatus}>
          {isListening ? "Escuchando..." : "Microfono listo"}
        </Text>
        <Text style={styles.voiceTranscript}>
          {formatTranscript(liveTranscript)}
        </Text>
        {speechError ? (
          <Text style={styles.voiceError}>{speechError}</Text>
        ) : null}
      </View>
    </>
  );
}
