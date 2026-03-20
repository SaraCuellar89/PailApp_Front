import React, { useState, useRef } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { estilos_formu_subir_receta } from "./css/formu_subir_receta_css";
import estilos_global, { colores } from "../estilos_global";
import Texto from "./Texto";
import ToastMensaje from "./ToastMensaje";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

const Formu_Descripcion_Pasos = () => {

    // Variables para los editores de texto
    const editorRef = useRef<any>(null);
    const pasosRef = useRef<any>(null); 

    return(
        <View style={estilos_formu_subir_receta.contenedor}>
            <View style={estilos_formu_subir_receta.caja_input}>
                <Texto style={estilos_formu_subir_receta.label}>Descripción</Texto>

                <View style={estilos_formu_subir_receta.caja_editor}>
                    <RichToolbar
                        style={estilos_formu_subir_receta.editor}
                        editor={editorRef}
                        actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        ]}
                    />
                </View>

                <View style={estilos_formu_subir_receta.input_grande}>
                    <RichEditor
                        ref={editorRef}
                        placeholder="Ej: El arroz paisa es de Antioquia"
                        style={{ flex: 1 }}
                        editorStyle={{
                            backgroundColor: colores.color_3, 
                            color: colores.color_4,             
                            placeholderColor: 'grey',
                        }}
                    />
                </View>
            </View>

            <View style={estilos_formu_subir_receta.caja_input}>
                <Texto style={estilos_formu_subir_receta.label}>Pasos Preparación</Texto>

                <View style={estilos_formu_subir_receta.caja_editor}>
                    <RichToolbar
                        style={estilos_formu_subir_receta.editor}
                        editor={pasosRef}
                        actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        ]}
                    />
                </View>

                <View style={estilos_formu_subir_receta.input_grande}>
                    <RichEditor
                        ref={pasosRef}
                        placeholder="Ej: 1. Poner los frijoles en agua "
                        style={{ flex: 1 }}
                        editorStyle={{
                            backgroundColor: colores.color_3, 
                            color: colores.color_4,             
                            placeholderColor: 'grey',
                        }}
                    />
                </View>
            </View>

            <View style={estilos_formu_subir_receta.caja_boton}>
                <TouchableOpacity style={[estilos_global.btn_1, estilos_formu_subir_receta.boton]}>
                <Texto style={estilos_global.texto_btn_1}>Subir</Texto>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Formu_Descripcion_Pasos;