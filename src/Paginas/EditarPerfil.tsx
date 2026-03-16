import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import styles from "../Estilos/EditarPerfil";

export default function EditarPerfil(){

return(

<View style={styles.container}>

<View style={styles.card}>

<Text>Nombre de Usuario</Text>
<TextInput style={styles.input} />

<Text>Avatar</Text>

<Image
source={{uri:"https://cdn-icons-png.flaticon.com/512/616/616408.png"}}
style={styles.avatar}
/>

<Text>Correo electrónico</Text>
<TextInput style={styles.input} />

<Text>Contraseña</Text>
<TextInput style={styles.input} secureTextEntry/>

<TouchableOpacity style={styles.boton}>
<Text style={{color:"white"}}>Editar</Text>
</TouchableOpacity>

</View>

</View>

);

}