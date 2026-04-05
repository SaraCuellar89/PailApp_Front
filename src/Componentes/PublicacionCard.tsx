import React, { useContext, useState } from "react";
import { RichEditor } from 'react-native-pell-rich-editor';
import { View, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import type { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Texto from "./Texto";
import estilos_publicacion_card from "./css/publicacion_card_css";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PublicacionCard({guardar_ejemplo, setGuardar_Ejemplo, id_publicacion, titulo, archivo, descripcion, ingredientes, preparacion, tiempo_preparacion, tipo_tiempo, dificultad, total_reacciones, total_comentarios, fecha_creacion}: any) {

  const { width } = useWindowDimensions();

  const navigation = useNavigation<NavigationProp>();


  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario } = authContext;


  // ================= Estados para likes, guardados y boton de ver más =================
  const [guardar, setGuardar] = useState(false);
  const [ver_mas, setVer_mas] = useState(false);


  // ================= Funciones para formatear los datos =================
  const Formatear_Fecha = (fecha: string) => {
    return new Date(fecha).toLocaleString("es-CO");
  }

  const Formatear_Ingredientes = (ingredientes: string) => {
    try {
      const parsed = JSON.parse(JSON.parse(ingredientes));
      return parsed.join('\n');
    } catch {
      return ingredientes;
    }
  }

  
  // ================= Funciones y estados para reaccionar a un plato =================
  // Estados
  const [corazon, setCorazon] = useState(false);

  // Enviar datos a la bbdd
  const Reaccionar = async (id_publicacion:number) => {
    const res = await fetch(`http://35.174.135.238/reacciones/reaccionar/${id_publicacion}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${usuario.token}`
      }
    })

    const data = await res.json();

    if(!data.success) return Mensaje_Toast.info(data.message);

    setCorazon(true);
  }




  return (
    <View style={estilos_publicacion_card.contenedor}>

      {/* --- Titulo --- */}
      <Texto style={estilos_publicacion_card.titulo}>{titulo}</Texto>

      {/* --- Datos del plato --- */}
      <View style={ver_mas ? estilos_publicacion_card.caja_ampliada : estilos_publicacion_card.caja_reducida}>

        {/* Descripcion */}
        
        <RichEditor
          initialContentHTML={descripcion}
          disabled={true}
          scrollEnabled={false}
          editorStyle={{
            backgroundColor: 'transparent',
            caretColor: 'transparent',
            cssText: 'font-size: 13px !important;',
            initialCSSText: `
              * { font-size: 13px; padding: 0px !important; }
              ol, ul { padding-left: 5px !important; }
              li { margin-bottom: 4px; }
            `,
          }}
        />

        {/* Ingredientes */}
        <View>
          <Texto style={estilos_publicacion_card.texto_mediano}>{Formatear_Ingredientes(ingredientes)}</Texto>
        </View>

        {/* Pasos de preparacion */}
        <View>
          <RichEditor
            initialContentHTML={preparacion}
            disabled={true}
            scrollEnabled={false}
            editorStyle={{
              backgroundColor: 'transparent',
              caretColor: 'transparent',
              cssText: 'font-size: 13px !important;',
              initialCSSText: `
                * { font-size: 13px !important; }
                ol, ul { padding-left: 5px !important; }
                li { margin-bottom: 4px; }
              `,
            }}
          />
        </View>
        
      </View>

      <TouchableOpacity style={estilos_publicacion_card.btn_ver_mas} onPress={() => setVer_mas(!ver_mas)}>
        <Texto style={estilos_publicacion_card.texto_ver_mas}>{ver_mas ? 'Ver Menos' : 'Ver Más'}</Texto>
      </TouchableOpacity>

      {/* --- Imagen de portada --- */}
      {archivo && 
        <Image
          source={{uri: archivo}}
          style={estilos_publicacion_card.img_publicacion}
        />
      }

      {/* --- Dificultad y tiempo --- */}
      <View style={estilos_publicacion_card.contenedor_especificaciones}>
        <View style={estilos_publicacion_card.dificultad}>
          <Texto style={estilos_publicacion_card.texto_pequeno}>{dificultad}</Texto>
        </View>

        <View style={estilos_publicacion_card.tiempo}>
          <Image
            source={require("../Img/icono-tiempo.png")}
            style={estilos_publicacion_card.icono_tiempo}
            resizeMode="contain"
          />

          <Texto style={estilos_publicacion_card.texto_pequeno}>{tiempo_preparacion} {tipo_tiempo}</Texto>
        </View>
      </View>

      <View style={estilos_publicacion_card.contenedor_interacciones}>
        <View style={estilos_publicacion_card.caja_interacciones}>
          <View style={estilos_publicacion_card.interacciones}>

            {/* --- Boton de like (corazon) --- */}
            <TouchableOpacity onPressIn={() => Reaccionar(id_publicacion)}>
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

            <Texto style={estilos_publicacion_card.texto_interacciones}>{total_reacciones}</Texto>
          </View>

          <View style={estilos_publicacion_card.interacciones}>
            <TouchableOpacity onPress={() => navigation.navigate('DetallePublicacion')}>
              <Image
                source={require("../Img/icono-comentarios.png")}
                style={estilos_publicacion_card.iconos}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Texto style={estilos_publicacion_card.texto_interacciones}>{total_comentarios}</Texto>
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

      <Texto style={estilos_publicacion_card.fecha}>{Formatear_Fecha(fecha_creacion)}</Texto>
    </View>
  );
}