import React, { useContext, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Formu_Editar_Contrasena from "../Componentes/Formu_Editar_Contrasena";

export default function Editar_Contrasena({ navigation }: any) {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Cambiar Contraseña" 
          onBack={() => navigation.goBack()} 
        /> 
      </View> 

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        
        <ScrollView
            style={{ flex: 1, backgroundColor: '#000000' }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
        >
            <View style={[estilos_publicaciones.container, { minHeight: '100%' }]}>    
                <Formu_Editar_Contrasena/>
            </View>
        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
