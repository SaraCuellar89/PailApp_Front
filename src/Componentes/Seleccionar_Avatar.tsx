/**
 * Selector modal de avatar para el flujo de registro del usuario.
 */

import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import seleccionar_avatar_css from "./css/seleccionar_avatar_css";
import Texto from "./Texto";
import estilos_global from "../estilos_global";

type Props = {
    onChange: (avatar: any) => void;
}

const avatares = [
    require('../Img/avatar_1.png'),
    require('../Img/avatar_2.png'),
    require('../Img/avatar_3.png'),
    require('../Img/avatar_4.png'),
    require('../Img/avatar_5.png'),
    require('../Img/avatar_6.png'),
    require('../Img/avatar_7.png'),
    require('../Img/avatar_8.png'),
    require('../Img/avatar_9.png'),
];
const Seleccionar_Avatar = ({ onChange }: Props) => {

    const [seleccionado, setSeleccionado] = useState<number | null>(null);

    const Aceptar = () => {
        if (seleccionado === null) return;
        onChange(avatares[seleccionado]);
    }

    return(
        <View style={seleccionar_avatar_css.contenedor}>
            <View style={seleccionar_avatar_css.grid}>
                {avatares.map((avatar, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            seleccionar_avatar_css.contenedor_avatar,
                            seleccionado === index && seleccionar_avatar_css.seleccionado
                        ]}
                        onPress={() => setSeleccionado(index)}
                    >
                        <Image
                            source={avatar}
                            style={seleccionar_avatar_css.avatar}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={seleccionar_avatar_css.contenedor_boton}>
                <TouchableOpacity style={estilos_global.btn_1} onPress={Aceptar}>
                    <Texto style={estilos_global.texto_btn_1}>Aceptar</Texto>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Seleccionar_Avatar;