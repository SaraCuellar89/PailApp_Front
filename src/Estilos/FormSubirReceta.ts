/**
 * Hoja de estilos reutilizable para un componente o pantalla especifica del proyecto.
 */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  card: {
    backgroundColor: "#F6E27A",
    padding: 20,
    borderRadius: 20,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  boton: {
    backgroundColor: "#FFD600",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  botonTexto: {
    fontWeight: "bold",
    fontSize: 16,
  },
});