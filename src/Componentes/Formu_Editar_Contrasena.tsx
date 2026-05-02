import React, { useContext, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import Texto from "./Texto";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import { AuthContext } from "../utils/Auth_Context";

const Formu_Editar_Contrasena = ({navigation}: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario, setUsuario } = authContext;

    // ================= Estados para ver y ocultar contraseñas =================
    const [mostrar_contrasena_actual, setMostrar_contrasena_actual] = useState(false);
    const [mostrar_contrasena_nueva, setMostrar_contrasena_nueva] = useState(false);
    const [mostrar_confirmar_contrasena, setMostrar_confirmar_contrasena] = useState(false);

    // ================= Funciones y estados para el inicio de sesion =================
    // Estado del formulario 
    const [form, setForm] = useState({
        contrasena_actual: "", 
        contrasena_nueva: "", 
        confirmacion_contrasena:""
    });

    // Handle Change genérico 
    const handleChange = (campo: string, valor: string) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
    };

    // Envio de los datos
    const Editar_Contrasena = async () => {

        // Validaciones
        const { contrasena_actual, contrasena_nueva, confirmacion_contrasena} = form;
        if (!contrasena_actual || !contrasena_nueva || !confirmacion_contrasena) return Mensaje_Toast.error("Todos los campos son obligatorios");
        if(contrasena_nueva.trim().length < 5){
            return Mensaje_Toast.error("La contraseña debe tener al menos 5 caracteres");
        }

        const res = await fetch('http://35.174.135.238/usuarios/editar_contrasena', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`
        },
        body: JSON.stringify(form)
        });

        const data = await res.json();

        if(data.success === false) return Mensaje_Toast.info(data.message);

        Mensaje_Toast.exito('Cambio exitoso')
    }

    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

                {/* --- Input de Contraseña Actual --- */}
                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Contraseña Actual</Texto>
                    
                    <View style={estilo_formu_inicio_sesion_css.caja_contrasena}>
                        <TextInput 
                            secureTextEntry={!mostrar_contrasena_actual}
                            placeholder="••••••••" 
                            placeholderTextColor={"grey"} 
                            style={estilo_formu_inicio_sesion_css.caja_input_contrasena}
                            value={form.contrasena_actual}
                            onChangeText={(valor) => handleChange("contrasena_actual", valor)}
                        />
                        <TouchableOpacity onPress={() => setMostrar_contrasena_actual(!mostrar_contrasena_actual)}>
                        <Image
                            source={require("../Img/oculto.png")}
                            style={mostrar_contrasena_actual ? estilo_formu_inicio_sesion_css.no_ver_contrasena : estilo_formu_inicio_sesion_css.ver_contrasena}
                            resizeMode="contain"
                        />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- Input de Contraseña Nueva --- */}
                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Contraseña Nueva</Texto>
                    
                    <View style={estilo_formu_inicio_sesion_css.caja_contrasena}>
                        <TextInput 
                            secureTextEntry={!mostrar_contrasena_nueva}
                            placeholder="••••••••" 
                            placeholderTextColor={"grey"} 
                            style={estilo_formu_inicio_sesion_css.caja_input_contrasena}
                            value={form.contrasena_nueva}
                            onChangeText={(valor) => handleChange("contrasena_nueva", valor)}
                        />
                        <TouchableOpacity onPress={() => setMostrar_contrasena_nueva(!mostrar_contrasena_nueva)}>
                        <Image
                            source={require("../Img/oculto.png")}
                            style={mostrar_contrasena_nueva ? estilo_formu_inicio_sesion_css.no_ver_contrasena : estilo_formu_inicio_sesion_css.ver_contrasena}
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

                <TouchableOpacity style={estilos_global.btn_1} onPress={Editar_Contrasena}>
                    <Texto style={estilos_global.texto_btn_1}>Aceptar</Texto> 
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Formu_Editar_Contrasena;