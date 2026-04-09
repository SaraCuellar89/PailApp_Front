/**
 * Pantalla de registro que integra el formulario y el selector modal de avatar.
 */

import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import Formu_Registro from "../Componentes/Formu_Registro";
import { colores } from "../estilos_global";
import registro_css from "./css/registro_css";
import Seleccionar_Avatar from "../Componentes/Seleccionar_Avatar";

export default function Registro({ navigation }: any) {

  const [avatar, setAvatar] = useState(null);
  const [mostrarAvatares, setMostrarAvatares] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Crear cuenta" 
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
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >

          <View style={registro_css.contenedor}>    
            <Formu_Registro 
              avatar={avatar} 
              onAbrirAvatares={() => setMostrarAvatares(true)} 
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de avatares */}
      <View style={{backgroundColor: colores.color_2}}>

        {mostrarAvatares === true ? 
        (
          <Seleccionar_Avatar onChange={(av) => { 
            setAvatar(av); 
            setMostrarAvatares(false); 
          }} />
        ) :
        (
          null
        )}

      </View>

    </SafeAreaView>
  );
}
