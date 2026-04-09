import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import estilos_global, { colores } from "../estilos_global";
import Formu_Cambiar_Contrasena from "../Componentes/Formu_Cambiar_Contrasena";
import estilos_publicaciones from "./css/publicaciones_css";

const Cambiar_Contrasena = ({navigation}: any) => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <View style={[estilos_global.fondo_2, { flex: 1 }]}>
                
                <View style={{backgroundColor: colores.color_2}}>
                <Header 
                    title="Recuperar" 
                    onBack={() => navigation.goBack()} 
                /> 
                </View> 

                <View style={estilos_publicaciones.container}>
                    <Formu_Cambiar_Contrasena
                        navigation={navigation}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Cambiar_Contrasena;