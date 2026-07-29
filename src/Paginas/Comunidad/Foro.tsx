import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, FlatList } from "react-native";
import Filtros from "../../Componentes/Publicaciones/Filtros";
import BotonAgregar from "../../Componentes/Compartidos/BotonAgregar";
import Notificacion from "../../Componentes/Compartidos/Notificacion";
import Header from "../../Componentes/Navegacion/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../../Estilos/Global/estilos_global";
import PublicacionCard from "../../Componentes/Publicaciones/PublicacionCard";
import estilos_foro from "../../Estilos/Paginas/foro_css";
import { AuthContext } from "../../utils/Auth_Context";
import { Mensaje_Toast } from "../../utils/Mensaje_Toast";
import Texto from "../../Componentes/Compartidos/Texto";
import { useFocusEffect } from "@react-navigation/native";
import Imagen_Completa from "../../Componentes/Compartidos/Imagen_Completa";

interface Plato {
  publicacion_id: number;
  publicacion_titulo: string;
  publicacion_archivo: string;
  publicacion_descripcion: string;
  publicacion_ingredientes: string;
  publicacion_preparacion: string;
  publicacion_tiempo_preparacion: number;
  publicacion_tipo_tiempo: string;
  publicacion_dificultad: string;
  total_reacciones: number;
  total_comentarios: number;
  publicacion_fecha: string;
  usuario_ya_reacciono: number;
  usuario_ya_guardo: number;
}

export default function Foro({ navigation, route }: any) {

  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario } = authContext;

  // Notificacion de exito
  const { plato_subido } = route.params ?? {};
  const [notificacion_exito, setNotificacion_exito] = useState(false);
  const [mensaje_notificacion, setMensaje_notificacion] = useState("");

  useEffect(() => {
    if (plato_subido) Mostrar_Notificacion("¡Plato Subido!");
  }, [plato_subido]);

  const Mostrar_Notificacion = (mensaje: string) => {
    setMensaje_notificacion(mensaje);
    setNotificacion_exito(true);
  };

  // Filtros
  const [filtro, setFiltro] = useState<"recientes" | "antiguas" | "populares">("recientes");

  // Lista de platos
  const [platos, setPlatos] = useState<Plato[]>([]);

  useFocusEffect(
    useCallback(() => {
      const Obtener_Todos_Platos = async () => {
        try {
          const res = await fetch(`https://pail-app-backend.vercel.app/filtros/${filtro}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${usuario.token}` },
          });
          const data = await res.json();
          if (!data.success) return Mensaje_Toast.info(data.message);
          setPlatos(data.data);
        } catch (error) {
          console.error('Error obteniendo los platos:', error);
          Mensaje_Toast.error('No se pudo obtener los platos');
        }
      };
      Obtener_Todos_Platos();
    }, [usuario.token, filtro])
  );

  // Imagen ampliada
  const [imagen_seleccionada, setImagen_seleccionada] = useState<string | null>(null);

  // renderItem memoizado para que FlatList no re-cree la funcion en cada render
  const renderItem = useCallback(({ item: p }: { item: Plato }) => (
    <View style={estilos_foro.contenedor_publicaciones}>
      <PublicacionCard
        navigation={navigation}
        key={p.publicacion_id}
        id_publicacion={p.publicacion_id}
        guardar_ejemplo={false}
        setGuardar_Ejemplo={() => {}}
        titulo={p.publicacion_titulo}
        archivo={p.publicacion_archivo}
        descripcion={p.publicacion_descripcion}
        ingredientes={p.publicacion_ingredientes}
        preparacion={p.publicacion_preparacion}
        tiempo_preparacion={p.publicacion_tiempo_preparacion}
        tipo_tiempo={p.publicacion_tipo_tiempo}
        dificultad={p.publicacion_dificultad}
        total_reacciones={p.total_reacciones}
        total_comentarios={p.total_comentarios}
        fecha_creacion={p.publicacion_fecha}
        corazon_inicial={p.usuario_ya_reacciono}
        SetNotificacion_reaccion={() => Mostrar_Notificacion("¡Reacción agregada!")}
        guardado_inicial={p.usuario_ya_guardo}
        Setnotificacion_guardado={() => Mostrar_Notificacion("¡Receta guardada!")}
        Mostrar_Imagen={setImagen_seleccionada}
      />
    </View>
  ), [navigation]);

  const keyExtractor = useCallback(
    (item: Plato) => String(item.publicacion_id),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{ backgroundColor: colores.color_2 }}>
        <Header title="Foro" onBack={() => navigation.goBack()} />
      </View>

      {notificacion_exito && (
        <Notificacion
          mensaje={mensaje_notificacion}
          onFinish={() => setNotificacion_exito(false)}
          icono={require('../../Img/icono-correcto.png')}
        />
      )}

      {imagen_seleccionada && (
        <Imagen_Completa
          imagen={imagen_seleccionada}
          Cerrar_Imagen={() => setImagen_seleccionada(null)}
        />
      )}

      <FlatList
        data={platos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{ flex: 1, backgroundColor: colores.color_2  }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 10,
        }}
        ListHeaderComponent={
          <View style={estilos_foro.contenedor_filtros}>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
          </View>
        }
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
            <Texto>No hay platos subidos</Texto>
          </View>
        }
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={7}
      />

      <View style={{ backgroundColor: colores.color_2 }}>
        <BotonAgregar onPress={() => navigation.navigate("SubirReceta")} />
      </View>

    </SafeAreaView>
  );
}
