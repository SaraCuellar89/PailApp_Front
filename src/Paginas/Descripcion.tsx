import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Texto from "../Componentes/Texto";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Formu_Descripcion_Pasos from "../Componentes/Formu_Descripcion_Pasos";

const Descripcion = ({ navigation }: any) => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        
            <View style={{backgroundColor: colores.color_2}}>
            <Header 
                title="¡Sube un plato!" 
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
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >
    
            <View style={estilos_publicaciones.container}>
                
                <Formu_Descripcion_Pasos/>

            </View>
    
            </ScrollView>
    
            </KeyboardAvoidingView>
    
        </SafeAreaView>
    )
}

export default Descripcion;