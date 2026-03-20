import React from "react";
import { Image, TextInput, View } from "react-native";
import { estilos_formu_comentario } from "./css/formu_comentario_css";

const Formu_Comentario = () => {
    return(
        <View style={estilos_formu_comentario.contenedor}>
            <TextInput 
                style={estilos_formu_comentario.input}
                placeholder="Escribe tu opinion"
                placeholderTextColor={"gray"}
            />
            <Image
                source={require("../Img/icono-enviado.png")}
                style={estilos_formu_comentario.icono}
                resizeMode="contain"
            />
        </View>
    )
}

export default Formu_Comentario;