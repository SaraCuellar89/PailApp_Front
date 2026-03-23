import React from "react";
import { TouchableOpacity, View, TextInput } from "react-native";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import Texto from "./Texto";


const Formu_Datos_Adicionales = ({navigation}: any) => {
    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

                {/* --- Input de la edad --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Edad</Texto>
                    <TextInput 
                        placeholder="Ej: 22" 
                        placeholderTextColor={"grey"} 
                        style={[estilos_global.caja_input]}
                    />
                </View>

                {/* --- Input de la altura --- */}
                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Altura</Texto>
                    <TextInput 
                        placeholder="Ej: 170" 
                        placeholderTextColor={"grey"} 
                        style={[estilos_global.caja_input]}
                    />
                </View>

                {/* --- Input del peso --- */}
                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Peso</Texto>
                    <TextInput 
                        placeholder="Ej: 60" 
                        placeholderTextColor={"grey"} 
                        style={[estilos_global.caja_input]}
                    />
                </View>

                {/* --- Boton para enviar el formulario --- */}
                <TouchableOpacity style={estilos_global.btn_1} onPress={() => navigation.navigate('Chatbot')}>
                    <Texto style={estilos_global.texto_btn_1}>Registrarse</Texto> 
                </TouchableOpacity>

            </View>           
        </View>
    )
}

export default Formu_Datos_Adicionales;