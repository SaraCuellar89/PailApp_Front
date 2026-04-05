import React, { useState, useContext } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Formu_Descripcion_Pasos from "../Componentes/Formu_Descripcion_Pasos";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Descripcion'>;

const Descripcion = ({route, navigation}: Props) => {

    //Datos recibidos de la vista de subir_receta
    const {titulo, archivo, ingredientes, tiempo_preparacion, tipo_tiempo, dificultad} = route.params;
    
    console.log("Datos recibidos:", route.params);

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        
            <View style={{backgroundColor: colores.color_2}}>
            <Header 
                title="¡Sube un plato!" 
                onBack={() => navigation.goBack()} 
            /> 
            </View>
    
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
            
            <ScrollView
                style={{ flex: 1, backgroundColor: '#000000' }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >
    
            <View style={estilos_publicaciones.container}>
                
                <Formu_Descripcion_Pasos
                    datos_receta={{ titulo, archivo, ingredientes, tiempo_preparacion, tipo_tiempo, dificultad }}
                    navigation={navigation}
                />

            </View>
    
            </ScrollView>
    
            </KeyboardAvoidingView>
    
        </SafeAreaView>
    )
}

export default Descripcion;