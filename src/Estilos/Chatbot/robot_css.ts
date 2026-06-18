import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../Global/estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_robot = StyleSheet.create({

    // Contenedor que ocupa toda la pantalla para permitir el drag libre
    caja_drag: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
    },

    caja_texto: {
        alignItems: "center",
        paddingBottom: 8,
    },
    texto: {
        width: width * 0.6,
        textAlign: "center",
        fontSize: 18,
        fontFamily: "JetBrainsMono_700Bold",
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 6,
        overflow: 'hidden',
    },

    // Caja del robot en modo normal (grande, centrado)
    caja_robot: {
        width: width * 0.65,
        height: height * 0.38,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Caja del robot en modo chat (pequeno, arrastrable)
    caja_robot_pequeno: {
        width: width * 0.3,
        height: height * 0.18,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },

    robot: {
        width: '150%',
        height: height * 0.8,
    },
    robot_pequeno: {
        width: '200%',
        height: height * 0.35,
    },
});

export default estilos_robot;
export { width, height };
