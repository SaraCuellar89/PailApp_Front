import React, { useState } from "react";
import { View,Text,Image,TouchableOpacity,TextInput, } from "react-native";
import { Comentario } from "../context/ForoContext";
import { useForo } from "../context/ForoContext";
import { styles } from "../Estilos/ComentarioItem";

interface Props {
  comentario: Comentario;
  publicacionId: number;
}

export default function ComentarioItem({
  comentario,
  publicacionId,
}: Props) {
  const { agregarComentario } = useForo();
  const [mostrarInput, setMostrarInput] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  const enviarRespuesta = () => {
    if (!respuesta.trim()) return;

    agregarComentario(publicacionId, respuesta, comentario.id);
    setRespuesta("");
    setMostrarInput(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={{ uri: comentario.usuario.foto }}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.nombre}>
              {comentario.usuario.nombre}
            </Text>
            <Text style={styles.fecha}>
              {new Date(comentario.fecha).toLocaleString()}
            </Text>
          </View>

          <Text style={styles.texto}>{comentario.texto}</Text>

          <View style={styles.actions}>
        

            <TouchableOpacity
              onPress={() => setMostrarInput(!mostrarInput)}
            >
              <Text style={styles.responder}>Responder</Text>
            </TouchableOpacity>
          </View>

          {mostrarInput && (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Escribe una respuesta..."
                value={respuesta}
                onChangeText={setRespuesta}
                style={styles.input}
              />
              <TouchableOpacity onPress={enviarRespuesta}>
                <Text style={styles.botoncitop}>
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {comentario.respuestas.map((resp) => (
            <View key={resp.id} style={styles.respuesta}>
              <ComentarioItem
                comentario={resp}
                publicacionId={publicacionId}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

