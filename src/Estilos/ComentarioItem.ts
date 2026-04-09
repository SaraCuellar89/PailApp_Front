/**
 * Hoja de estilos reutilizable para un componente o pantalla especifica del proyecto.
 */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: "#F6F1DC",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000",
  },

  row: {
    flexDirection: "row",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 20,
    marginRight: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  nombre: {
    fontWeight: "bold",
  },

  fecha: {
    fontSize: 11,
    color: "#555",
  },

  texto: {
    marginVertical: 6,
    fontSize: 14,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },

  responder: {
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
  },

  respuesta: {
    marginLeft: 25,
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    marginTop: 8,
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#000",
  },

  botoncitop: {
    fontWeight: "bold",
    marginLeft: 6,
    backgroundColor: "#000",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
});