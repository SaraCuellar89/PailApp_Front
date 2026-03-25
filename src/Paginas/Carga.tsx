/**
 * Pantalla splash de arranque. Muestra logo y redirige automaticamente al inicio.
 */

import React, { useEffect } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import estilos_pantalla_carga from "./css/carga_css"
import estilos_global from "../estilos_global"
import Texto from "../Componentes/Texto";

export default function Carga({ navigation }: any) {

  // Funcion para cambiar de vista despues de 2.5 segundos
  useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace("Inicio");
      }, 2500);

      return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[estilos_global.fondo_1, estilos_pantalla_carga.contenedor]}>
      <Texto style={estilos_pantalla_carga.titulo}>PailApp</Texto>
      <Image
        source={require("../Img/logo_pailapp.png")}
        style={estilos_pantalla_carga.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}