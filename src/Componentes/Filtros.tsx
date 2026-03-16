import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../Estilos/Filtros";

export default function Filtros({ filtro, setFiltro }: any) {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={[
          styles.boton,
          filtro === "recientes" && styles.botonActivo,
        ]}
        onPress={() => setFiltro("recientes")}
      >
        <Text
          style={[
            styles.texto,
            filtro === "recientes" && styles.textoActivo,
          ]}
        >
          Recientes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.boton,
          filtro === "antiguas" && styles.botonActivo,
        ]}
        onPress={() => setFiltro("antiguas")}
      >
        <Text
          style={[
            styles.texto,
            filtro === "antiguas" && styles.textoActivo,
          ]}
        >
          Antiguas
        </Text>
      </TouchableOpacity>

    </View>
  );
}

