/**
 * Pantalla detalle de una publicacion. Muestra comentarios y una notificacion al comentar.
 */

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../Componentes/Header";
import DetallesPublicacion from "../Componentes/DetallesPublicacion";
import Notificacion from "../Componentes/Notificacion";

export default function DetallePublicacion({ route, navigation }: any) {
  const [mostrarNoti, setMostrarNoti] = useState(false);

  return (
    <View style={styles.container}>
      {mostrarNoti && (
        <Notificacion
          mensaje="Comentario hecho"
          onFinish={() => setMostrarNoti(false)}
        />
      )}
      <Header title="Publicación" onBack={() => navigation.goBack()} />
      <DetallesPublicacion
        navigation={navigation}
        route={route}
        onComentario={() => setMostrarNoti(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EDE4C7" },
});