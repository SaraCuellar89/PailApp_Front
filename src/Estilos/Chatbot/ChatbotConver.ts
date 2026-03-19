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
  resizeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  resizeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.68)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
  },
  resizeLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#3D3122",
  },
  resizeButtons: {
    flexDirection: "row",
    gap: 8,
  },
  resizeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFD600",
    alignItems: "center",
    justifyContent: "center",
  },
  resizeButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    lineHeight: 20,
  },
  robot: {
    marginBottom: 10,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    minHeight: 45,
    color: "#000",
  },
  iconButton: {
    width: 36,
    height: 36,
  },
  iconDisabled: {
    opacity: 0.5,
  },
});
