import React from "react";
import { View, Text, } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { styles } from "../Estilos/ToastMensaje";

export default function ToastMensaje({ mensaje }: any) {
  if (!mensaje) return null;

  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle" size={20} color="black" />
      <Text style={styles.text}>{mensaje}</Text>
    </View>
  );
}

