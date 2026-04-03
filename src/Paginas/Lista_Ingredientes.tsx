import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Texto from "../Componentes/Texto";
import estilos_lista_ingredientes from "./css/lista_ingredientes";
import Formu_Lista_Ingredientes from "../Componentes/Formu_Lista_Ingredientes";

const Lista_Ingredientes = ({navigation}: any) => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: colores.color_4 }}>
        
            <View style={{backgroundColor: colores.color_2}}>
                <Header 
                    title="Lista" 
                    onBack={() => navigation.goBack()} 
                /> 
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
            
                <ScrollView
                    style={{ flex: 1, backgroundColor: colores.color_4 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps="handled"
                >

                    <View style={estilos_publicaciones.container}>

                        <Texto style={estilos_lista_ingredientes.texto}>Lo que necesitas para hacer "Pasta de Pollo"</Texto>

                        <Formu_Lista_Ingredientes/>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Lista_Ingredientes;