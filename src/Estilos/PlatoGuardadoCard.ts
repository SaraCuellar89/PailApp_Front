/**
 * Hoja de estilos reutilizable para un componente o pantalla especifica del proyecto.
 */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EDE4C7",
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  descripcion: {
    textAlign: "center",
    fontSize: 13,
    marginVertical: 5,
  },
  img: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginVertical: 8,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  badge: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 11,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});