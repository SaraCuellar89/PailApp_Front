import React, { useEffect } from 'react';
/**
 * Punto de entrada principal de la aplicacion.
 * Aqui se cargan las fuentes, se montan los providers globales
 * y se declara el stack de navegacion completo.
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, JetBrainsMono_400Regular, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthProvider } from "./src/utils/Auth_Context";


import Carga from './src/Paginas/Inicio/Carga';
import Inicio from './src/Paginas/Inicio/Inicio';
import Login from './src/Paginas/Autenticacion/Login';
import Correo_Recuperacion from './src/Paginas/Autenticacion/Correo_Recuperacion';
import Registro from './src/Paginas/Autenticacion/Registro';
import Chatbot from './src/Paginas/Chatbot/Chatbot';
import Foro from './src/Paginas/Comunidad/Foro';
import SubirReceta from './src/Paginas/Recetas/SubirReceta';
import DetallePublicacion from './src/Paginas/Comunidad/Publicaciones';
import MisPlatoss from './src/Paginas/Perfil/MisPlatoss';
import Perfil, { Plato } from './src/Paginas/Perfil/Perfil';
import Configuracion from './src/Paginas/Configuracion/Configuracion';
import Descripcion from './src/Paginas/Recetas/Descripcion';
import Datos_Adicionales from './src/Paginas/Recetas/Datos_Adicionales';
import Cambiar_Contrasena from './src/Paginas/Autenticacion/Cambiar_Contrasena';
import Notificaciones from './src/Paginas/Notificaciones/Notificaciones';
import { Configuracion_Toast } from './src/utils/Configuracion_Toast';
import Lista_Ingredientes from './src/Paginas/Recetas/Lista_Ingredientes';
import Editar_Cuenta from './src/Paginas/Configuracion/Editar_Cuenta';
import Editar_Contrasena from './src/Paginas/Configuracion/Editar_Contrasena';
import { escuchar_notificaciones, obtener_token_fcm } from './src/utils/Notificaciones';


export type RootStackParamList = {
  Carga: undefined;
  Inicio: { cerro_sesion?: boolean };
  Login: {registro_exitoso?: boolean };
  Registro: undefined;
  Correo_Recuperacion: undefined;
  Cambiar_Contrasena: undefined;
  Datos_Adicionales: undefined;
  Chatbot: { mensajeInicial?: string; initialVoiceMode?: boolean } | undefined;
  Notificaciones: undefined;
  Foro: { plato_subido?: boolean };
  SubirReceta: { plato?: Plato } | undefined;
  Descripcion: {
    titulo: string;
    archivo: string;
    public_id: string;
    ingredientes: string;
    tiempo_preparacion: string;
    tipo_tiempo: string;
    dificultad: string;
    plato?: Plato;
  };
  DetallePublicacion: {id_publicacion: number};
  MisPlatos: undefined;
  Lista_Ingredientes: {
    id_publicacion: number;
    nombre_publicacion: string;
  };
  Perfil: { plato_editado?: boolean };
  Configuracion: {
    cuenta_editada?: boolean;
    contrasena_editada?: boolean;
  };
  Editar_Cuenta: undefined;
  Editar_Contrasena: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); 

export default function App() {
  const [fuentes_cargadas] = useFonts({
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });

  // Iniciar listeners de notificaciones y registrar token FCM
  useEffect(() => {
    const unsubscribe = escuchar_notificaciones();
    return () => unsubscribe();
  }, []);

  if (!fuentes_cargadas) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator id="main" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Carga" component={Carga} />
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Correo_Recuperacion" component={Correo_Recuperacion} />
          <Stack.Screen name="Cambiar_Contrasena" component={Cambiar_Contrasena} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Datos_Adicionales" component={Datos_Adicionales} />
          <Stack.Screen name="Chatbot" component={Chatbot} />
          <Stack.Screen name="Notificaciones" component={Notificaciones} />
          <Stack.Screen name="Foro" component={Foro} />
          <Stack.Screen name="SubirReceta" component={SubirReceta} />
          <Stack.Screen name="Descripcion" component={Descripcion} />
          <Stack.Screen name="DetallePublicacion" component={DetallePublicacion} options={{ headerShown: false}} />
          <Stack.Screen name="MisPlatos" component={MisPlatoss} options={{ headerShown: false }} />
          <Stack.Screen name="Lista_Ingredientes" component={Lista_Ingredientes} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Configuracion" component={Configuracion} />
          <Stack.Screen name="Editar_Cuenta" component={Editar_Cuenta} />
          <Stack.Screen name="Editar_Contrasena" component={Editar_Contrasena} />
        </Stack.Navigator>

        <Toast config={Configuracion_Toast}/>
      </NavigationContainer>
    </AuthProvider>
  );
}
