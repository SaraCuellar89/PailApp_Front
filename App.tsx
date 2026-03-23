import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, JetBrainsMono_400Regular, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';


import Carga from './src/Paginas/Carga';
import Inicio from './src/Paginas/Inicio';
import Login from './src/Paginas/Login';
import Correo_Recuperacion from './src/Paginas/Correo_Recuperacion';
import Registro from './src/Paginas/Registro';
import ChatbotPrincipal from './src/Paginas/Chatbot/Chatbot';
import ChatVoz from './src/Paginas/Chatbot/Chatbot_Voz';
import Chatbot_Conversacion from './src/Paginas/Chatbot/Chatbot_Conversacion';
import Foro from './src/Paginas/Foro';
import SubirReceta from './src/Paginas/SubirReceta';
import DetallePublicacion from './src/Paginas/Publicaciones';
import MisPlatoss from './src/Paginas/MisPlatoss';
import Perfil from './src/Paginas/Perfil';
import Configuracion from './src/Paginas/Configuracion';
import Descripcion from './src/Paginas/Descripcion';
import Datos_Adicionales from './src/Paginas/Datos_Adicionales';
import Codigo from './src/Paginas/Codigo';
import Cambiar_Contrasena from './src/Paginas/Cambiar_Contrasena';
import Notificaciones from './src/Paginas/Notificaciones';
import { Configuracion_Toast } from './src/utils/Configuracion_Toast';


export type RootStackParamList = {
  Carga: undefined;
  Inicio: undefined;
  Login: undefined;
  Registro: undefined;
  Correo_Recuperacion: undefined;
  Codigo: undefined;
  Cambiar_Contrasena: undefined;
  Datos_Adicionales: undefined;
  Chatbot: undefined;
  Notificaciones: undefined;
  ChatbotVoz: undefined;
  Chatbot_Conversacion: undefined;
  Foro: undefined;
  SubirReceta: undefined;
  Descripcion: undefined;
  DetallePublicacion: undefined;
  MisPlatos: undefined;
  Perfil: undefined;
  Configuracion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); 

// Funcion para cargar la tipografia de la aplicacion
export default function App() {
  const [fuentes_cargadas] = useFonts({
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });

  if (!fuentes_cargadas) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator id="main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Carga" component={Carga} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Correo_Recuperacion" component={Correo_Recuperacion} />
        <Stack.Screen name="Codigo" component={Codigo} />
        <Stack.Screen name="Cambiar_Contrasena" component={Cambiar_Contrasena} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Datos_Adicionales" component={Datos_Adicionales} />
        <Stack.Screen name="Chatbot" component={ChatbotPrincipal} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} />
        <Stack.Screen name="ChatbotVoz" component={ChatVoz} />
        <Stack.Screen name="Chatbot_Conversacion" component={Chatbot_Conversacion} />
        <Stack.Screen name="Foro" component={Foro} />
        <Stack.Screen name="SubirReceta" component={SubirReceta} />
        <Stack.Screen name="Descripcion" component={Descripcion} />
        <Stack.Screen name="DetallePublicacion" component={DetallePublicacion} options={{ headerShown: false}} />
        <Stack.Screen name="MisPlatos" component={MisPlatoss} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Configuracion" component={Configuracion} />
      </Stack.Navigator>

      <Toast config={Configuracion_Toast}/>
    </NavigationContainer>
  );
}
