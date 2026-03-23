import React, { useState } from "react";
import { View,TextInput,TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import DropDownPicker from 'react-native-dropdown-picker';
import { estilos_formu_subir_receta } from "./css/formu_subir_receta_css";
import Texto from "./Texto";
import estilos_global from "../estilos_global";

export default function FormSubirReceta({ navigation }: any) {


    // ================= Estados y Funciones para subir imagenes desde el dispositivo =================
    const [imagen, setImagen] = useState<ImagePicker.ImagePickerAsset | null>(null);

    // =================== Abrir la Galería ===================
    const seleccionarImagen = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        });
        if (!result.canceled) setImagen(result.assets[0]);
    };

    // =================== Abrir la camara ===================
    const tomarFoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') return Mensaje_Toast.exito('¡Receta subida!');
        const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8 });
        if (!result.canceled) setImagen(result.assets[0]);
    };

    // =================== Elegir opciones para la imagen (Galeria, Camara o Cancelar) ===================
    const elegirFuente = () => {
        Alert.alert("Agregar imagen", "¿De dónde quieres subir la foto?", [
        { text: "Galería", onPress: seleccionarImagen },
        { text: "Cámara",  onPress: tomarFoto },
        { text: "Cancelar", style: "cancel" },
        ]);
    };


  // ================= Estados y funciones para agregar o eliminar ingredientes =================
  const [ingredientes, setIngredientes] = useState([""]);
  
  // Crear un nuevo input para escribir un ingrediente
  const agregar_ingredientes = () => {
    setIngredientes([...ingredientes, ""]);
  };

  // Poder reescribir en un ingrediente
  const actualizar_ingrediente = (texto: string, index: number) => {
    const nuevo = [...ingredientes];
    nuevo[index] = texto;
    setIngredientes(nuevo);
  };

  // Eliminar ingrediente de las lista
  const eliminar_ingrediente = (index: number) => {
    const nuevo = [...ingredientes];  
    nuevo.splice(index, 1);           
    setIngredientes(nuevo);           
  };


  // ================= Estados para el dropdown de tiempo =================
  const [abrir_tipo_tiempo, setAbrir_tipo_tiempo] = useState(false);
  const [tipo_tiempo_value, setTipo_tiempo_value] = useState(null);

  const [tipo_tiempo, setTipo_tiempo] = useState([
    { label: 'hr', value: 'hr' },
    { label: 'min', value: 'min' }
  ]);


  // ================= Estador para el dropdown de dificultad =================
  const [abrir_dificultad, setAbrir_dificultad] = useState(false);
  const [dificultad_value, setDificultad_value] = useState(null);

  const [dificultad, setDificultad] = useState([
    { label: 'Fácil', value: 'facil' },
    { label: 'Media', value: 'media' },
    { label: 'Difícil', value: 'dificil' }
  ]);
  

  return (
    <View style={estilos_formu_subir_receta.contenedor}>

      {/* --- Input de titulo plato --- */}
      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Titulo Plato</Texto>
        <TextInput 
          style={estilos_formu_subir_receta.input}
          placeholder="Ej: Arroz Paisa"
          placeholderTextColor={"grey"}
        />
      </View> 
      
      {/* --- Subir imagen desde el dispositivo --- */}
      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Imagen</Texto>
        <TouchableOpacity style={estilos_formu_subir_receta.imagePicker} onPress={elegirFuente}>
          {imagen ? (
            <Image source={{ uri: imagen.uri }} style={estilos_formu_subir_receta.preview} />
          ) : (
            <Texto style={estilos_formu_subir_receta.imagePlaceholder}>Toca para subir una foto</Texto>
          )}
        </TouchableOpacity>
      </View> 

      {/* --- Seccion de ingredientes --- */}
      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Ingredientes</Texto>
        
        {ingredientes.map((ingrediente, index) => (
          <View key={index} style={estilos_formu_subir_receta.caja_ingredientes}>
            <TextInput
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
      
      {/* --- Seccion de tiempo de preparacion --- */}
      <View style={[estilos_formu_subir_receta.caja_input, { zIndex: 2 }]}>
        <Texto style={estilos_formu_subir_receta.label}>Tiempo aprox. de preparación</Texto>
        <View style={estilos_formu_subir_receta.caja_tiempo}>
          <TextInput 
            style={estilos_formu_subir_receta.input_ingrediente}
            placeholder="Ej: 90"
            placeholderTextColor={"grey"}
          />
          <DropDownPicker
            containerStyle={{ width: 100 }}
            style={{ 
              ...estilos_formu_subir_receta.input_tipo_tiempo, 
              minHeight: 45,
              height: 45,
            }}
            dropDownContainerStyle={{ width: 100 }}
            open={abrir_tipo_tiempo}
            value={tipo_tiempo_value}
            items={tipo_tiempo}
            setOpen={setAbrir_tipo_tiempo}
            setValue={setTipo_tiempo_value}
            setItems={setTipo_tiempo}
            placeholder="Ej: min"
            placeholderStyle={{ color: 'grey' }}
            listMode="SCROLLVIEW"
          />
        </View>
      </View> 

      {/* --- Input de dificultad --- */}
      <View style={[estilos_formu_subir_receta.caja_input, { zIndex: 1 }]}>
        <Texto style={estilos_formu_subir_receta.label}>Dificultad</Texto>
         <DropDownPicker
          open={abrir_dificultad}
          value={dificultad_value}
          items={dificultad}
          setOpen={setAbrir_dificultad}
          setValue={setDificultad_value}
          setItems={setDificultad}
          placeholder="Ej: Media"
          placeholderStyle={{ color: 'grey' }}
          listMode="SCROLLVIEW"
        />
      </View>

      {/* --- Boton para continuar con la descripcion --- */}
      <View style={estilos_formu_subir_receta.caja_boton}>
        <TouchableOpacity style={[estilos_global.btn_1, estilos_formu_subir_receta.boton]} onPress={navigation}>
          <Texto style={estilos_global.texto_btn_1}>Siguiente</Texto>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    height: 190,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    fontSize: 15,
    color: "#9ca3af",
  },
});

