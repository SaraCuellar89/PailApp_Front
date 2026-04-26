import React, { useState } from "react";
import estilos_platos_perfil from "./css/platos_perfil_css";
import Texto from "./Texto";
import { Image, TouchableOpacity, View } from "react-native";
import PublicacionCard from "./PublicacionCard";
import Opciones from "./Opciones";


const Platos_Perfil = ({navigation, mi_plato_id_publicacion, mi_plato_guardar_ejemplo, mi_plato_setGuardar_Ejemplo, mi_plato_titulo, mi_plato_archivo, mi_plato_descripcion, mi_plato_ingredientes, mi_plato_preparacion, mi_plato_tiempo_preparacion, mi_plato_tipo_tiempo, mi_plato_dificultad, mi_plato_total_reacciones, mi_plato_total_comentarios, mi_plato_fecha_creacion, mi_plato_corazon_inicial, mi_plato_SetNotificacion_reaccion, mi_plato_guardado_inicial, mi_plato_Setnotificacion_guardado}: any) => {

    // ================= Estados abrir la caja de opciones (editar/eliminar) =================
    const [caja_opciones, setCaja_opciones] = useState(false);

    return(
        <View>
            <Texto style={estilos_platos_perfil.texto}>Platos que has subido</Texto>

            <View>

                {/* --- Caja de opciones --- */}
                <TouchableOpacity style={estilos_platos_perfil.caja_publicacion} onPress={() => setCaja_opciones(!caja_opciones)}>
                    <Image
                        source={require("../Img/icono-puntos.png")}
                        style={estilos_platos_perfil.icono_puntos}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <PublicacionCard
                    id_publicacion={mi_plato_id_publicacion}
                    guardar_ejemplo={mi_plato_guardar_ejemplo}
                    setGuardar_Ejemplo={mi_plato_setGuardar_Ejemplo}
                    titulo={mi_plato_titulo}
                    archivo={mi_plato_archivo}
                    descripcion={mi_plato_descripcion}
                    ingredientes={mi_plato_ingredientes}
                    preparacion={mi_plato_preparacion}
                    tiempo_preparacion={mi_plato_tiempo_preparacion}
                    tipo_tiempo={mi_plato_tipo_tiempo}
                    dificultad={mi_plato_dificultad}
                    total_reacciones={mi_plato_total_reacciones}
                    total_comentarios={mi_plato_total_comentarios}
                    fecha_creacion={mi_plato_fecha_creacion}
                    corazon_inicial={mi_plato_corazon_inicial}
                    SetNotificacion_reaccion={mi_plato_SetNotificacion_reaccion}
                    guardado_inicial={mi_plato_guardado_inicial}
                    Setnotificacion_guardado={mi_plato_Setnotificacion_guardado}
                />

                {caja_opciones === false ? 
                (null): 
                (
                    <View style={estilos_platos_perfil.caja_opciones}>
                        <Opciones
                            editar={caja_opciones}
                            setEditar={setCaja_opciones}
                            Ir_Editar={() => navigation.navigate("SubirReceta")}
                        />
                    </View>
                )}
            </View>
        </View>
    )
}

export default Platos_Perfil;