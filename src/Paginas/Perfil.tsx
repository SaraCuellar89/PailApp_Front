import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import Header from "../Componentes/Header";
import estilos_publicaciones from "./css/publicaciones_css";
import Header_Perfil from "../Componentes/Header_Perfil";
import Platos_Perfil from "../Componentes/Platos_Perfil";
import { AuthContext } from "../utils/Auth_Context";
import { Usuario_Sesion } from "../utils/Usuario_Sesion";


const Perfil = ({ navigation }: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario } = authContext;

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

            <Header_Perfil
                nombre_usuario={usuario.nombre ?? "dato incompleto"}
                edad={usuario.edad ?? "dato incompleto "}
                altura={usuario.altura ?? "dato incompleto "}
                peso={usuario.peso ?? "dato incompleto "}
                avatar={usuario.avatar ?? "dato incompleto"}
            />

            <Platos_Perfil
                navigation={navigation}
            />
        </View>

        </ScrollView>

        </SafeAreaView>
    )
}

export default Usuario_Sesion(Perfil);