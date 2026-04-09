/**
 * Pantalla de bienvenida con accesos a inicio de sesion y registro.
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Texto from "../Componentes/Texto";
import estilos_pantalla_inicio from "./css/inicio_css";
import Carrusel_Fondo from "../Componentes/Carrusel_Fondo";
import estilos_global from "../estilos_global";


const Inicio = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <View style={[estilos_pantalla_inicio.contenedor, estilos_global.fondo_2]}>

                <Carrusel_Fondo/>

                <View style={estilos_pantalla_inicio.caja_titulo}>
                    <Texto style={estilos_pantalla_inicio.titulo}>¡Bienvenido a PailApp!</Texto>
                </View>

                <TouchableOpacity style={estilos_pantalla_inicio.btn} onPress={() => navigation.navigate('Login')}>
                    <Texto style={estilos_pantalla_inicio.btn_texto}>Iniciar sesión</Texto>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Registro")}  style={estilos_pantalla_inicio.btn}>
                    <Texto style={estilos_pantalla_inicio.btn_texto}>Registrarse</Texto>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

export default Inicio;