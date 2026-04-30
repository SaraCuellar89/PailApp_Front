import React, { useEffect, useState, useContext } from "react";
import { TouchableOpacity, View, TextInput } from "react-native";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css";
import estilos_global from "../estilos_global";
import Texto from "./Texto";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Formu_Datos_Adicionales = ({navigation}: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario, setUsuario } = authContext;


    // ================= Funciones y estados para el inicio de sesion =================
    // Estado del formulario 
    const [form, setForm] = useState({
        sexo: "",
        edad: "",
        peso: "",
        altura: "",
    });

    // Estados para el dropdown de sexo
    const [abrir_sexo, setAbrir_sexo] = useState(false);
    const [sexo_value, setSexo_value] = useState(null);

    const [sexo, setSexo] = useState([
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Prefiero no decirlo', value: 'Prefiero no decirlo' }
    ]);

    // Handle Change genérico 
    const handleChange = (campo: string, valor: string) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
    };
    
    // Envio de los datos
    const Registrar_Adicionales = async () => {

        // Validaciones
        const { edad, peso, altura } = form;

        const edadNum = Number(edad);
        const pesoNum = Number(peso);
        const alturaNum = Number(altura);

        if (!edad || !peso || !altura) return Mensaje_Toast.error("Todos los campos son obligatorios");
        if (isNaN(edadNum) || isNaN(pesoNum) || isNaN(alturaNum)) return Mensaje_Toast.error("Solo se permiten valores numéricos");
        if (edadNum < 10 || edadNum > 120) return Mensaje_Toast.error("Edad fuera de rango válida (10-120)");
        if (pesoNum < 20 || pesoNum > 300) return Mensaje_Toast.error("Peso fuera de rango válido (20-300 kg)");
        if (alturaNum < 0.5 || alturaNum > 2.5) return Mensaje_Toast.error("Altura fuera de rango válida (0.50 - 2.50 m)");
        

        const res = await fetch('http://35.174.135.238/usuarios/registrar_datos_adicionales', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if(data.success === false) return Mensaje_Toast.info(data.message);


        // Actualizar contexto con los nuevos datos
        const usuario_actualizado = { ...usuario, edad: form.edad, peso: form.peso, altura: form.altura, sexo: form.sexo };
        setUsuario(usuario_actualizado);                             
        await AsyncStorage.setItem("usuario", JSON.stringify(usuario_actualizado));

        navigation.reset({
            index: 0,
            routes: [{ name: "Chatbot" }],
        });
    }

    
    return(
        <View style={estilo_formu_inicio_sesion_css.content}>

            <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

                {/* --- Input del sexo --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Sexo</Texto>
                    <DropDownPicker
                        open={abrir_sexo}
                        value={sexo_value}
                        items={sexo}
                        setOpen={setAbrir_sexo}
                        setValue={setSexo_value}
                        setItems={setSexo}
                        placeholder="Ej: Femenino"
                        placeholderStyle={{ color: 'grey' }}
                        listMode="SCROLLVIEW"
                        onChangeValue={(valor) => handleChange("sexo", valor ?? "")}
                    />
                </View>

                {/* --- Input de la edad --- */}

                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Edad</Texto>
                    <TextInput 
                        placeholder="Ej: 22" 
                        placeholderTextColor={"grey"} 
                        style={[estilos_global.caja_input]}
                        value={form.edad}
                        onChangeText={(valor) => handleChange("edad", valor)}
                    />
                </View>

                {/* --- Input de la altura --- */}
                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Altura</Texto>
                    <TextInput 
                        placeholder="Ej: 1.70" 
                        placeholderTextColor={"grey"} 
                        style={[estilos_global.caja_input]}
                        value={form.altura}
                        onChangeText={(valor) => handleChange("altura", valor)}
                    />
                </View>

                {/* --- Input del peso --- */}
                <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
                    <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Peso</Texto>
                    <TextInput 
                        placeholder="Ej: 60" 
                        placeholderTextColor={"grey"} 
                        style={[estilos_global.caja_input]}
                        value={form.peso}
                        onChangeText={(valor) => handleChange("peso", valor)}
                    />
                </View>

                {/* --- Boton para enviar el formulario --- */}
                <TouchableOpacity style={estilos_global.btn_1} onPress={Registrar_Adicionales}>
                    <Texto style={estilos_global.texto_btn_1}>Aceptar</Texto> 
                </TouchableOpacity>

            </View>           
        </View>
    )
}

export default Formu_Datos_Adicionales;