/**
 * Modulo de estilos asociado al componente Robot y su contenedor en pantalla.
 */

import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../Global/estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_robot = StyleSheet.create({

    // ── Contenedor del robot dentro de la pantalla Chatbot ────────
    caja_robot_pantalla: {
        backgroundColor: colores.color_2,
        alignItems: 'center',
    },

    // ── Texto flotante sobre el robot ─────────────────────────────
    caja_texto: {
        alignItems: "center",
        paddingTop: 20,
    },
    texto: {
        width: "50%",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "JetBrainsMono_700Bold"
    },

    // ── Cajas del video del robot ──────────────────────────────────
    caja_robot: {
        height: height * 0.4,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    caja_robot_pequeno: {
        height: height * 0.15,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ── Tamaños del video ──────────────────────────────────────────
    robot: {
        width: "150%",
        height: height * 0.8,
    },
    robot_pequeno: {
        width: "50%",
        height: height * 0.5,
    }

})

export default estilos_robot;
