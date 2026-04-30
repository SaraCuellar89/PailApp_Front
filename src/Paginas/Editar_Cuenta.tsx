import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import Formu_Editar_Cuenta from "../Componentes/Formu_Editar_Cuenta";
import { colores } from "../estilos_global";
import Seleccionar_Avatar from "../Componentes/Seleccionar_Avatar";
import estilos_publicaciones from "./css/publicaciones_css";

export default function Editar_Cuenta({ navigation }: any) {

  // ================= Estados para mostrar el avatar despues de seleccionarlo =================
  const [avatar, setAvatar] = useState<ImageSourcePropType>({uri: "https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_1.png"});
  const [mostrarAvatares, setMostrarAvatares] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Editar Cuenta" 
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

          <View style={estilos_publicaciones.container}>    
            <Formu_Editar_Cuenta 
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
          <Seleccionar_Avatar onChange={(av : any) => { 
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
