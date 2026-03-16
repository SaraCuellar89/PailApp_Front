import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../Estilos/PublicacionCard";

export default function PlatoPerfilCard({ plato,onEditar,onEliminar}: any) {

return (

<View style={styles.card}>

<Text style={styles.titulo}>{plato.titulo}</Text>

<Text style={styles.descripcion}>
{plato.descripcion}
</Text>

<Image source={plato.imagen} style={styles.img} />

<View style={{flexDirection:"row",justifyContent:"center",gap:10,marginTop:10}}>

<TouchableOpacity
style={{ backgroundColor:"#f3d46b",padding:6,borderRadius:6}} onPress={() => onEditar(plato)}>

<Text>Editar Plato</Text>

</TouchableOpacity>

<TouchableOpacity
style={{ backgroundColor:"#f3d46b", padding:6, borderRadius:6 }} onPress={() => onEliminar(plato)} >

<Text>Eliminar Plato</Text>

</TouchableOpacity>

</View>

</View>

);
}