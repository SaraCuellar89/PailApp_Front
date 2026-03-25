/**
 * Pantalla principal del foro. Coordina filtros, notificaciones y el listado visible de publicaciones.
 */

import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Filtros from "../Componentes/Filtros";
import BotonAgregar from "../Componentes/BotonAgregar";
import Notificacion from "../Componentes/Notificacion";
import Header from "../Componentes/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import PublicacionCard from "../Componentes/PublicacionCard";
import estilos_foro from "./css/foro_css";

export default function Foro({ navigation, route }: any) {
  const [filtro, setFiltro] = useState<"recientes" | "antiguas">("recientes");
  const [mostrarNoti, setMostrarNoti] = useState(false);
  const [mensajeNoti, setMensajeNoti] = useState("");

  useEffect(() => {
  if (route.params?.notificacion) {
    setMensajeNoti(route.params.notificacion);
    setMostrarNoti(true);
      }
    }, [route.params]);
  

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
    
      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Foro" 
          onBack={() => navigation.goBack()} 
          icono={null}
        /> 
      </View> 

      <ScrollView
        style={{ flex: 1, backgroundColor: '#000000' }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={estilos_foro.contenedor}>

          {mostrarNoti && (
            <Notificacion
              mensaje={mensajeNoti}
              onFinish={() => setMostrarNoti(false)}
            />
          )}

          <View style={estilos_foro.contenedor_filtros}>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
          </View>

          <View style={estilos_foro.contenedor_publicaciones}>
            <PublicacionCard/>
            <PublicacionCard/>
          </View>

        </View>

    </ScrollView>

    <View style={{backgroundColor: colores.color_2}}>
      <BotonAgregar onPress={() => navigation.navigate("SubirReceta")} />
    </View> 

    </SafeAreaView>
  );
}