import React, { useContext, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import Texto from "./Texto";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

const Formu_Cambiar_Contrasena = ({navigation}: any) => {

    // ================= Datos del usuario por un contexto difinido =================
        const authContext = useContext(AuthContext);
        if (!authContext) throw new Error("AuthContext no está disponible");
        const { usuario, setUsuario } = authContext;
    

    // ================= Estados para ver y ocultar contraseñas =================
    const [mostrar_contrasena, setMostrar_contrasena] = useState(false);
    const [mostrar_confirmar_contrasena, setMostrar_confirmar_contrasena] = useState(false);


    // ================= Funciones y estados para solicitar la un codigo de recuperacion de contrasena =================
    // Estado del formulario 
    const [form, setForm] = useState({
        token: "", 
        contrasena: "", 
        confirmacion_contrasena: ""
    });

    // Handle Change genérico 
    const handleChange = (campo: string, valor: string) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
    };

    // Envio de los datos
    const Restablecer_Contrasena = async () => {

        // Validaciones
        const { contrasena, confirmacion_contrasena } = form;

        if (!contrasena || !confirmacion_contrasena) return Mensaje_Toast.error("Todos los campos son obligatorios");
        if (contrasena.length < 5) return Mensaje_Toast.error("La contraseña debe tener minimo 5 caracteres");
        if (contrasena !== confirmacion_contrasena) return Mensaje_Toast.error("Las contraseñas no coinciden");

        const res = await fetch('http://35.174.135.238/usuarios/restablecer_contrasena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        
        const data = await res.json();

        console.log(data)

        if(!data.success) return Mensaje_Toast.info(data.message);

        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    }


    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

                <Texto>Te hemos enviado un codigo de 5 digitos al correo.</Texto>

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Codigo</Texto>
                    <TextInput 
                        placeholder="00000" 
                        placeholderTextColor={"grey"} 
                        style={[estilos_global.caja_input]}
                        value={form.token}
                        onChangeText={(valor) => handleChange("token", valor)}
                    />
                </View>

                {/* --- Input de Contraseña --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Contraseña</Texto>
                    
                    <View style={estilo_formu_inicio_sesion_css.caja_contrasena}>
                        <TextInput 
                            secureTextEntry={!mostrar_contrasena}
                            placeholder="••••••••" 
                            placeholderTextColor={"grey"} 
                            style={estilo_formu_inicio_sesion_css.caja_input_contrasena}
                            value={form.contrasena}
                            onChangeText={(valor) => handleChange("contrasena", valor)}
                        />
                        <TouchableOpacity onPress={() => setMostrar_contrasena(!mostrar_contrasena)}>
                        <Image
                            source={require("../Img/oculto.png")}
                            style={mostrar_contrasena ? estilo_formu_inicio_sesion_css.no_ver_contrasena : estilo_formu_inicio_sesion_css.ver_contrasena}
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
                            value={form.confirmacion_contrasena}
                            onChangeText={(valor) => handleChange("confirmacion_contrasena", valor)}
                        />
                        <TouchableOpacity onPress={() => setMostrar_confirmar_contrasena(!mostrar_confirmar_contrasena)}>
                        <Image
                            source={require("../Img/oculto.png")}
                            style={mostrar_confirmar_contrasena ? estilo_formu_inicio_sesion_css.no_ver_contrasena : estilo_formu_inicio_sesion_css.ver_contrasena}
                            resizeMode="contain"
                        />
                        </TouchableOpacity>
                    </View>
                </View>

                

                {/* --- Boton para enviar el Formulario --- */}

                <TouchableOpacity style={estilos_global.btn_1} onPress={Restablecer_Contrasena}>
                    <Texto style={estilos_global.texto_btn_1}>Aceptar</Texto> 
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Formu_Cambiar_Contrasena;