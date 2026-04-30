import React, { useRef, useState, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { estilos_formu_subir_receta } from "./css/formu_subir_receta_css";
import estilos_global, { colores } from "../estilos_global";
import Texto from "./Texto";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import { AuthContext } from "../utils/Auth_Context";

const Formu_Descripcion_Pasos = ({navigation, datos_receta, plato, Cancelar_Cambios}: any) => {
    const es_edicion = !!plato;

    // ================= Funciones para lo editores de texto =================
    const editorRef = useRef<any>(null);
    const pasosRef = useRef<any>(null); 

    const [activar_opciones, setActivar_opciones] = useState([]);


    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario } = authContext;


    // ================= Estados y Funciones para subir un plato =================
    // Estado del formulario 
    const [form, setForm] = useState({
        descripcion: plato?.descripcion ?? "",
        preparacion: plato?.preparacion ?? "",
    });

    // Handle Change genérico 
    const handleChange = (campo: string, valor: string) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
    };

    // Enviar formulario a la bbdd
    const Subir_Plato = async () => {

        // ----- Validaciones -----
        const campos = [
            { nombre: "Título", valor: form.descripcion },
            { nombre: "Tiempo aprox. de preparación",valor: form.preparacion }
        ];
    
        // Campos obligatorios
        for (const campo of campos) {
            if (!campo.valor.trim()) {
                Mensaje_Toast.error(`"${campo.nombre}" es un campo obligatorio`);
                return;
            }
        };

        // ----- Construir FormData -----
        const formData = new FormData();

        const ahora = new Date();
        const fecha_creacion = ahora.toISOString().slice(0, 19).replace("T", " ");

        // Datos de texto
        formData.append("titulo", datos_receta.titulo);
        formData.append("ingredientes", datos_receta.ingredientes);
        formData.append("tiempo_preparacion", datos_receta.tiempo_preparacion);
        formData.append("tipo_tiempo", datos_receta.tipo_tiempo);
        formData.append("dificultad", datos_receta.dificultad);
        formData.append("descripcion", form.descripcion);
        formData.append("preparacion", form.preparacion);
        formData.append("fecha_creacion", fecha_creacion);

        // Archivo de imagen (si existe)
        if (datos_receta.archivo) {
            const uri = datos_receta.archivo;
            const nombre = uri.split("/").pop() ?? "foto.jpg";
            const extension = nombre.split(".").pop();
            const tipo = `image/${extension === "jpg" ? "jpeg" : extension}`;

            formData.append("archivo", {
                uri,
                name: nombre,
                type: tipo,
            } as any);
        }

        // ----- Enviar datos a la bbdd-----
        const url = es_edicion
        ? `http://35.174.135.238/publicaciones/editar/${plato.id_publicacion}`
        : `http://35.174.135.238/publicaciones/subir`;

        const res = await fetch(url, {
            method: es_edicion ? "PUT" : "POST",
            headers: { 'Authorization': `Bearer ${usuario.token}`},
            body: formData
        });

        const datos = await res.json();

        if(!datos.success) return Mensaje_Toast.info(datos.message);

        if (es_edicion) {
            navigation.pop(2);
            navigation.navigate("Perfil", { plato_editado: true });
        } else {
            navigation.pop(2);
            navigation.navigate("Foro", { plato_subido: true });
        }
    }

    return(
        <View style={estilos_formu_subir_receta.contenedor}>
            <View style={estilos_formu_subir_receta.caja_input}>

                {/* --- Input de la descripcion --- */}
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
                        iconTint="grey"
                        selectedIconTint="black"
                    />
                </View>

                <View style={estilos_formu_subir_receta.input_grande}>
                    <RichEditor
                        ref={editorRef}
                        initialContentHTML={plato?.descripcion ?? ""} 
                        placeholder="Ej: El arroz paisa es de Antioquia"
                        onChange={(valor) => handleChange("descripcion", valor)}
                        style={estilos_formu_subir_receta.estilos_rich_editor}
                        editorStyle={{
                            backgroundColor: colores.color_3, 
                            color: colores.color_4,             
                            placeholderColor: 'grey',
                        }}
                        onCursorPosition={() => {}}
                        {...{
                            registerToolbar: (items: any) => {
                                setActivar_opciones(items);
                            }
                        }}
                    />
                </View>
            </View>

            {/* --- Input de los pasos de preparacion --- */}
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
                        iconTint="grey"
                        selectedIconTint="black"
                    />
                </View>

                <View style={estilos_formu_subir_receta.input_grande}>
                    <RichEditor
                        ref={pasosRef}
                        initialContentHTML={plato?.preparacion ?? `<ol><li></li></ol>`} 
                        placeholder="Ej: 1. Poner los frijoles en agua"
                        onChange={(valor) => handleChange("preparacion", valor)}
                        style={estilos_formu_subir_receta.estilos_rich_editor}
                        editorStyle={{
                            backgroundColor: colores.color_3, 
                            color: colores.color_4,             
                            placeholderColor: 'grey',
                        }}
                        onCursorPosition={() => {}}
                        {...{
                            registerToolbar: (items: any) => {
                                setActivar_opciones(items);
                            }
                        }}
                    />
                </View>
            </View>

            {/* --- Boton para enviar el formulario --- */}
            <View style={estilos_formu_subir_receta.caja_boton}>
                <TouchableOpacity style={[estilos_global.btn_1, estilos_formu_subir_receta.boton]} onPress={Subir_Plato}>
                    <Texto style={estilos_global.texto_btn_1}>
                        {es_edicion ? "Guardar cambios" : "Subir"}
                    </Texto>
                </TouchableOpacity>

                {es_edicion && (
                    <TouchableOpacity
                        style={[estilos_global.btn_1, estilos_formu_subir_receta.boton]}
                        onPress={Cancelar_Cambios}
                    >
                        <Texto style={estilos_global.texto_btn_1}>Cancelar</Texto>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default Formu_Descripcion_Pasos;