import React from "react";
import { Image, View } from "react-native";
import { estilos_comentarios } from "./css/comentarios_css";
import Texto from "./Texto";

const Respuestas = () => {
    return(
        <View style={[estilos_comentarios.contenedor_componente_respuestas, estilos_comentarios.contenedor]}>
            <View style={estilos_comentarios.contenedor_info}>
                <Image
                    source={require("../Img/avatar_6.png")}
                    style={estilos_comentarios.foto_usuario}
                    resizeMode="contain"
                />
                <Texto style={estilos_comentarios.nombre_usuario}>Usuario_1</Texto>
                <Texto style={estilos_comentarios.texto}>7/02/2025</Texto>
            </View> 

            <Texto style={estilos_comentarios.texto}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et metus vitae Aliquam, ullamcorper tristique Aliquam Lorem ipsum dolor sit amet, consectetur.
            </Texto>
           
        </View>
    )
}

export default Respuestas;