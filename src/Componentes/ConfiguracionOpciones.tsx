import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import estilos_configuracion_opciones from "./css/configuracion_opciones";
import Texto from "./Texto";
import { useState } from "react";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";


export default function ConfiguracionOpciones() {

  const navigation = useNavigation<any>();


  return (
    <View>

      {/* --- Cambiar el tema de la aplicacion (oscuro/claro) --- */}
      <View style={estilos_configuracion_opciones.card}>
        <Texto style={estilos_configuracion_opciones.titulo}>Tema</Texto>

        <TouchableOpacity style={estilos_configuracion_opciones.botonTema} onPress={() => Mensaje_Toast.info("Función próximamente...")}>
          <Texto>Día</Texto>
        </TouchableOpacity>
      </View>

      {/* --- Boton para editar toda la informacion del usuario --- */}
      <TouchableOpacity style={estilos_configuracion_opciones.card}>
        <Texto style={estilos_configuracion_opciones.titulo}>Editar Perfil</Texto>
        <Texto style={estilos_configuracion_opciones.descripcion}>
          Puedes editar toda la información de tu cuenta
        </Texto>
      </TouchableOpacity>


      {/* --- Boton para cerrar sesion --- */}
      <TouchableOpacity style={estilos_configuracion_opciones.card}>
        <Texto style={estilos_configuracion_opciones.titulo}>Cerrar Sesión</Texto>
        <Texto style={estilos_configuracion_opciones.descripcion}>
          Recuerda que siempre puedes volver
        </Texto>
      </TouchableOpacity>

  
      {/* --- Boton para eliminar la cuenta de manera permanente --- */}
      <TouchableOpacity style={estilos_configuracion_opciones.card}>
        <Texto style={estilos_configuracion_opciones.titulo}>Eliminar Cuenta</Texto>
        <Texto style={estilos_configuracion_opciones.descripcion}>
          Esta acción es permanente e irreversible
        </Texto>
      </TouchableOpacity>

    </View>
  );
}