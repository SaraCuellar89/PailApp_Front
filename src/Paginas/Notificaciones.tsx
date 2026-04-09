import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Tarjeta_Notificaciones from "../Componentes/Tarjeta_Notificaciones";

const Notificaciones = ({navigation}: any) => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: colores.color_4 }}>
        
            <View style={{backgroundColor: colores.color_2}}>
                <Header 
                    title="Notificaciones" 
                    onBack={() => navigation.goBack()} 
                /> 
            </View>

            
            <ScrollView
                style={{ flex: 1, backgroundColor: colores.color_4 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >

                <View style={estilos_publicaciones.container}>

                    <Tarjeta_Notificaciones/>
                    <Tarjeta_Notificaciones/>
                    <Tarjeta_Notificaciones/>

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Notificaciones;