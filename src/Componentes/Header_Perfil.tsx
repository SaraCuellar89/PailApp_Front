import React from "react";
import { Image, View } from "react-native";
import Texto from "./Texto";
import estilos_header_perfil from "./css/header_perfil_css";

const Header_Perfil = () => {
    return(
        <View style={estilos_header_perfil.contenedor}>

            {/* --- Foto de perfil y nombre del usuario --- */}
            <View style={estilos_header_perfil.caja_perfil}>
                <Image
                    source={require("../Img/avatar_1.png")}
                    style={estilos_header_perfil.foto_perfil}
                    resizeMode="contain"
                />

                <Texto style={estilos_header_perfil.nombre_usuario}>Usuario 1</Texto>
            </View>

            {/* --- Informacion adicional del usuario --- */}
            <View style={estilos_header_perfil.caja_info_extra}>
                <View style={estilos_header_perfil.info_extra}>
                    <Texto style={estilos_header_perfil.texto_info_extra}>Tu edad: 22</Texto>
                </View>

                <View style={estilos_header_perfil.info_extra}>
                    <Texto style={estilos_header_perfil.texto_info_extra}>Tu Altura: 170cm</Texto>
                </View>

                <View style={estilos_header_perfil.info_extra}>
                    <Texto style={estilos_header_perfil.texto_info_extra}>Tu peso: 60kg</Texto>
                </View>
            </View>
        </View>
    )
}

export default Header_Perfil;