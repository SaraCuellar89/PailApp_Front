import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import estilos_global, { colores } from "../estilos_global";
import Header from "../Componentes/Header";
import Formu_Correo from "../Componentes/Formu_Correo";
import estilos_publicaciones from "./css/publicaciones_css";

const Correo_Recuperacion = ({navigation}: any) => {
    
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
                    <Formu_Correo
                        navigation={navigation}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Correo_Recuperacion;