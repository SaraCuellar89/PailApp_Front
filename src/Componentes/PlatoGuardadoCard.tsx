/**
 * Tarjeta visual para mostrar un plato guardado y permitir quitarlo de favoritos.
 */

import React from "react";
import { View, Text,Image, TouchableOpacity } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { styles } from "../Estilos/PlatoGuardadoCard";

export default function PlatoGuardadoCard({
  plato,
  onEliminar,
}: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{plato.titulo}</Text>

      <Text style={styles.descripcion}>
        {plato.descripcion}
      </Text>

      <Image source={plato.imagen} style={styles.img} />

      <View style={styles.badges}>
        <Text style={styles.badge}>Fácil</Text>
        <Text style={styles.badge}>⏱ 30 min</Text>
      </View>

      <View style={styles.footer}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text>❤️ {plato.likes}</Text>
          <Text>💬 {plato.comentarios}</Text>
        </View>

        <TouchableOpacity onPress={() => onEliminar(plato)}>
          <Icon name="bookmark" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}