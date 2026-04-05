import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import Filtros from "../Componentes/Filtros";
import BotonAgregar from "../Componentes/BotonAgregar";
import Notificacion from "../Componentes/Notificacion";
import Header from "../Componentes/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import PublicacionCard from "../Componentes/PublicacionCard";
import estilos_foro from "./css/foro_css";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import Texto from "../Componentes/Texto";

// Tipos de los platos publicados
interface Plato {
  id_publicacion: number,
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
}

export default function Foro({ navigation, route }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario, setUsuario } = authContext;


  // ================= Estados para mostrar la notificacion de plato subido =================
  const [mensaje_plato_subido, setMensaje_plato_subido] = useState(
      route.params?.plato_subido ?? false
  );


  // ================= Estados y funciones para mostrar el mensaje de notificacion =================
  const [filtro, setFiltro] = useState<"recientes" | "antiguas">("recientes");


  // ================= Funciones y estados para obtener todas los platos =================
  // Estado para guardar los platos
  const [platos, setPlatos] = useState<Plato[]>([])

  useEffect(() => {
    const Obtener_Todos_Platos = async () => {
      const res = await fetch('http://35.174.135.238/publicaciones/todas', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${usuario.token}`
        }
      })

      if(!res.ok) return console.log('Backend' + res.json());

      const data = await res.json();

      if(!data.success) return Mensaje_Toast.info(data.message);

      console.log(data)

      setPlatos(data.data)
    }

    Obtener_Todos_Platos()
  }, [])
  

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
    
      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Foro" 
          onBack={() => navigation.goBack()} 
        /> 
      </View> 

      {/* Renderizado de notificacion de plato subido */}
      {mensaje_plato_subido && ( 
          <Notificacion
              mensaje="Plato Subido"
              onFinish={() => setMensaje_plato_subido(false)}
              icono={require('../Img/icono-correcto.png')}
          />
      )}

      <ScrollView
        style={{ flex: 1, backgroundColor: '#000000' }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={estilos_foro.contenedor}>

          <View style={estilos_foro.contenedor_filtros}>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
          </View>

          <View style={estilos_foro.contenedor_publicaciones}>
            {platos ? 
            (
              <>
                {platos.map((p) => (
                  <PublicacionCard
                    key={p.id_publicacion}
                    id_publicacion={p.id_publicacion}
                    guardar_ejemplo={false}
                    setGuardar_Ejemplo={() => {}}
                    titulo={p.titulo}
                    archivo={p.archivo}
                    descripcion={p.descripcion}
                    ingredientes={p.ingredientes}
                    preparacion={p.preparacion}
                    tiempo_preparacion={p.tiempo_preparacion}
                    tipo_tiempo={p.tipo_tiempo}
                    dificultad={p.dificultad}
                    total_reacciones={p.total_reacciones}
                    total_comentarios={p.total_comentarios}
                    fecha_creacion={p.fecha_creacion}
                  />
                ))}
              </>
            ) : 
            (
              <Texto>No hay platos subidos</Texto>
            )}
          </View>

        </View>

    </ScrollView>

    <View style={{backgroundColor: colores.color_2}}>
      <BotonAgregar onPress={() => navigation.navigate("SubirReceta")} />
    </View> 

    </SafeAreaView>
  );
}