/**
 * Renderiza la informacion extendida de una publicacion y administra el envio de comentarios.
 */

import React, { useState } from "react";
import { View,Text,ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform, } from "react-native";
import { useForo } from "../context/ForoContext";
import ComentarioItem from "./ComentarioItem";
import { styles } from "../Estilos/DetallesPublicacion";

export default function DetallesPublicacion({ route, onComentario }: any) {
  const { publicacion } = route.params;
  const { publicaciones, agregarComentario } = useForo();

  const publicacionActual = publicaciones.find(
    (p) => p.id === publicacion.id
  );

  const comentarios = publicacionActual?.listaComentarios || [];

  const [nuevoComentario, setNuevoComentario] = useState("");

  const enviarComentario = () => {
    if (!nuevoComentario.trim()) return;
    agregarComentario(publicacion.id, nuevoComentario);
    setNuevoComentario("");
    onComentario(); // 👈 esto dispara la notificación
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.titulo}>
            {publicacionActual?.titulo}
          </Text>

          <Text style={styles.descripcion}>
            {publicacionActual?.descripcion}
          </Text>

          <Text style={styles.fecha}>
            {publicacionActual?.fecha.toLocaleString()}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.subtitulo}>
            Comentarios ({comentarios.length})
          </Text>

          {comentarios.length === 0 ? (
            <Text style={styles.sinComentarios}>
              Aún no hay comentarios.
            </Text>
          ) : (
            comentarios.map((c) => (
            <ComentarioItem
            key={c.id}
            comentario={c}
            publicacionId={publicacionActual!.id}
            />
            ))
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe un comentario..."
            value={nuevoComentario}
            onChangeText={setNuevoComentario}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.boton}
            onPress={enviarComentario}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

