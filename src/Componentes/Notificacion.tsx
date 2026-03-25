/**
 * Toast animado que muestra mensajes breves de confirmacion al usuario.
 */

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Notificacion({ mensaje, onFinish }: any) {
  const progreso = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();

    Animated.timing(progreso, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(translateX, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onFinish());
    });
  }, []);

  const width = progreso.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <View style={styles.contenido}>
        <View style={styles.iconoContainer}>
          <Ionicons name="checkmark-circle" size={24} color="#1a1a1a" />
        </View>
        <Text style={styles.texto}>{mensaje}</Text>
      </View>
      <View style={styles.barraFondo}>
        <Animated.View style={[styles.barra, { width }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    right: 0,
    backgroundColor: "#f5e662",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    overflow: "hidden",
    minWidth: 200,
  },
  contenido: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 20,
    gap: 10,
  },
  iconoContainer: {
    backgroundColor: "#f0d800",
    borderRadius: 20,
    padding: 4,
  },
  texto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  barraFondo: {
    height: 4,
    backgroundColor: "#e0c800",
  },
  barra: {
    height: 4,
    backgroundColor: "#1a1a1a",
  },
});