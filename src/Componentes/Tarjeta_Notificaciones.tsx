import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import Texto from "./Texto";
import estilos_tarjeta_notificaciones from "./css/tarjeta_notificaciones_css";

const Tarjeta_Notificaciones = () => {
    return(
        <View style={estilos_tarjeta_notificaciones.contenedor}>
            <Texto style={estilos_tarjeta_notificaciones.texto}>Usuario 3 ha comentado en tu publicacion</Texto>
            <TouchableOpacity style={estilos_tarjeta_notificaciones.caja_icono}>
                <Image
                    source={require('../Img/icono-basura.png')}
                    style={estilos_tarjeta_notificaciones.icono}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}

export default Tarjeta_Notificaciones;