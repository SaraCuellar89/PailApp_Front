import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import Texto from "./Texto";
import { estilos_comentarios } from "./css/comentarios_css";
import Formu_Comentario from "./Formu_Comentario";
import Respuestas from "./Respuestas";
import Opciones from "./Opciones";
import estilos_global from "../estilos_global";

const Comentarios = ({eliminar, setEliminar}: any) => {

    // ================= Estados para abrir el input de responder y para abrir las respuestas del comentario =================
    const [formu_respuesta, setFormu_respuesta] = useState(false);
    const [caja_respuestas, setCaja_respuestas] = useState(false);


    // ================= Estados y funciones para abrir la caja de editar/eliminar y para abrir el input de editar comentario =================
    const [caja_opciones, setCaja_opciones] = useState(false);
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        if (editar) {
            setCaja_opciones(false);
        }
    }, [editar]);
    

    return(
        <View style={estilos_comentarios.contenedor}>

            {/* --- Informacion del usuario y la fecha --- */}
            <View style={estilos_comentarios.contenedor_info}>
                <View style={estilos_comentarios.caja_info}>
                    <Image
                        source={require("../Img/avatar_3.png")}
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

            {/* --- Opciones para editar o eliminar el comentario --- */}
            {caja_opciones === false ? 
            (null): 
            (
                <View style={estilos_comentarios.caja_opciones}>
                    <Opciones
                        editar={editar}
                        setEditar={setEditar}
                        eliminar={eliminar}
                        setElimianr={setEliminar}
                    />
                </View>
            )}

            {/* --- Input para editar el comentario --- */}
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

            {/* --- Opciones para responder un comentario o para ver todas las respuestas --- */}
            <View style={estilos_comentarios.contenedor_respuestas}>
                <TouchableOpacity onPress={() => setFormu_respuesta(!formu_respuesta)}>
                    <Texto style={estilos_comentarios.nombre_usuario}>Responder</Texto>
                </TouchableOpacity>
                
                <TouchableOpacity style={estilos_comentarios.caja_respuestas} onPress={() => setCaja_respuestas(!caja_respuestas)}>
                    <Texto style={estilos_comentarios.texto}>2</Texto>
                    <Image
                        source={require("../Img/icono-respuesta.png")}
                        style={estilos_comentarios.icono_respuesta}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {formu_respuesta === true ? 
            (
                <Formu_Comentario/>
            ) : 
            (null)}

            {caja_respuestas === true ? 
            (
                <Respuestas/>
            ) : 
            (null)}
           
        </View>
    )
}

export default Comentarios;