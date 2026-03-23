import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import Formu_Inicio from "../Componentes/Formu_Inicio";
import estilos_global, { colores } from "../estilos_global";

export default function Login({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={[estilos_global.fondo_2, { flex: 1 }]}>
        
        <View style={{backgroundColor: colores.color_2}}>
          <Header 
            title="Iniciar Sesión" 
            onBack={() => navigation.goBack()} 
          /> 
        </View> 

        <Formu_Inicio/>

      </View>
    </SafeAreaView>
  );
}
