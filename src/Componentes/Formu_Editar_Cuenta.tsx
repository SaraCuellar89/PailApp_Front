import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import Texto from "./Texto";
import estilo_formu_inicio_sesion_css from "./css/formu_inicio_sesion_css"
import estilos_global from "../estilos_global";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../utils/Auth_Context";

const Formu_Editar_Cuenta = ({ avatar, onAbrirAvatares}: any) => {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { usuario, setUsuario } = authContext;


  // ================= Estados para ver y ocultar contraseñas =================
  const [mostrar_contrasena, setMostrar_contrasena] = useState(false);
  

  // ================= Funciones y estados para editar la cuenta =================
  // Estados para el dropdown de sexo
  const [abrir_sexo, setAbrir_sexo] = useState(false);
  const [sexo_value, setSexo_value] = useState(null);

  const [sexo, setSexo] = useState([
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Prefiero no decirlo', value: 'Prefiero no decirlo' }
  ]);

  // Estado del formulario 
  const [form, setForm] = useState({
    nombre_usuario: usuario?.nombre ?? "",
    correo: usuario?.correo ?? "",
    contrasena: "",
    avatar: usuario?.avatar ?? "",
    sexo: usuario?.sexo ?? "",
    edad: usuario?.edad ?? "",
    peso: usuario?.peso ?? "",
    altura: usuario?.altura ?? "",
  });

  // Handle Change genérico 
  const handleChange = (campo: string, valor: string) => {
    setForm(prev => ({ ...prev, [campo]: valor }));
  };

  // Obtener la url del avatar
  useEffect(() => {
    handleChange("avatar", avatar.uri);
  }, [avatar]);

  const Editar_Cuenta = async () => {

    // Validaciones
    const { nombre_usuario, correo, contrasena, avatar, edad, peso, altura } = form;
    const emailRegex = /^[^@\s]+@[^@\s]+\.(com)$/;

    if (!nombre_usuario || !correo || !contrasena || !avatar || !edad || !peso || !altura) return Mensaje_Toast.error("Todos los campos son obligatorios");
    if (nombre_usuario.length < 5) return Mensaje_Toast.error("El nombre de usuario debe tener minimo 5 caracteres"); 
    if (!emailRegex.test(correo)) return Mensaje_Toast.error("Correo invalido");
    if (contrasena.length < 5) return Mensaje_Toast.error("La contraseña debe tener minimo 5 caracteres");

    const edadNum = Number(edad);
    const pesoNum = Number(peso);
    const alturaNum = Number(altura);

    if (!edad || !peso || !altura) return Mensaje_Toast.error("Todos los campos son obligatorios");
    if (isNaN(edadNum) || isNaN(pesoNum) || isNaN(alturaNum)) return Mensaje_Toast.error("Solo se permiten valores numéricos");
    if (edadNum < 10 || edadNum > 120) return Mensaje_Toast.error("Edad fuera de rango válida (10-120)");
    if (pesoNum < 20 || pesoNum > 300) return Mensaje_Toast.error("Peso fuera de rango válido (20-300 kg)");
    if (alturaNum < 0.5 || alturaNum > 2.5) return Mensaje_Toast.error("Altura fuera de rango válida (0.50 - 2.50 m)");

    // Envio de los datos
    const res = await fetch('http://35.174.135.238/usuarios/editar_cuenta', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuario.token}`
      },
      body: JSON.stringify(form)
    });

    if(!res.ok) return Mensaje_Toast.error("Error al registrar");

    navigation.navigate("Perfil");
  }

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
            value={form.nombre_usuario}
            onChangeText={(valor) => handleChange("nombre_usuario", valor)}
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
            value={form.correo}
            onChangeText={(valor) => handleChange("correo", valor)}
            keyboardType="email-address"
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
                placeholder="Ej: 170" 
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

        {/* --- Boton para enviar el Formulario --- */}

        <TouchableOpacity style={estilos_global.btn_1}>
         <Texto style={estilos_global.texto_btn_1}>Guardar</Texto> 
        </TouchableOpacity>

      </View>

    </View>
  );
}

export default Formu_Editar_Cuenta;