import React from "react";
import { View, Text,TouchableOpacity, Image } from "react-native";
import { styles } from "../Estilos/Header";

interface Props {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: Props) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>

    </View>
  );
}