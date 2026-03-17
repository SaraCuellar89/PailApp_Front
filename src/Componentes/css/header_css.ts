import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

const header_css = StyleSheet.create({
    contenedor: {
        padding: 22,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        zIndex: 100
    },
    contenedor_boton: {
        position: "absolute",
        left: 20,
        justifyContent: 'center',
    },
    flecha: {
        width: width * 0.05,
        height: height * 0.5
    },
    titulo: {
        fontSize: 20,
        fontFamily: "JetBrainsMono_700Bold"
    },
    icon: {
        width: 50,
        height: 50,
    },
});

export default header_css;