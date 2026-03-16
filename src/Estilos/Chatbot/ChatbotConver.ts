import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE4C7",
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  burbuja: {
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: "75%",
  },
  usuario: {
    alignSelf: "flex-end",
    backgroundColor: "#FFD600",
  },
  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF3B0",
  },
  inputConteiner: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    backgroundColor: "#EDE4C7",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  botonn: {
    marginLeft: 10,
    backgroundColor: "#FFD600",
    padding: 10,
    borderRadius: 10,
  },
});