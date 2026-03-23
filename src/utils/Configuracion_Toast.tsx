import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colores } from '../estilos_global';

export const Configuracion_Toast = {
  success: ({ text1 }: any) => (
    <View style={estilos_toast.contenedor_exito}>
      <Text style={estilos_toast.texto}>{text1}</Text>
    </View>
  ),
  error: ({ text1 }: any) => (
    <View style={estilos_toast.contenedor_error}>
      <Text style={estilos_toast.texto}>{text1}</Text>
    </View>
  ),
  info: ({ text1 }: any) => (
    <View style={estilos_toast.contenedor_info}>
      <Text style={estilos_toast.texto}>{text1}</Text>
    </View>
  ),
};

const estilos_toast = StyleSheet.create({
  contenedor_exito: {
    backgroundColor: colores.color_4,
    borderLeftWidth: 5,
    borderLeftColor: '#22c55e',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  contenedor_error: {
    backgroundColor: colores.color_4,
    borderLeftWidth: 5,
    borderLeftColor: '#ef4444',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  contenedor_info: {
    backgroundColor: colores.color_4,
    borderLeftWidth: 5,
    borderLeftColor: '#3b82f6',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  texto: {
    color: colores.color_3,
    fontSize: 14,
    fontFamily: 'JetBrainsMono_400Regular',
  }
});