import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE4C7",
  },

  header: {
    backgroundColor: "#FFD600",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 22,
    fontWeight: "bold",
  },

  statusBar: {
    backgroundColor: "#000",
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  robot: {
    width: 260,
    height: 260,
    marginBottom: 40,
  },

  micButton: {
    marginBottom: 20,
  },

  mic: {
    fontSize: 60,
  },

  keyboard: {
    fontSize: 20,
  },
});