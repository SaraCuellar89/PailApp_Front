import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../Global/estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_prueba_chatbot = StyleSheet.create({

    // --------- Estilos de las publicaciones ---------

    contenedor: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        gap: 10,
    },
    caja_chat: {
        flex: 1,
        width: "100%",
        padding: 15,
        borderRadius: 10,
        gap: 10,
        overflow: "scroll",
    },
    fila_mensaje: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    fila_mensaje_usuario: {
        justifyContent: "flex-end",
    },
    mensaje: {
        maxWidth: "88%",
        padding: 10,
        borderRadius: 10
    },
    mensaje_bot: {
        backgroundColor: "#FFE979",
        alignSelf: "flex-start",
        padding: 10,
        borderRadius: 10
    },
    mensaje_usuario: {
        backgroundColor: "white",
        maxWidth: "70%",
        alignSelf: "flex-end",
        padding: 10,
        borderRadius: 10
    },
    texto_mensaje: {
        fontSize: 12
    },
    icono_usuario_mensaje: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginLeft: 6,
        backgroundColor: colores.color_3
    },
    fila_acciones_mensaje: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 8
    },
    boton_accion_mensaje: {
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    icono_accion_mensaje: {
        width: 14,
        height: 14
    },
    fila_carga: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    burbuja_escribiendo: {
        minWidth: 54,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        paddingVertical: 12
    },
    punto_escribiendo: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: colores.color_4
    },
    boton_repetir: {
        alignSelf: "flex-start",
        marginTop: 8,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: colores.color_3
    },
    texto_repetir: {
        fontSize: 11,
        color: "black"
    },

    contenedor_input: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colores.color_2
    },
    caja_input: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colores.color_3,
        borderRadius: 10,
        color: "black",
        borderColor: "black",
        borderWidth: 1
    },
    caja_input_voz: {
        backgroundColor: "#FFF6D1"
    },
    input: {
        flex: 1
    },
    icono_hablar: {
        width: width * 0.09,
        height: height * 0.05,
    },
    icono_enviar: {
        width: 35,
        height: 35
    },
    icono_activo: {
        tintColor: "#B11818"
    },
    icono_deshabilitado: {
        opacity: 0.45
    },

    caja_hablar: {
        flex: 1,
        height: height * 0.05,
        overflow: "hidden",  
        alignItems: "center",
        justifyContent: "center",
    },
    animacion_hablar: { 
        width: "100%", 
        height: height * 0.12,  
        opacity: 0.5
    },
    panel_voz: {
        width: "100%",
        minHeight: height * 0.12,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: colores.color_2
    },
    texto_estado_voz: {
        fontSize: 12,
        color: colores.color_4
    },
    texto_transcripcion: {
        width: "100%",
        marginTop: 6,
        padding: 8,
        borderRadius: 8,
        backgroundColor: "white",
        color: "black",
        fontSize: 12
    },
    texto_error_voz: {
        marginTop: 6,
        color: "#A11D1D",
        fontSize: 12,
        textAlign: "center"
    }


})

export default estilos_prueba_chatbot;
