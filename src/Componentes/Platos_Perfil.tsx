import React, { useState } from "react";
import estilos_platos_perfil from "./css/platos_perfil_css";
import Texto from "./Texto";
import { Image, TouchableOpacity, View } from "react-native";
import PublicacionCard from "./PublicacionCard";
import Opciones from "./Opciones";


const Platos_Perfil = ({navigation}: any) => {

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
                    guardar_ejemplo={false}
                    setGuardar_Ejemplo={() => {}}
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