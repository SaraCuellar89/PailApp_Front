import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { estilos_comentarios } from "./css/comentarios_css";
import Texto from "./Texto";
import Opciones from "./Opciones";
import estilos_global from "../estilos_global";

const Respuestas = () => {

    // Opciones y funciones para editar un comentario
    const [caja_opciones, setCaja_opciones] = useState(false);
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        if (editar) {
            setCaja_opciones(false);
        }
    }, [editar]);

    return(
        <View style={[estilos_comentarios.contenedor_componente_respuestas, estilos_comentarios.contenedor]}>
            <View style={estilos_comentarios.contenedor_info}>
                <View style={estilos_comentarios.caja_info}>
                    <Image
                        source={require("../Img/avatar_5.png")}
                        style={estilos_comentarios.foto_usuario}
                        resizeMode="contain"
                    />
                    <Texto style={estilos_comentarios.nombre_usuario}>Usuario_1</Texto>
                    <Texto style={estilos_comentarios.texto}>7/02/2025</Texto>
                </View>
                
                <TouchableOpacity onPress={() => setCaja_opciones(!caja_opciones)}>
                    <Image
                        source={require("../Img/icono-puntos.png")}
                        style={estilos_comentarios.icono_puntos}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View> 

            {caja_opciones === false ? 
            (
                null
            ): 
            (
                <Opciones
                    editar={editar}
                    setEditar={setEditar}
                />
            )}

            {editar === false ?
            (
                <Texto style={estilos_comentarios.texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et metus vitae Aliquam, ullamcorper tristique Aliquam Lorem ipsum dolor sit amet, consectetur.
                </Texto>
            ) : 
            (
                <View>
                    <TextInput
                        style={estilos_comentarios.input_editar}
                        multiline={true}
                        numberOfLines={4}        
                        textAlignVertical="top"
                    />
                    
                    <View style={estilos_comentarios.caja_btn_editar}>
                        <TouchableOpacity style={estilos_global.btn_1}>
                            <Texto style={estilos_global.texto_btn_1}>Cancelar</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={estilos_global.btn_1}>
                            <Texto style={estilos_global.texto_btn_1}>Guardar</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
           
        </View>
    )
}

export default Respuestas;