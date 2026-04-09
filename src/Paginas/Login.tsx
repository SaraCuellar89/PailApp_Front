import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import Formu_Inicio from "../Componentes/Formu_Inicio";
import estilos_global, { colores } from "../estilos_global";
import Notificacion from "../Componentes/Notificacion";
import estilos_publicaciones from "./css/publicaciones_css";

export default function Login({ navigation, route }: any) {

  // ================= Estados para mostrar registro exitoso =================
  const [mensaje_cerrar_sesion, setMensaje_cerrar_sesion] = useState(
      route.params?.registro_exitoso ?? false
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
  
      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Iniciar Sesión" 
          onBack={() => navigation.goBack()} 
        /> 
      </View> 

<<<<<<< HEAD
        <Formu_Inicio
          onRegisterPress={() => navigation.navigate("Registro")}
          onChatBot={() => navigation.navigate("ChatbotVoz")}
        />
=======
      {/* Renderizado de notificacion de registro exitoso */}
      {mensaje_cerrar_sesion && ( 
          <Notificacion
              mensaje="Registro exitoso"
              onFinish={() => setMensaje_cerrar_sesion(false)}
              icono={require('../Img/icono-correcto.png')}
          />
      )}

      <ScrollView
        style={{ flex: 1, backgroundColor: '#000000' }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={estilos_publicaciones.container}>

          <Formu_Inicio/>

        </View>

      </ScrollView>
>>>>>>> 5a5e0e6cf45f2314627ed160aafa87d7a9260ce9

    </SafeAreaView>
  );
}
