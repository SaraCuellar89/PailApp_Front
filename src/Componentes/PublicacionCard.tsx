import React, { useState } from "react";
import { View, Image, TouchableOpacity, } from "react-native";
import type { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Texto from "./Texto";
import estilos_publicacion_card from "./css/publicacion_card_css";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PublicacionCard() {

  const navigation = useNavigation<NavigationProp>();

  const [corazon, setCorazon] = useState(false);
  const [guardar, setGuardar] = useState(false);

  return (
    <TouchableOpacity style={estilos_publicacion_card.contenedor} onPress={() => navigation.navigate('DetallePublicacion')}>
      <Texto style={estilos_publicacion_card.titulo}>Titulo</Texto>

      <Texto style={estilos_publicacion_card.descripcion}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et metus vitae Aliquam, ullamcorper
      </Texto>

      <Image
        source={require("../Img/pasta.jpg")}
        style={estilos_publicacion_card.img_publicacion}
      />

      <View style={estilos_publicacion_card.contenedor_especificaciones}>
        <View style={estilos_publicacion_card.dificultad}>
          <Texto style={estilos_publicacion_card.texto_pequeno}>Facil</Texto>
        </View>

        <View style={estilos_publicacion_card.tiempo}>
          <Image
            source={require("../Img/icono-tiempo.png")}
            style={estilos_publicacion_card.icono_tiempo}
            resizeMode="contain"
          />

          <Texto style={estilos_publicacion_card.texto_pequeno}>30 min</Texto>
        </View>
      </View>

      <View style={estilos_publicacion_card.contenedor_interacciones}>
        <View style={estilos_publicacion_card.caja_interacciones}>
          <View style={estilos_publicacion_card.interacciones}>
            <TouchableOpacity onPress={() => setCorazon(!corazon)}>
              {corazon === false ? 
              (
                <Image
                  source={require("../Img/icono-corazon.png")}
                  style={estilos_publicacion_card.iconos}
                  resizeMode="contain"
                />
              ) :
              (
                <Image
                  source={require("../Img/icono-corazon-relleno.png")}
                  style={estilos_publicacion_card.iconos}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>

            <Texto style={estilos_publicacion_card.texto_interacciones}>4</Texto>
          </View>

          <View style={estilos_publicacion_card.interacciones}>
            <View>
              <Image
                source={require("../Img/icono-comentarios.png")}
                style={estilos_publicacion_card.iconos}
                resizeMode="contain"
              />
            </View>

            <Texto style={estilos_publicacion_card.texto_interacciones}>4</Texto>
          </View>
        </View>

        <TouchableOpacity onPress={() => setGuardar(!guardar)}>
          {guardar === false ?
          (
            <Image
              source={require("../Img/icono-guardar.png")}
              style={estilos_publicacion_card.iconos}
              resizeMode="contain"
            />
          ) : 
          (
            <Image
              source={require("../Img/icono-guardar-relleno.png")}
              style={estilos_publicacion_card.iconos}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>

      <Texto style={estilos_publicacion_card.fecha}>7/02/2025</Texto>
    </TouchableOpacity>
  );
}