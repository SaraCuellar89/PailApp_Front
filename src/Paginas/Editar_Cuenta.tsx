import React, { useContext, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import Formu_Editar_Cuenta from "../Componentes/Formu_Editar_Cuenta";
import { colores } from "../estilos_global";
import Seleccionar_Avatar from "../Componentes/Seleccionar_Avatar";
import estilos_publicaciones from "./css/publicaciones_css";
import { AuthContext } from "../utils/Auth_Context";
import Notificacion from "../Componentes/Notificacion";

export default function Editar_Cuenta({ navigation }: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario, setUsuario } = authContext;


  // ================= Funciones y Estados para mostrar la notificaciones de exito =================
  const [notificacion_exito, setNotificacion_exito] = useState(false);
  const [mensaje_notificacion, setMensaje_notificacion] = useState("");
  
  const Mostrar_Notificacion = (mensaje: string) => {
    setMensaje_notificacion(mensaje);
    setNotificacion_exito(true);
  }


  // ================= Estados para mostrar el avatar despues de seleccionarlo =================
  const [avatar, setAvatar] = useState<ImageSourcePropType>({
    uri: usuario?.avatar ?? "https://raw.githubusercontent.com/SaraCuellar89/PailApp_Front/main/src/Img/avatar_4.png"
  });
  const [mostrarAvatares, setMostrarAvatares] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Editar Cuenta" 
          onBack={() => navigation.goBack()} 
        /> 
      </View> 

      {/* Renderizado de notificacion de plato subido */}
      {notificacion_exito && ( 
          <Notificacion
              mensaje={mensaje_notificacion}
              onFinish={() => setNotificacion_exito(false)}
              icono={require('../Img/icono-correcto.png')}
          />
      )}

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
              navigation={navigation}
              avatar={avatar} 
              onAbrirAvatares={() => setMostrarAvatares(true)} 
            />
          </View>

        </ScrollView>


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
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}
