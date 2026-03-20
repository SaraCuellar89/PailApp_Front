import React, { useState } from "react";
import { View,TextInput,TouchableOpacity, Image } from "react-native";
import { estilos_formu_subir_receta } from "./css/formu_subir_receta_css";
import Texto from "./Texto";
import estilos_global from "../estilos_global";

export default function FormSubirReceta({ navigation }: any) {

  const [ingredientes, setIngredientes] = useState([""]);
  
  const agregar_ingredientes = () => {
    setIngredientes([...ingredientes, ""]);
  };

  const actualizar_ingrediente = (texto: string, index: number) => {
    const nuevo = [...ingredientes];
    nuevo[index] = texto;
    setIngredientes(nuevo);
  };

  const eliminar_ingrediente = (index: number) => {
    const nuevo = [...ingredientes];  
    nuevo.splice(index, 1);           
    setIngredientes(nuevo);           
  };

  return (
    <View style={estilos_formu_subir_receta.contenedor}>

      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Titulo Plato</Texto>
        <TextInput 
          style={estilos_formu_subir_receta.input}
          placeholder="Ej: Arroz Paisa"
          placeholderTextColor={"grey"}
        />
      </View> 
      
      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Imagen</Texto>
        <TextInput 
          style={estilos_formu_subir_receta.input}
        />
      </View> 

      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Ingredientes</Texto>
        
        {ingredientes.map((ingrediente, index) => (
          <View style={estilos_formu_subir_receta.caja_ingredientes}>
            <TextInput
              key={index}
              style={estilos_formu_subir_receta.input_ingrediente}
              placeholder="Ej: 2 tazas de arroz"
              placeholderTextColor={"grey"}
              value={ingrediente}
              onChangeText={(texto) => actualizar_ingrediente(texto, index)}
            />

            <TouchableOpacity 
              onPress={() => eliminar_ingrediente(index)}
              disabled={index === 0} 
              style={{ opacity: index === 0 ? 0.3 : 1 }}
            >
              <Image
                source={require("../Img/icono-x.png")}
                style={estilos_formu_subir_receta.icono_mas}
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>
        ))}

        <TouchableOpacity onPress={agregar_ingredientes}>
          <Image
            source={require("../Img/icono-mas.png")}
            style={estilos_formu_subir_receta.icono_mas}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View> 

      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Tiempo aprox. de preparación</Texto>
        <TextInput 
          style={estilos_formu_subir_receta.input}
          placeholder="Ej: 90 (min)"
          placeholderTextColor={"grey"}
        />
      </View> 

      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Dificultad</Texto>
        <TextInput 
          style={estilos_formu_subir_receta.input}
          placeholder="Ej: Facil"
          placeholderTextColor={"grey"}
        />
      </View>

      <View style={estilos_formu_subir_receta.caja_boton}>
        <TouchableOpacity style={[estilos_global.btn_1, estilos_formu_subir_receta.boton]}>
          <Texto style={estilos_global.texto_btn_1}>Siguiente</Texto>
        </TouchableOpacity>
      </View>

    </View>
  );
}

