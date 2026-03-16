import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#EDE4C7",
  },

  boton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#000",
    backgroundColor: "#EDE4C7",
  },

  botonActivo: {
    backgroundColor: "#000",
  },

  texto: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
  },

  textoActivo: {
    color: "#EDE4C7",
  },
});