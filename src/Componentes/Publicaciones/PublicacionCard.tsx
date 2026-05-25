import React, { memo, useState, useCallback } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Texto from "../Compartidos/Texto";
import estilos_publicacion_card from "../../Estilos/Publicaciones/publicacion_card_css";
import { useReaccionar } from "../../Hooks/useReaccionar";
import { useGuardar } from "../../Hooks/useGuardar";

type PublicacionCardProps = {
  navigation: any;
  id_publicacion: number;
  titulo: string;
  archivo: string;
  descripcion: string;
  ingredientes: string;
  preparacion: string;
  tiempo_preparacion: number;
  tipo_tiempo: string;
  dificultad: string;
  total_reacciones: number;
  total_comentarios: number;
  fecha_creacion: string;
  corazon_inicial: number;
  guardado_inicial: number;
  antes_desguardar?: (cb: () => void) => void;
  SetNotificacion_reaccion: () => void;
  Setnotificacion_guardado: () => void;
  Mostrar_Imagen: (archivo: string) => void;
  // ignorado — ya no se usa pero se mantiene para no romper llamadas existentes
  guardar_ejemplo?: boolean;
  setGuardar_Ejemplo?: () => void;
};

// Quita etiquetas HTML para mostrar el contenido como texto plano
const stripHtml = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const formatearFecha = (fecha: string) =>
  new Date(fecha).toLocaleString('es-CO');

const formatearIngredientes = (ingredientes: string): string => {
  try {
    let parsed: any = ingredientes;
    while (typeof parsed === 'string') parsed = JSON.parse(parsed);
    return (parsed as string[]).join('\n');
  } catch {
    return ingredientes;
  }
};

function PublicacionCard({
  navigation,
  id_publicacion,
  titulo,
  archivo,
  descripcion,
  ingredientes,
  preparacion,
  tiempo_preparacion,
  tipo_tiempo,
  dificultad,
  total_reacciones,
  total_comentarios,
  fecha_creacion,
  corazon_inicial,
  guardado_inicial,
  antes_desguardar,
  SetNotificacion_reaccion,
  Setnotificacion_guardado,
  Mostrar_Imagen,
}: PublicacionCardProps) {
  const [ver_mas, setVer_mas] = useState(false);

  const { corazon, total_reacciones_local, Reaccionar } = useReaccionar({
    corazon_inicial,
    total_reacciones,
    SetNotificacion_reaccion,
  });

  const { Guardar, guardado } = useGuardar({
    guardado_inicial,
    antes_desguardar,
    Setnotificacion_guardado,
  });

  const handleReaccionar = useCallback(() => Reaccionar(id_publicacion), [id_publicacion]);
  const handleGuardar = useCallback(() => Guardar(id_publicacion), [id_publicacion]);
  const handleVerDetalle = useCallback(
    () => navigation.push('DetallePublicacion', { id_publicacion }),
    [id_publicacion]
  );
  const handleMostrarImagen = useCallback(() => Mostrar_Imagen(archivo), [archivo]);

  return (
    <View style={estilos_publicacion_card.contenedor}>

      {/* Titulo */}
      <Texto style={estilos_publicacion_card.titulo}>{titulo}</Texto>

      {/* Contenido expandible */}
      <View style={ver_mas ? estilos_publicacion_card.caja_ampliada : estilos_publicacion_card.caja_reducida}>

        {/* Descripcion como texto plano — reemplaza RichEditor */}
        <Text style={[estilos_publicacion_card.texto_mediano, { width: '100%' }]}>
          {stripHtml(descripcion)}
        </Text>

        {/* Ingredientes */}
        <View>
          <Texto style={estilos_publicacion_card.texto_mediano}>
            {formatearIngredientes(ingredientes)}
          </Texto>
        </View>

        {/* Preparacion como texto plano — reemplaza RichEditor */}
        <View>
          <Text style={[estilos_publicacion_card.texto_mediano, { width: '100%' }]}>
            {stripHtml(preparacion)}
          </Text>
        </View>

      </View>

      <TouchableOpacity
        style={estilos_publicacion_card.btn_ver_mas}
        onPress={() => setVer_mas((v) => !v)}
      >
        <Texto style={estilos_publicacion_card.texto_ver_mas}>
          {ver_mas ? 'Ver Menos' : 'Ver Más'}
        </Texto>
      </TouchableOpacity>

      {/* Imagen de portada */}
      {!!archivo && (
        <TouchableOpacity style={{ width: '100%' }} onPress={handleMostrarImagen}>
          <Image
            source={{ uri: archivo }}
            style={estilos_publicacion_card.img_publicacion}
            resizeMode="cover"
            loadingIndicatorSource={require('../../Img/icono-tiempo.png')}
          />
        </TouchableOpacity>
      )}

      {/* Dificultad y tiempo */}
      <View style={estilos_publicacion_card.contenedor_especificaciones}>
        <View style={estilos_publicacion_card.dificultad}>
          <Texto style={estilos_publicacion_card.texto_pequeno}>{dificultad}</Texto>
        </View>
        <View style={estilos_publicacion_card.tiempo}>
          <Image
            source={require('../../Img/icono-tiempo.png')}
            style={estilos_publicacion_card.icono_tiempo}
            resizeMode="contain"
          />
          <Texto style={estilos_publicacion_card.texto_pequeno}>
            {tiempo_preparacion} {tipo_tiempo}
          </Texto>
        </View>
      </View>

      {/* Interacciones */}
      <View style={estilos_publicacion_card.contenedor_interacciones}>
        <View style={estilos_publicacion_card.caja_interacciones}>

          {/* Like */}
          <View style={estilos_publicacion_card.interacciones}>
            <TouchableOpacity onPressIn={handleReaccionar}>
              <Image
                source={
                  corazon === 1
                    ? require('../../Img/icono-corazon-relleno.png')
                    : require('../../Img/icono-corazon.png')
                }
                style={estilos_publicacion_card.iconos}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Texto style={estilos_publicacion_card.texto_interacciones}>
              {total_reacciones_local}
            </Texto>
          </View>

          {/* Comentarios */}
          <View style={estilos_publicacion_card.interacciones}>
            <TouchableOpacity onPress={handleVerDetalle}>
              <Image
                source={require('../../Img/icono-comentarios.png')}
                style={estilos_publicacion_card.iconos}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Texto style={estilos_publicacion_card.texto_interacciones}>
              {total_comentarios}
            </Texto>
          </View>
        </View>

        {/* Guardar */}
        <TouchableOpacity onPressIn={handleGuardar}>
          <Image
            source={
              guardado === 1
                ? require('../../Img/icono-guardar-relleno.png')
                : require('../../Img/icono-guardar.png')
            }
            style={estilos_publicacion_card.iconos}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Texto style={estilos_publicacion_card.fecha}>
        {formatearFecha(fecha_creacion)}
      </Texto>
    </View>
  );
}

// memo evita re-renders del card cuando otros cards cambian de estado
export default memo(PublicacionCard);
