/**
 * Lista visual de opciones de configuracion y accesos a acciones del perfil.
 */

import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Estilos/ConfiguracionOpciones";
import { useNavigation } from "@react-navigation/native";

export default function ConfiguracionOpciones() {

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.titulo}>Tema</Text>

        <TouchableOpacity style={styles.botonTema}>
          <Text>Día</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.card}>
        <Text style={styles.titulo}>Editar Perfil</Text>
        <Text style={styles.descripcion}>
          Puedes editar toda la información de tu cuenta
        </Text>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate("EditarPerfil")}
        >
          <Text>Editar</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.card}>
        <Text style={styles.titulo}>Cerrar Sesión</Text>
        <Text style={styles.descripcion}>
          Recuerda que siempre puedes volver
        </Text>

        <TouchableOpacity style={styles.boton}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.card}>
        <Text style={styles.titulo}>Eliminar Cuenta</Text>
        <Text style={styles.descripcion}>
          Esta acción es permanente e irreversible
        </Text>

        <TouchableOpacity style={styles.botonEliminar}>
          <Text style={{color:"white"}}>Eliminar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}