import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "../Estilos/Header2";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  onBack?: () => void;
}

export default function Header2({ title, onBack }: Props) {

  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>

      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Configuracion")}>
        <Image
          source={require("../Img/Tuerquita.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

    </View>
  );
}