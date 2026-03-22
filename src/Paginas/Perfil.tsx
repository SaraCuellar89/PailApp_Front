import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import Header from "../Componentes/Header";
import estilos_publicaciones from "./css/publicaciones_css";

const Perfil = ({ route, navigation }: any) => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

        <View style={{backgroundColor: colores.color_2}}>
            <Header 
            title="Foro" 
            onBack={() => navigation.goBack()} 
            icono={require('../Img/icono-configuracion.png')}
            navegar={() => navigation.navigate("Configuracion")} 
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

            </View>

            </ScrollView>

        </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Perfil;