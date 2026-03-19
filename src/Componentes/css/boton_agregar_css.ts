import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

export const estilos_boton_agregar = StyleSheet.create({
  boton: {
    width: "100%",
    backgroundColor: colores.color_1,
    alignItems: "center",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  texto: {
    fontSize: 40,
  },
});