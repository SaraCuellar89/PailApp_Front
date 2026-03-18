import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

export const estilos_header_pailapp = StyleSheet.create({
    contenedor: {
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "space-between",
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      zIndex: 100,
      backgroundColor: colores.color_1
    },
    titulo: {
      fontSize: 20,
      fontFamily: "JetBrainsMono_700Bold"
    },
    icono: {
      width: 40,
      height: 40,
    }
});