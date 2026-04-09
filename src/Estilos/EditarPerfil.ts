/**
 * Hoja de estilos reutilizable para un componente o pantalla especifica del proyecto.
 */

import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#e9e1c2",
alignItems:"center",
paddingTop:40
},

card:{
display: "flex",
backgroundColor:"#f3c400",
padding:20,
borderRadius:10,
width:"85%"
},

input:{
backgroundColor:"white",
borderRadius:6,
padding:8,
marginBottom:15
},

avatar:{
width:70,
height:70,
alignSelf:"center",
marginBottom:15
},

boton:{
backgroundColor:"black",
padding:10,
borderRadius:6,
alignItems:"center"
}

});