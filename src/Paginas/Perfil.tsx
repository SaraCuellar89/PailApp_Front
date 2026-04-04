import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import Header from "../Componentes/Header";
import estilos_publicaciones from "./css/publicaciones_css";
import Header_Perfil from "../Componentes/Header_Perfil";
import Platos_Perfil from "../Componentes/Platos_Perfil";


const Perfil = ({ navigation }: any) => {

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

        <View style={{backgroundColor: colores.color_2}}>
            <Header 
            title="Perfil" 
            onBack={() => navigation.goBack()} 
            icono={require('../Img/icono-configuracion.png')}
            navegar={() => navigation.navigate("Configuracion")} 
            /> 
        </View>

       
        <ScrollView
            style={{ flex: 1, backgroundColor: '#000000' }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
        >

        <View style={estilos_publicaciones.container}>

            <Header_Perfil/>

            <Platos_Perfil
                navigation={navigation}
            />
        </View>

        </ScrollView>

        </SafeAreaView>
    )
}

export default Perfil;