import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "../Estilos/BotonAgregar.estilo";

export default function BotonAgregar({ onPress }: any) {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>+</Text>
    </TouchableOpacity>
  );
}