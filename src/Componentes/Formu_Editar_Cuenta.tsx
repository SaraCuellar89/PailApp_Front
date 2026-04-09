import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import Texto from "./Texto";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css"
import estilos_global from "../estilos_global";

const Formu_Editar_Cuenta = ({ avatar, onAbrirAvatares}: any) => {

  // ================= Estados para ver y ocultar contraseñas =================
  const [mostrar_contrasena, setMostrar_contrasena] = useState(false);


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
                source={require("../Img/oculto.png")}
                style={mostrar_contrasena ? estilo_formu_inicio_sesion_css.no_ver_contrasena : estilo_formu_inicio_sesion_css.ver_contrasena}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

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

        {/* --- Boton para enviar el Formulario --- */}

        <TouchableOpacity style={estilos_global.btn_1}>
         <Texto style={estilos_global.texto_btn_1}>Guardar</Texto> 
        </TouchableOpacity>

      </View>

    </View>
  );
}

export default Formu_Editar_Cuenta;