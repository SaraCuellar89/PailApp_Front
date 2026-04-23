import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import estilos_global, { colores } from "../estilos_global";
import Header from "../Componentes/Header";
import estilos_publicaciones from "./css/publicaciones_css";
import Formu_Datos_Adicionales from "../Componentes/Formu_Datos_Adicionales";

const Datos_Adicionales = ({ navigation }: any) => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

            <View style={{backgroundColor: colores.color_2}}>
                <Header 
                    title="Datos Adicionales" 
                /> 
            </View> 

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <ScrollView
                    style={{ flex: 1, backgroundColor: colores.color_4 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps="handled"
                >

                    <View style={estilos_publicaciones.container}>

                        <Formu_Datos_Adicionales
                            navigation={navigation}
                        />

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Datos_Adicionales;