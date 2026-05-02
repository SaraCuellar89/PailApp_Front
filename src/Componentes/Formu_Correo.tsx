import React, { useContext, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import Texto from "./Texto";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

const Formu_Correo = ({navigation}: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario, setUsuario } = authContext;

    // ================= Funciones y estados para solicitar la un codigo de recuperacion de contrasena =================
    const [correo, setCorreo] = useState("");

    // Envio de los datos
    const Solicitar_Recuperacion = async () => {

        // Validaciones
        const emailRegex = /^[^@\s]+@[^@\s]+\.(com)$/;

        if (!correo) return Mensaje_Toast.error("Llene el campo solicitado");
        if (!emailRegex.test(correo)) return Mensaje_Toast.error("Correo invalido");

        const res = await fetch('http://35.174.135.238/usuarios/contrasena_olvidada', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo })
        });
        
        const data = await res.json();

        if(!data.success) return Mensaje_Toast.info(data.message);

        navigation.navigate("Cambiar_Contrasena");
    }

    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

                {/* --- Input de Correo electronico --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Correo Electronico</Texto>
                <TextInput 
                    placeholder="ejemplo@gmail.com" 
                    placeholderTextColor={"grey"} 
                    style={[estilos_global.caja_input]}
                    value={correo}
                    onChangeText={setCorreo}
                />
                </View>

                {/* --- Boton para enviar el Formulario --- */}

                <TouchableOpacity style={estilos_global.btn_1} onPress={Solicitar_Recuperacion}>
                    <Texto style={estilos_global.texto_btn_1}>Siguiente</Texto> 
                </TouchableOpacity>

            </View>
    
        </View>
    )
}

export default Formu_Correo;