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
        paddingTop: 2,
    },
    texto: {
        width: "50%",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "JetBrainsMono_700Bold"
    },

    // ── Caja que apila los dos players uno encima del otro ────────────
    caja_robot: {
        width: width,
        height: height * 0.32,   // ← bajado de 0.4 para reducir lag
    },
    caja_robot_pequeno: {
        width: width,
        height: height * 0.18,
    },

    // ── Cada player apilado con position absolute ────────────────────
    player_wrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
    },

    // ── Tamaños del video ──────────────────────────────────────────
    robot: {
        width: width,
        height: height * 0.32,   // ← igual que la caja
    },
    robot_pequeno: {
        width: width * 0.35,
        height: height * 0.18,
    }

})

export default estilos_robot;
