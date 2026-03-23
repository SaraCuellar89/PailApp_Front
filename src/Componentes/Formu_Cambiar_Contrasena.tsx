import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import Texto from "./Texto";

const Formu_Cambiar_Contrasena = ({navigation}: any) => {

    // ================= Estados para ver y ocultar contraseñas =================
    const [mostrar_contrasena, setMostrar_contrasena] = useState(false);
    const [mostrar_confirmar_contrasena, setMostrar_confirmar_contrasena] = useState(false);

    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

                {/* --- Input de Contraseña --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Contraseña</Texto>
                    
                    <View style={estilo_formu_inicio_sesion_css.caja_contrasena}>
                        <TextInput 
                            secureTextEntry={!mostrar_contrasena}
                            placeholder="••••••••" 
                            placeholderTextColor={"grey"} 
                            style={estilo_formu_inicio_sesion_css.caja_input_contrasena}
                        />
                        <TouchableOpacity onPress={() => setMostrar_contrasena(!mostrar_contrasena)}>
                        <Image
                            source={mostrar_contrasena ? require("../Img/ver.png") : require("../Img/oculto.png")}
                            style={estilo_formu_inicio_sesion_css.ver_contrasena}
                            resizeMode="contain"
                        />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- Input de Confirmar Contraseña --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Confirmar Contraseña</Texto>
                    
                    <View style={estilo_formu_inicio_sesion_css.caja_contrasena}>
                        <TextInput 
                            secureTextEntry={!mostrar_confirmar_contrasena}
                            placeholder="••••••••" 
                            placeholderTextColor={"grey"} 
                            style={estilo_formu_inicio_sesion_css.caja_input_contrasena}
                        />
                        <TouchableOpacity onPress={() => setMostrar_confirmar_contrasena(!mostrar_confirmar_contrasena)}>
                        <Image
                            source={mostrar_confirmar_contrasena ? require("../Img/ver.png") : require("../Img/oculto.png")}
                            style={estilo_formu_inicio_sesion_css.ver_contrasena}
                            resizeMode="contain"
                        />
                        </TouchableOpacity>
                    </View>
                </View>

                

                {/* --- Boton para enviar el Formulario --- */}

                <TouchableOpacity style={estilos_global.btn_1} onPress={() => navigation.navigate('Chatbot')}>
                    <Texto style={estilos_global.texto_btn_1}>Aceptar</Texto> 
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Formu_Cambiar_Contrasena;