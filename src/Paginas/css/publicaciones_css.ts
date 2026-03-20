import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

const estilos_publicaciones = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#EDE4C7",
        padding: 20,
        gap: 20
    },
    caja_formu_comentario: {
        paddingHorizontal: 20
    }

})

export default estilos_publicaciones;