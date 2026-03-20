import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForoProvider } from './src/context/ForoContext';
import { RecetasProvider } from "./src/context/RecetasContext";
import { useFonts, JetBrainsMono_400Regular, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import { ActivityIndicator, View } from 'react-native';


import Carga from './src/Paginas/Carga';
import Inicio from './src/Paginas/Inicio';
import Login from './src/Paginas/Login';
import Registro from './src/Paginas/Registro';
import ChatbotPrincipal from './src/Paginas/Chatbot/Chatbot';
import ChatVoz from './src/Paginas/Chatbot/Chatbot_Voz';
import Chatbot_Conversacion from './src/Paginas/Chatbot/Chatbot_Conversacion';
import Foro from './src/Paginas/Foro';
import SubirReceta from './src/Paginas/SubirReceta';
import DetallePublicacion from './src/Paginas/Publicaciones';
import MisPlatoss from './src/Paginas/MisPlatoss';
import MisPlatosPerfil from './src/Paginas/MisPlatosPerfil';
import Configuracion from './src/Paginas/Configuracion';
import EditarPerfil from './src/Paginas/EditarPerfil';
import Descripcion from './src/Paginas/Descripcion';

export type RootStackParamList = {
  Carga: undefined;
  Inicio: undefined;
  Login: undefined;
  Registro: undefined;
  Chatbot: undefined;
  ChatbotVoz: undefined;
  Chatbot_Conversacion: undefined;
  Foro: undefined;
  SubirReceta: undefined;
  Descripcion: undefined;
  DetallePublicacion: undefined;
  MisPlatos: undefined;
  MisPlatosPerfil: undefined;
  Configuracion: undefined;
  EditarPerfil: undefined;
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
    <RecetasProvider>
      <ForoProvider>
        <NavigationContainer>
          <Stack.Navigator id="main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Carga" component={Carga} />
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registro" component={Registro} />
            <Stack.Screen name="Chatbot" component={ChatbotPrincipal} />
            <Stack.Screen name="ChatbotVoz" component={ChatVoz} />
            <Stack.Screen name="Chatbot_Conversacion" component={Chatbot_Conversacion} />
            <Stack.Screen name="Foro" component={Foro} />
            <Stack.Screen name="SubirReceta" component={SubirReceta} />
            <Stack.Screen name="Descripcion" component={Descripcion} />
            <Stack.Screen name="DetallePublicacion" component={DetallePublicacion} options={{ headerShown: false}} />
            <Stack.Screen name="MisPlatos" component={MisPlatoss} options={{ headerShown: false }} />
            <Stack.Screen name="MisPlatosPerfil" component={MisPlatosPerfil} />
            <Stack.Screen name="Configuracion" component={Configuracion} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          </Stack.Navigator>
        </NavigationContainer>
    </ForoProvider>
  </RecetasProvider>
  );
}
