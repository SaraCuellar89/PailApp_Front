import React from "react";
import { View, Text,TouchableOpacity, Image } from "react-native";
import header_css from "./css/header_css";
import estilos_global, { colores } from "../estilos_global";
import Texto from "./Texto";

interface Props {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: Props) {
  return (
    <View style={[header_css.contenedor, { backgroundColor: colores.color_1 }, estilos_global.sombra_contenedor]}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={header_css.contenedor_boton}>
          <Image
            source={require("../Img/flecha_retorno.png")}
            style={header_css.flecha}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      <Texto style={header_css.titulo}>{title}</Texto>

    </View>
  );
}