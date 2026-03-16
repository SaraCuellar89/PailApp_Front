import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Input from "./Input";
import Boton from "./Boton";
import { styles } from "../Estilos/Formu_Registro";

interface Props {
  onLoginPress: () => void;
}

export default function Formu_Registro({ onLoginPress }: Props) {
  return (
    <View style={styles.content}>
      
      <View style={styles.card}>
        <Input label="Nombre de usuario" />
        <Input label="Correo electrónico" />
        <Input label="Contraseña" secureTextEntry />

        <Boton title="Registrarse" />
      </View>

      <TouchableOpacity style={styles.googleBtn}>
        <Text style={styles.googleText}>
          Continuar con Google
        </Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        ¿Ya tienes cuenta?{" "}
        <Text style={{ fontWeight: "bold" }} onPress={onLoginPress}>
          Inicia sesión
        </Text>
      </Text>

    </View>
  );
}

