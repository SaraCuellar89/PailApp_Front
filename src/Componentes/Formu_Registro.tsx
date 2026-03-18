import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import Texto from "./Texto";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css"
import estilos_global, { colores } from "../estilos_global";


type Props = {
  avatar: any;
  onAbrirAvatares: () => void;
}

const Formu_Registro = ({ avatar, onAbrirAvatares  }: Props) => {

  const [mostrar_contrasena, setMostrar_contrasena] = useState(false);
  const [mostrar_confirmar_contrasena, setMostrar_confirmar_contrasena] = useState(false);


  return (
    <View style={estilo_formu_inicio_sesion_css.content}>

      <View style={[estilo_formu_inicio_sesion_css.card, estilos_global.fondo_1]}>

        {/* --- Input de Nombre de usuario --- */}

        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
          <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Nombre de Usuario</Texto>
          <TextInput 
            placeholder="Pepe Perez" 
            placeholderTextColor={"grey"} 
            style={[estilos_global.caja_input]}
          />
        </View>

        {/* --- Seleccionar avatar --- */}
        <View style={estilo_formu_inicio_sesion_css.contenedor_input}>
          <Texto style={estilo_formu_inicio_sesion_css.texto_label}>Avatar</Texto>
          
          {avatar ?
          (
            <TouchableOpacity onPress={onAbrirAvatares}>
              <Image
                source={avatar}
                style={{ width: 80, height: 80, borderRadius: 40 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : 
          (
            <TouchableOpacity onPress={onAbrirAvatares}>
              <Image
                source={require('../Img/icono-usuario.png')}
                style={{ width: 80, height: 80, borderRadius: 40 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

        </View>

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

        <TouchableOpacity style={estilos_global.btn_1}>
         <Texto style={estilos_global.texto_btn_1}>Registrarse</Texto> 
        </TouchableOpacity>

      </View>

    </View>
  );
}

export default Formu_Registro;