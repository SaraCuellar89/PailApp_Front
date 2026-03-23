import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import estilos_global, { colores } from "../estilos_global";
import Formu_Codigo from "../Componentes/Formu_Codigo";

const Codigo = ({navigation}: any) => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <View style={[estilos_global.fondo_2, { flex: 1 }]}>
                
                <View style={{backgroundColor: colores.color_2}}>
                <Header 
                    title="Recuperar" 
                    onBack={() => navigation.goBack()} 
                /> 
                </View> 

                <Formu_Codigo
                    navigation={navigation}
                />

            </View>
        </SafeAreaView>
    )
}

export default Codigo;