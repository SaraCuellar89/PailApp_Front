import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Header from "../Componentes/Header";
import Notificacion from "../Componentes/Notificacion";
import { colores } from "../estilos_global";
import { SafeAreaView } from "react-native-safe-area-context";
import PublicacionCard from "../Componentes/PublicacionCard";
import Comentarios from "../Componentes/Comentarios";
import Formu_Comentario from "../Componentes/Formu_Comentario";

export default function DetallePublicacion({ route, navigation }: any) {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Foro" 
          onBack={() => navigation.goBack()} 
          icono={null}
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

          <View style={styles.container}>

            <PublicacionCard/>

            <Comentarios/>
            <Comentarios/>

          </View>

        </ScrollView>

      <View style={[{backgroundColor: colores.color_2}, styles.caja_formu_comentario]}>
        <Formu_Comentario/>
      </View> 

    </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#EDE4C7",
    padding: 20,
    gap: 20
  },
  caja_formu_comentario: {
    paddingHorizontal: 20
  }
});