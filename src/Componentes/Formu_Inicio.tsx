import React, { useContext, useState } from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Texto from "./Texto";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css"
import estilos_global from "../estilos_global";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../utils/Auth_Context";

const Formu_Inicio = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { setUsuario } = authContext;

  // ================= Estados para ver y ocultar contraseña =================
  const [mostrar_contrasena, setMostrar_contrasena] = useState(false);

  // ================= Funciones y estados para el inicio de sesion =================
  // Estado del formulario 
  const [form, setForm] = useState({
      correo: "",
      contrasena: "",
  });

  // Handle Change genérico 
  const handleChange = (campo: string, valor: string) => {
      setForm(prev => ({ ...prev, [campo]: valor }));
  };

  // Envio de los datos
  const Iniciar_Sesion = async () => {

    // Validaciones
    const { correo, contrasena } = form;
    if (!correo || !contrasena) return Mensaje_Toast.error("Todos los campos son obligatorios");

    const res = await fetch('http://35.174.135.238/usuarios/iniciar_sesion', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if(data.success === false) return Mensaje_Toast.info(data.message);

    // Guardar la informacion del usuario
    await AsyncStorage.setItem("usuario", JSON.stringify(data.data));
    setUsuario(data.data);

    if (data.data.altura == null || data.data.peso == null || data.data.edad == null) navigation.navigate("Datos_Adicionales");
    else {
      // Evita que el usuario se devuelva
      navigation.reset({
        index: 0,
        routes: [{ name: "Chatbot" }],
      });
    }
    
  }

  return (
    <View style={estilo_formu_inicio_sesion_css.content}>

      <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

        {/* --- Input de Correo electronico --- */}

        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
          <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Correo Electronico</Texto>
          <TextInput 
            placeholder="ejemplo@gmail.com" 
            placeholderTextColor={"grey"} 
            style={[estilos_global.caja_input]}
            value={form.correo}
            onChangeText={(valor) => handleChange("correo", valor)}
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

          {/* --- Boton para recuperar contraseña --- */}
          <TouchableOpacity onPress={() => navigation.navigate('Correo_Recuperacion')}>
            <Texto>Recuperar Contraseña</Texto> 
          </TouchableOpacity>
        </View>

        {/* --- Boton para enviar el Formulario --- */}
        <TouchableOpacity style={estilos_global.btn_1} onPress={Iniciar_Sesion}>
         <Texto style={estilos_global.texto_btn_1}>Entrar</Texto> 
        </TouchableOpacity>

      </View>

      {/* --- Boton para Iniciar Sesion con Google --- */}
      <TouchableOpacity style={estilo_formu_inicio_sesion_css.googleBtn}>
        <Texto>Continuar con Google</Texto>
      </TouchableOpacity>

      {/* --- Boton para ir a la pantalla de registro --- */}
      <Texto style={estilo_formu_inicio_sesion_css.register}>
        ¿No tienes cuenta? <Texto style={{ fontFamily : "JetBrainsMono_700Bold" }} onPress={() => navigation.navigate('Registro')}>Crea Una</Texto>
      </Texto>
    </View>
  );
}

export default Formu_Inicio;