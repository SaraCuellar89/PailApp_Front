/**
 * Pantalla de perfil que lista los platos publicados por el usuario y ofrece acciones sobre ellos.
 */

import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRecetas } from "../context/RecetasContext";
import PlatoPerfilCard from "../Componentes/PlatoPerfilCard";
import ModalConfirmacion2 from "../Componentes/ModalConfirmacion2";
import Header2 from "../Componentes/Header_pailapp";

export default function MisPlatosPerfil({ navigation }: any) {

// platos que se han subido 

const { recetas } = useRecetas();

const [modalVisible,setModalVisible] = useState(false);
const [platoSeleccionado,setPlatoSeleccionado] = useState(null);

const editarPlato = (plato:any) => {

navigation.navigate("SubirReceta",{modo:"editar",plato});

};

const eliminarPlato = (plato:any) => {

setPlatoSeleccionado(plato);
setModalVisible(true);

};

return (

<View style={{flex:1,backgroundColor:"#e9dfc3"}}>

<Header2 title="Perfil" onBack={() => navigation.goBack()} />

<Text style={{ fontSize:20,textAlign:"center",marginTop:20,fontWeight: "bold", margin: 40}}>
Platos que has subido
</Text>

<ScrollView>

{recetas.map((plato:any)=>(
<PlatoPerfilCard key={plato.id} plato={plato} onEditar={editarPlato}onEliminar={eliminarPlato}/>)
)
}

</ScrollView>

<ModalConfirmacion2
visible={modalVisible}
onConfirm={()=>setModalVisible(false)}
onCancel={()=>setModalVisible(false)}
/>

</View>

);
}