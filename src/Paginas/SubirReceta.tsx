import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import FormSubirReceta from "../Componentes/FormSubirReceta";
import Header from "../Componentes/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";

export default function SubirReceta({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="¡Sube un plato!" 
          onBack={() => navigation.goBack()} 
        /> 
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      
        <ScrollView
          style={{ flex: 1, backgroundColor: '#000000' }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >

        <View style={estilos_publicaciones.container}>

          <FormSubirReceta navigation={() => navigation.navigate("Descripcion")} />

        </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
