import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Filtros from "../Componentes/Filtros";
import ListaPublicaciones from "../Componentes/ListaPublicaciones";
import BotonAgregar from "../Componentes/BotonAgregar";
import Notificacion from "../Componentes/Notificacion";
import Header from "../Componentes/Header";

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
    <View style={styles.container}>
      {mostrarNoti && (
        <Notificacion
        mensaje={mensajeNoti}
        onFinish={() => setMostrarNoti(false)}
        />
)}

      <Header title="Publicaciones" onBack={() => navigation.goBack()} />

      <Filtros filtro={filtro} setFiltro={setFiltro} />

      <ListaPublicaciones
        filtro={filtro}
        navigation={navigation}
        onGuardar={(mensaje: string) => {
          setMensajeNoti(mensaje);
          setMostrarNoti(true);
        }}
      />

      <BotonAgregar onPress={() => navigation.navigate("SubirReceta")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EDE4C7" },
});