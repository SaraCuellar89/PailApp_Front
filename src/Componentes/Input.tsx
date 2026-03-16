import React from "react";
import { View, Text, TextInput, } from "react-native";
import { styles } from "../Estilos/Input";

interface Props {
  label: string;
  secureTextEntry?: boolean;
}

export default function Input({ label, secureTextEntry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}