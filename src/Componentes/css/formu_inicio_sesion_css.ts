/**
 * Modulo de estilos asociado a componentes reutilizables de la interfaz.
 */

// Estilos de los formularios de inicio de sesion y registro de usuario

import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

const estilo_formu_inicio_sesion_css = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
    },

    card: {
        width: "80%",
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },

    texto_label: {
        fontFamily: "JetBrainsMono_700Bold",
        fontSize: 16,
    },

    contenedor_input: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    caja_input_contrasena: {
        width: '90%',
        backgroundColor: "white",
        borderRadius: 10,
        color: "black",
        borderColor: "black",
        borderWidth: 1,
    },

    caja_contrasena: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },

    ver_contrasena: {
        width: width * 0.09,
        height: height * 0.05,
    },

    googleBtn: {
        width: "60%",
        borderWidth: 1,
        borderColor: "#000",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
    },

    register: {
        marginTop: 20,
        textAlign: "center",
    },
});

export default estilo_formu_inicio_sesion_css;