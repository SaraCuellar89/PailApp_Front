import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Texto from "../Compartidos/Texto";
import { Mensaje_Toast } from "../../utils/Mensaje_Toast";
import { colores } from "../../Estilos/Global/estilos_global";
import estilos_global from "../../Estilos/Global/estilos_global";
import { estilos_formu_subir_receta } from "../../Estilos/Formularios/formu_subir_receta_css";
import { getAssistantRecipeDraft } from "./api/saveAssistantRecipe";

type AssistantRecipeSaveModalProps = {
  visible: boolean;
  content: string;
  /** URL de la imagen sugerida por Spoonacular (viene del chat) */
  sugeridaUrl?: string | null;
  saving: boolean;
  onCancel: () => void;
  onConfirm: (options: {
    titulo: string;
    archivo: ImagePicker.ImagePickerAsset | null;
    imagenSugeridaUrl: string | null;
  }) => void;
};

export default function AssistantRecipeSaveModal({
  visible,
  content,
  sugeridaUrl,
  saving,
  onCancel,
  onConfirm,
}: AssistantRecipeSaveModalProps) {
  const draft = useMemo(() => getAssistantRecipeDraft(content || ""), [content]);
  const [titulo, setTitulo] = useState("");
  // null = sin imagen elegida (se usa sugeridaUrl si existe)
  // ImagePickerAsset = el usuario eligió una propia
  const [imagen, setImagen] = useState<ImagePicker.ImagePickerAsset | null>(null);

  useEffect(() => {
    if (!visible) return;
    setTitulo(draft.titulo);
    setImagen(null); // reset: usar sugerida por defecto
  }, [draft.titulo, visible]);

  // Lo que se muestra en el preview: primero imagen del usuario, si no la sugerida
  const previewUri = imagen?.uri ?? sugeridaUrl ?? null;

  const seleccionarImagen = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      if (!canAskAgain) {
        Alert.alert(
          "Permiso requerido",
          "Activa el permiso de galeria en los ajustes de tu dispositivo.",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Ir a Ajustes", onPress: () => Linking.openSettings() },
          ],
        );
      } else {
        Mensaje_Toast.info("Se necesita permiso para acceder a la galeria");
      }
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled) setImagen(result.assets[0]);
  };

  const tomarFoto = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Mensaje_Toast.info("Se necesita permiso para acceder a la camara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled) setImagen(result.assets[0]);
  };

  const elegirFuente = () => {
    Alert.alert(
      "Imagen del plato",
      sugeridaUrl && !imagen
        ? "Tienes una imagen sugerida. \u00bfQuieres usar otra?"
        : "\u00bfDe dónde quieres subir la foto?",
      [
        { text: "Galeria", onPress: seleccionarImagen },
        { text: "Cámara", onPress: tomarFoto },
        ...(sugeridaUrl && imagen
          ? [{ text: "Usar sugerida", onPress: () => setImagen(null) }]
          : []),
        { text: "Cancelar", style: "cancel" },
      ],
    );
  };

  const guardar = () => {
    if (!titulo.trim()) {
      Mensaje_Toast.error("El titulo es obligatorio");
      return;
    }
    onConfirm({
      titulo,
      archivo: imagen,
      imagenSugeridaUrl: imagen ? null : (sugeridaUrl ?? null),
    });
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboard}>
          <View style={styles.box}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.content}
            >
              <Texto style={styles.title}>Guardar receta</Texto>

              <View style={estilos_formu_subir_receta.caja_input}>
                <Texto style={estilos_formu_subir_receta.label}>Titulo Plato</Texto>
                <TextInput
                  style={[estilos_formu_subir_receta.input, styles.input]}
                  placeholder="Ej: Arroz Paisa"
                  placeholderTextColor="grey"
                  value={titulo}
                  editable={!saving}
                  onChangeText={setTitulo}
                />
              </View>

              <View style={estilos_formu_subir_receta.caja_input}>
                <Texto style={estilos_formu_subir_receta.label}>
                  {previewUri ? "Imagen del plato (toca para cambiar)" : "Imagen"}
                </Texto>
                <TouchableOpacity
                  style={[estilos_formu_subir_receta.imagePicker, styles.imagePicker]}
                  onPress={elegirFuente}
                  disabled={saving}
                >
                  {previewUri ? (
                    <Image source={{ uri: previewUri }} style={estilos_formu_subir_receta.preview} />
                  ) : (
                    <Texto style={estilos_formu_subir_receta.imagePlaceholder}>
                      Toca para subir una foto
                    </Texto>
                  )}
                </TouchableOpacity>

                {sugeridaUrl && !imagen ? (
                  <Texto style={styles.sugeridaLabel}>Imagen sugerida automáticamente • Toca para cambiarla</Texto>
                ) : null}
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.secondaryButton, saving && styles.disabled]}
                  onPress={onCancel}
                  disabled={saving}
                >
                  <Texto style={styles.secondaryText}>Cancelar</Texto>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[estilos_global.btn_1, styles.primaryButton, saving && styles.disabled]}
                  onPress={guardar}
                  disabled={saving}
                >
                  <Texto style={estilos_global.texto_btn_1}>
                    {saving ? "Guardando..." : "Guardar"}
                  </Texto>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    padding: 18,
  },
  keyboard: { width: "100%" },
  box: {
    maxHeight: "88%",
    borderRadius: 10,
    backgroundColor: colores.color_2,
    borderWidth: 1,
    borderColor: colores.color_4,
    overflow: "hidden",
  },
  content: { padding: 18, gap: 18 },
  title: {
    fontFamily: "JetBrainsMono_700Bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: { paddingHorizontal: 10 },
  imagePicker: { height: 180 },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  primaryButton: { minWidth: 120 },
  secondaryButton: {
    minWidth: 120,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.color_4,
    backgroundColor: colores.color_3,
  },
  secondaryText: {
    color: colores.color_4,
    fontSize: 16,
    textAlign: "center",
  },
  disabled: { opacity: 0.55 },
  sugeridaLabel: {
    fontSize: 11,
    color: "grey",
    textAlign: "center",
    marginTop: 4,
  },
});
