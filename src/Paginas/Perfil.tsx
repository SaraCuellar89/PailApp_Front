import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import Header from "../Componentes/Header";
import estilos_publicaciones from "./css/publicaciones_css";
import Header_Perfil from "../Componentes/Header_Perfil";
import Platos_Perfil from "../Componentes/Platos_Perfil";
import { AuthContext } from "../utils/Auth_Context";
import { Usuario_Sesion } from "../utils/Usuario_Sesion";
import { useFocusEffect } from "@react-navigation/native";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import Texto from "../Componentes/Texto";

interface Plato {
    id_publicacion: number;
    titulo: string;
    archivo: string;
    descripcion: string;
    ingredientes: string;
    preparacion: string;
    tiempo_preparacion: number;
    tipo_tiempo: string;
    dificultad: string;
    total_reacciones: number;
    total_comentarios: number;
    fecha_creacion: string;
    usuario_ya_reacciono: number;
    usuario_ya_guardo: number;
}

const Perfil = ({ navigation }: any) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario } = authContext;


    // ================= Funciones y Estados para mostrar la notificaciones de exito =================
      const [notificacion_exito, setNotificacion_exito] = useState(false);
      const [mensaje_notificacion, setMensaje_notificacion] = useState("");
      
      const Mostrar_Notificacion = (mensaje: string) => {
        setMensaje_notificacion(mensaje);
        setNotificacion_exito(true);
      }


    // ================= Funciones y estados para obtener todas los platos que ha subido el usuario =================
    const [mis_platos, setMis_platos] = useState<Plato[]>([]);

    useFocusEffect(
        useCallback(() => {
            const Obtener_Todos_Mis_Platos = async () => {
            const res = await fetch('http://35.174.135.238/publicaciones/todas_usuario', {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${usuario.token}`
                }
            });

            if(!res.ok) return console.log('Backend' + res.json());

            const data = await res.json();

            console.log(data.data)

            if(!data.success) return Mensaje_Toast.info(data.message);

            setMis_platos(data.data);
            };

            Obtener_Todos_Mis_Platos();
        }, [usuario.token])
    );


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

        <View style={{backgroundColor: colores.color_2}}>
            <Header 
                title="Perfil" 
                onBack={() => navigation.goBack()} 
                icono={require('../Img/icono-configuracion.png')}
                navegar={() => navigation.navigate("Configuracion")} 
            /> 
        </View>

       
        <ScrollView
            style={{ flex: 1, backgroundColor: '#000000' }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
        >

        <View style={estilos_publicaciones.container}>

            <Header_Perfil
                nombre_usuario={usuario.nombre ?? "dato incompleto"}
                edad={usuario.edad ?? "dato incompleto "}
                sexo={usuario.sexo ?? "dato incompleto "}
                altura={usuario.altura ?? "dato incompleto "}
                peso={usuario.peso ?? "dato incompleto "}
                avatar={usuario.avatar ?? "dato incompleto"}
            />

            {mis_platos.length === 0 ? 
            (
                <Texto>¡Sube un plato!</Texto>
            ) : 
            (
                <Platos_Perfil
                    platos={mis_platos}
                    navigation={navigation}
                    Mostrar_Notificacion={Mostrar_Notificacion}
                />
            )}
        </View>

        </ScrollView>

        </SafeAreaView>
    )
}

export default Usuario_Sesion(Perfil);