/**
 * Hoja de estilos del chatbot principal, incluyendo estados de voz, robot y conversacion.
 */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE4C7",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  robotGestureArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
    paddingBottom: 8,
  },
  robotGestureAreaExpanded: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  gestureHint: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3D3122",
    marginBottom: 6,
  },
  hiddenHint: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
  },
  robot: {
    marginBottom: 10,
  },
  robotExpanded: {
    marginBottom: 0,
  },
  robotVoiceMode: {
    marginBottom: 4,
  },
  chatBox: {
    flex: 1,
    maxWidth: "100%",
    backgroundColor: "rgba(255,255,255,0.58)",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 10,
  },
  scroll: {
    flex: 1,
  },
  chatContent: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 8,
  },
  bubble: {
    maxWidth: "88%",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFDF5",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#FFD600",
  },
  bubbleText: {
    color: "#000",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 2,
  },
  replayButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#E8DFC0",
  },
  replayButtonText: {
    color: "#3D3122",
    fontSize: 12,
    fontWeight: "700",
  },
  loadingBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "#000",
    fontSize: 14,
  },
  voicePanel: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  voiceStatus: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C2419",
    marginBottom: 12,
  },
  voiceTranscript: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.74)",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 18,
    fontSize: 22,
    lineHeight: 30,
    color: "#1E1A16",
    fontWeight: "600",
    minHeight: 120,
  },
  voiceError: {
    marginTop: 10,
    color: "#A11D1D",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 8,
    backgroundColor: "#EDE4C7",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    minHeight: 45,
    color: "#000",
  },
  inputVoiceMode: {
    backgroundColor: "#FFF6D1",
  },
  iconButton: {
    width: 36,
    height: 36,
  },
  iconActive: {
    tintColor: "#B11818",
  },
  iconDisabled: {
    opacity: 0.5,
  },
});
