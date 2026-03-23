import React from "react";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import { TextInput, TouchableOpacity, View } from "react-native";
import Texto from "./Texto";

const Formu_Codigo = ({navigation}: any) => {
    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

                <Texto>Te hemos enviado un codigo de 5 digitos al correo.</Texto>

                {/* --- Input de codigo --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Codigo</Texto>
                <TextInput 
                    placeholder="ejemplo@gmail.com" 
                    placeholderTextColor={"grey"} 
                    style={[estilos_global.caja_input]}
                />
                </View>

                {/* --- Boton para enviar el Formulario --- */}

                <TouchableOpacity style={estilos_global.btn_1} onPress={() => navigation.navigate('Cambiar_Contrasena')}>
                    <Texto style={estilos_global.texto_btn_1}>Siguiente</Texto> 
                </TouchableOpacity>

            </View>
    
        </View>
    )
}

export default Formu_Codigo;