import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Texto from "./Texto";
import { estilos_comentarios } from "./css/comentarios_css";
import Formu_Comentario from "./Formu_Comentario";
import Respuestas from "./Respuestas";
import Opciones from "./Opciones";

const Comentarios = () => {

    const [formu_respuesta, setFormu_respuesta] = useState(false);
    const [caja_respuestas, setCaja_respuestas] = useState(false);
    const [caja_opciones, setCaja_opciones] = useState(false);

    return(
        <View style={estilos_comentarios.contenedor}>
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

            {caja_opciones === false ? 
            (
                null
            ): 
            (
                <Opciones/>
            )}

            <Texto style={estilos_comentarios.texto}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et metus vitae Aliquam, ullamcorper tristique Aliquam Lorem ipsum dolor sit amet, consectetur.
            </Texto>

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
            (
                null
            )}

            {caja_respuestas === true ? 
            (
                <Respuestas/>
            ) : 
            (
                null
            )}
           
        </View>
    )
}

export default Comentarios;