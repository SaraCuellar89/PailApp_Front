/**
 * Modulo de estilos exclusivo de una pantalla. Centraliza colores, espacios y distribucion visual.
 */

import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

const estilos_foro = StyleSheet.create({
    contenedor: {
        flex: 1, 
        backgroundColor: "#EDE4C7" 
    },
    contenedor_filtros: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    contenedor_publicaciones: {
        padding: 20,
        flexDirection: "column",
        gap: 30
    }
})

export default estilos_foro;