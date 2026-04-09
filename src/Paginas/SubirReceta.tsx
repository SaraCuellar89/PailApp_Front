/**
 * Pantalla contenedora para crear una nueva receta o publicacion desde el formulario dedicado.
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import FormSubirReceta from "../Componentes/FormSubirReceta";
import Header from "../Componentes/Header";

export default function SubirReceta({ navigation }: any) {
  return (
    <View style={styles.container}>
        <Header title="Subir receta" onBack={() => navigation.goBack()} />
      <FormSubirReceta navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EDE4C7" },
});