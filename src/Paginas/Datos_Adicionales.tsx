import React from "react";
import { View } from "react-native";
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

            <View style={estilos_publicaciones.container}>

                <Formu_Datos_Adicionales
                    navigation={navigation}
                />

            </View>

        </SafeAreaView>
    )
}

export default Datos_Adicionales;