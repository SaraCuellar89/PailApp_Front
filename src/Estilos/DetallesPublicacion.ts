import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE4C7",
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  descripcion: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },

  fecha: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 20,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  sinComentarios: {
    color: "#777",
    fontStyle: "italic",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#EDE4C7",
    borderTopWidth: 1,
    borderColor: "#000",
  },

  input: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#000",
  },

  boton: {
    backgroundColor: "#000",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 10,
  },
});