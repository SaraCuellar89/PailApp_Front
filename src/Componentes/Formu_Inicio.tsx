import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Texto from "./Texto";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css"
import estilos_global from "../estilos_global";

const Formu_Inicio = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // ================= Estados para ver y ocultar contraseña =================
  const [mostrar, setMostrar] = useState(false);

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
          />
        </View>

        {/* --- Input de Contraseña --- */}

        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
          <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Contraseña</Texto>
          
          <View style={estilo_formu_inicio_sesion_css.caja_contrasena}>
            <TextInput 
              secureTextEntry={!mostrar}
              placeholder="••••••••" 
              placeholderTextColor={"grey"} 
              style={estilo_formu_inicio_sesion_css.caja_input_contrasena}
            />
            <TouchableOpacity onPress={() => setMostrar(!mostrar)}>
              <Image
                source={mostrar ? require("../Img/ver.png") : require("../Img/oculto.png")}
                style={estilo_formu_inicio_sesion_css.ver_contrasena}
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

        <TouchableOpacity style={estilos_global.btn_1} onPress={() => navigation.navigate('Chatbot')}>
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