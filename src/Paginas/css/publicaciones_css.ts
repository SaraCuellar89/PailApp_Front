import { StyleSheet, Dimensions } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_publicaciones = StyleSheet.create({

    // --------- Estilos de publicaciones ---------

    container: { 
        flex: 1, 
        backgroundColor: colores.color_2,
        padding: 20,
        gap: 20
    },
    caja_formu_comentario: {
        paddingHorizontal: 20
    }

})

export default estilos_publicaciones;