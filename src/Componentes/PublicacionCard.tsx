import React, { useContext, useEffect, useState } from "react";
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

export default function PublicacionCard({id_publicacion, titulo, archivo, descripcion, ingredientes, preparacion, tiempo_preparacion, tipo_tiempo, dificultad, total_reacciones, total_comentarios, fecha_creacion, corazon_inicial, SetNotificacion_reaccion, guardado_inicial, Setnotificacion_guardado}: any) {

  const { width } = useWindowDimensions();

  const navigation = useNavigation<NavigationProp>();


  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario } = authContext;


  // ================= Estados para boton de ver más =================
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
  const [corazon, setCorazon] = useState(corazon_inicial);
  const [total_reacciones_local, setTotal_reacciones_local] = useState(total_reacciones);

  // Actualizar la imagen del corazon
  useEffect(() => {
    setCorazon(corazon_inicial);
  }, [corazon_inicial]);

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

    const nuevo_corazon = corazon === 1 ? 0 : 1;
    setCorazon(nuevo_corazon);
    setTotal_reacciones_local((prev: number) => nuevo_corazon === 1 ? prev + 1 : prev - 1);
    
    if (nuevo_corazon === 1) SetNotificacion_reaccion();
  }


  // ================= Funciones y estados para gurdar un plato =================
  // Estados
  const [guardado, setGuardado] = useState(guardado_inicial);

  // Enviar datos a la bbdd
  const Guardar = async (id_publicacion:number) => {
    const res = await fetch(`http://35.174.135.238/guardados/guardar/${id_publicacion}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${usuario.token}`
      }
    })

    const data = await res.json();

    if(!data.success) return Mensaje_Toast.info(data.message);

    const nuevo_guardado = guardado === 1 ? 0 : 1;
    setGuardado(nuevo_guardado);
    
    if (nuevo_guardado === 1) Setnotificacion_guardado();
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
              {corazon === 1 ? 
              (
                <Image
                  source={require("../Img/icono-corazon-relleno.png")}
                  
                  style={estilos_publicacion_card.iconos}
                  resizeMode="contain"
                />
              ) :
              (
                <Image
                  source={require("../Img/icono-corazon.png")}
                  style={estilos_publicacion_card.iconos}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>

            <Texto style={estilos_publicacion_card.texto_interacciones}>{total_reacciones_local}</Texto>
          </View>

          <View style={estilos_publicacion_card.interacciones}>
            <TouchableOpacity onPress={() => navigation.navigate('DetallePublicacion', {id_publicacion: id_publicacion})}>
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
        <TouchableOpacity onPressIn={() => Guardar(id_publicacion)}>
          {guardado === 1 ?
          (
            <Image
              source={require("../Img/icono-guardar-relleno.png")}
              style={estilos_publicacion_card.iconos}
              resizeMode="contain"
            />
          ) : 
          (
            <Image
              source={require("../Img/icono-guardar.png")}
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