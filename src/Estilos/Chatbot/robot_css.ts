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

    // ── Caja que apila los dos players ────────────────────────────
    caja_robot: {
        width: width,
        height: height * 0.52,   // ← 0.45 + 15%
        alignSelf: 'center',
    },
    caja_robot_pequeno: {
        width: width * 0.63,     // ← 0.55 + 15%
        height: height * 0.25,   // ← 0.22 + 15%
        alignSelf: 'center',
    },

    // ── Overlay absoluto de cada player ───────────────────────────
    player_wrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ── Tamaños del video ──────────────────────────────────────────
    robot: {
        width: width,
        height: height * 0.52,   // ← igual que caja
    },
    robot_pequeno: {
        width: width * 0.63,     // ← igual que caja
        height: height * 0.25,
    }

})

export default estilos_robot;
