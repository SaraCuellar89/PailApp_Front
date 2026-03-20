import { StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

export const estilos_comentarios = StyleSheet.create({
    contenedor: {
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_4,
        padding: 10,
        gap: 10
    },
    contenedor_info: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    foto_usuario: {
        width: 35,
        height: 35,
        borderWidth: 1,
        borderRadius: 40
    },
    nombre_usuario:{
        fontSize: 12,
        fontFamily: "JetBrainsMono_700Bold"
    },
    texto:{
        fontSize: 12
    },
    contenedor_respuestas: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginTop: 5
    },
    caja_respuestas: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    icono_respuesta: {
        width: 25,
        height: 25
    },

    // Estilos de las respuestas
    contenedor_componente_respuestas: {
        margin: 10
    }
});