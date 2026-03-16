import React from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";
import { useForo } from "../context/ForoContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import { styles } from "../Estilos/PublicacionCard";

export default function PublicacionCard({ publicacion, onGuardar, navigation }: any) {
  const { toggleGuardar } = useForo();

const handleGuardar = () => {
  const estabaGuardada = publicacion.guardado;

  toggleGuardar(publicacion.id);

  if (estabaGuardada) {
    onGuardar("Receta eliminada");
  } else {
    onGuardar("Receta guardada");
  }
};

const { toggleLikePublicacion } = useForo();

  return (
    <TouchableOpacity
    activeOpacity={0.9}
    onPress={() =>
      navigation.navigate("DetallePublicacion", {
        publicacion,
      })
    }
  >
    <View style={styles.card}>
      <Text style={styles.titulo}>{publicacion.titulo}</Text>

      <Text style={styles.descripcion}>
        {publicacion.descripcion}
      </Text>

      {publicacion.imagen ? (
        <Image source={publicacion.imagen} style={styles.img} />
      ) : null}

      <View style={styles.infoExtra}>
        {publicacion.tiempo ? (
          <Text style={styles.extraText}>⏱ {publicacion.tiempo} min</Text>
        ) : null}

        {publicacion.dificultad ? (
          <Text style={styles.extraText}>🔥 {publicacion.dificultad}</Text>
        ) : null}
      </View>

      <Text style={styles.fecha}>
        {publicacion.fecha.toLocaleString()}
      </Text>

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity
  onPress={() => toggleLikePublicacion(publicacion.id)}
>
  <Icon
    name={publicacion.likedByUserr ? "heart" : "heart-outline"}
    size={22}
    color={publicacion.likedByUserr ? "red" : "black"}
  />
</TouchableOpacity>

<Text>{publicacion.likes}</Text>
          <Text style={[styles.iconText, { marginLeft: 15 }]}>
            💬 {publicacion.comentarios}
          </Text>
        </View>

        <TouchableOpacity onPress={handleGuardar}>
          <Text style={styles.iconText}>
            {publicacion.guardado ? "🔖" : "📑"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableOpacity>
  );
}