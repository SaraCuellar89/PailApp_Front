import { Dimensions, StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

export const estilos_formu_subir_receta = StyleSheet.create({
    contenedor: {
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_4,
        padding: 20,
        gap: 25
    },
    caja_input: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    label: {
        fontFamily: "JetBrainsMono_700Bold",
        fontSize: 16
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderTopWidth: 1,
        borderRadius: 10,
        backgroundColor: colores.color_3,
        color: colores.color_4
    },
    caja_ingredientes: {
        width: "100%",
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center", 
        gap: 5    
    },
    input_ingrediente: {
        flex: 1,
        flexShrink: 1,
        minWidth: 0, 
        borderWidth: 1,
        borderTopWidth: 1,
        borderRadius: 10,
        backgroundColor: colores.color_3,
        color: colores.color_4
    },
    icono_x: {
        width: 20,
        height: 20,
    },
    icono_mas: {
        width: 20,
        height: 20,
        margin: 5,
    },
    caja_boton: {
        width: "100%",
        alignItems: "center",
        marginVertical: 20
    },
    boton: {
        width: width * 0.5
    }
});