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

    // ── Cajas del video del robot ──────────────────────────────────
    caja_robot: {
        height: height * 0.4,
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    caja_robot_pequeno: {
        height: height * 0.18,
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },

    // ── Overlay de cada player (posicion absoluta dentro de la caja) ────
    player_overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    // ── Tamaños del video ──────────────────────────────────────────
    robot: {
        width: '100%',
        height: height * 0.55,
    },
    robot_pequeno: {
        width: '35%',
        height: height * 0.15,
    }

})

export default estilos_robot;
