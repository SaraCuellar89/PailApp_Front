import React, { useState } from "react";
import { View, Image, TouchableOpacity, } from "react-native";
import type { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Texto from "./Texto";
import estilos_publicacion_card from "./css/publicacion_card_css";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PublicacionCard({guardar_ejemplo, setGuardar_Ejemplo}: any) {

  const navigation = useNavigation<NavigationProp>();

  // ================= Estados para cambiar el color de los botones de like y guardado =================
  const [corazon, setCorazon] = useState(false);
  const [guardar, setGuardar] = useState(false);

  const [ver_mas, setVer_mas] = useState(false);

  return (
    <View style={estilos_publicacion_card.contenedor}>

      {/* --- Titulo --- */}
      <Texto style={estilos_publicacion_card.titulo}>Titulo</Texto>

      {/* --- Descripcion --- */}
      <Texto style={ver_mas ? estilos_publicacion_card.texto_ampliado : estilos_publicacion_card.texto_reducido}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut convallis libero. Suspendisse turpis nulla, pretium sed neque sed, rhoncus rutrum purus. Morbi nisi nisl, elementum ac odio id, mollis accumsan urna. Donec ut sapien mi. Pellentesque hendrerit eros et mauris pulvinar, at auctor sem lacinia. Vivamus commodo, ante at facilisis eleifend, lectus tortor suscipit tortor, tincidunt commodo diam lacus id mi. Morbi pretium in massa et finibus. Vestibulum tristique sit amet justo in commodo. Donec placerat hendrerit purus, scelerisque aliquam mauris vulputate quis. Vestibulum malesuada semper odio, ut egestas dolor posuere ac. Vestibulum ut felis quam.
      </Texto>

      <TouchableOpacity style={estilos_publicacion_card.btn_ver_mas} onPress={() => setVer_mas(!ver_mas)}>
        <Texto style={estilos_publicacion_card.texto_ver_mas}>{ver_mas ? 'Ver Menos' : 'Ver Más'}</Texto>
      </TouchableOpacity>

      {/* --- Imagen de portada --- */}
      <Image
        source={require("../Img/pasta.jpg")}
        style={estilos_publicacion_card.img_publicacion}
      />

      {/* --- Dificultad y tiempo --- */}
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

            {/* --- Boton de like (corazon) --- */}
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
            <TouchableOpacity onPress={() => navigation.navigate('DetallePublicacion')}>
              <Image
                source={require("../Img/icono-comentarios.png")}
                style={estilos_publicacion_card.iconos}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Texto style={estilos_publicacion_card.texto_interacciones}>4</Texto>
          </View>
        </View>

        {/* --- Boton de guardar --- */}
        <TouchableOpacity onPress={() => [setGuardar(!guardar), setGuardar_Ejemplo(!guardar_ejemplo)]}>
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
    </View>
  );
}