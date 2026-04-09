import { Dimensions, StyleSheet } from "react-native";
import { colores } from "../../estilos_global";

const { height, width } = Dimensions.get('window');

const estilos_tarjeta_notificaciones = StyleSheet.create({

    // --------- Estilos de las notificaciones ---------

    contenedor: {
        flexDirection: "row",
        alignItems: "center",        
        justifyContent: "space-between", 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colores.color_4,
        padding: 20,
        backgroundColor: colores.color_2
    },
    texto: {
        flex: 1,        
        marginRight: 10
    },
    caja_icono: {
        padding: 10,
        backgroundColor: colores.color_5,
        borderRadius: 10
    },  
    icono: {
        width: 30,
        height: 30,
    }
});

export default estilos_tarjeta_notificaciones;