import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import Texto from "./Texto";
import Input from "./Input";
import Boton from "./Boton";
import estilo_formu_inicio_sesion from "../Componentes/css/formu_inicio_sesion"
import estilos_global from "../estilos_global";


interface Props {
  onRegisterPress: () => void;
  onChatBot: () => void;
}

const Formu_Inicio = ({ onRegisterPress, onChatBot }: Props) => {

  const [mostrar, setMostrar] = useState(false);

  const Ver_Contrasena = () => {
    if(mostrar === false) setMostrar(true);
    else setMostrar(false);
  }

  return (
    <View style={estilo_formu_inicio_sesion.content}>

      <View style={[estilo_formu_inicio_sesion.card, estilos_global.fondo_1]}>

        <View style={estilo_formu_inicio_sesion.contenedor_input}>
          <Texto style={estilo_formu_inicio_sesion.texto_label}>Correo Electronico</Texto>
          <TextInput 
            placeholder="ejemplo@gmail.com" 
            placeholderTextColor={"grey"} 
            style={[estilos_global.caja_input]}
          />
        </View>

        <View style={estilo_formu_inicio_sesion.contenedor_input}>
          <Texto style={estilo_formu_inicio_sesion.texto_label}>Contraseña</Texto>
          
          <View style={estilo_formu_inicio_sesion.caja_contrasena}>
            <TextInput 
              secureTextEntry={!mostrar}
              placeholder="••••••••" 
              placeholderTextColor={"grey"} 
              style={estilo_formu_inicio_sesion.caja_input_contrasena}
            />
            <TouchableOpacity onPress={() => setMostrar(!mostrar)}>
              <Image
                source={mostrar ? require("../Img/ver.png") : require("../Img/oculto.png")}
                style={estilo_formu_inicio_sesion.ver_contrasena}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Texto>Recuperar Contraseña</Texto> 
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={estilos_global.btn_1}>
         <Texto style={estilos_global.texto_btn_1}>Entrar</Texto> 
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={estilo_formu_inicio_sesion.googleBtn}>
        <Texto>Continuar con Google</Texto>
      </TouchableOpacity>

      <Texto style={estilo_formu_inicio_sesion.register}>
        ¿No tienes cuenta? <Texto style={{ fontFamily : "JetBrainsMono_700Bold" }} onPress={onRegisterPress}>Crea Una</Texto>
      </Texto>
    </View>
  );
}

export default Formu_Inicio;