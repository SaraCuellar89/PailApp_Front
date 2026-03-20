import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Texto from "./Texto";
import { estilos_opciones } from "./css/opciones_css";

const Opciones = () => {
    return(
        <View style={estilos_opciones.contenedor}>
            <TouchableOpacity style={estilos_opciones.caja_opcion}>
                <Image
                    source={require("../Img/icono-editar.png")}
                    style={estilos_opciones.iconos}
                    resizeMode="contain"
                />
                <Texto style={estilos_opciones.texto}>Editar</Texto>
            </TouchableOpacity>

            <TouchableOpacity style={estilos_opciones.caja_opcion}>
                <Image
                    source={require("../Img/icono-basura.png")}
                    style={estilos_opciones.iconos}
                    resizeMode="contain"
                />
                <Texto style={estilos_opciones.texto}>Eliminar</Texto>
            </TouchableOpacity>
        </View>
    )
}

export default Opciones;