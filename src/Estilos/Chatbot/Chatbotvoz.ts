import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE4C7",
  },
  statusBar: {
    paddingTop: 18,
    paddingBottom: 10,
    alignItems: "center",
  },
  statusText: {
    color: "#2C2419",
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  robot: {
    marginBottom: 12,
  },
  transcriptCard: {
    width: "100%",
    minHeight: 120,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  transcriptLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6A573E",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  transcriptText: {
    color: "#1E1A16",
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "600",
  },
  errorText: {
    marginTop: 10,
    color: "#A11D1D",
    fontSize: 14,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 28,
  },
  actionButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF6D1",
  },
  actionButtonActive: {
    backgroundColor: "#FFD600",
  },
  actionIcon: {
    width: 40,
    height: 40,
  },
});
