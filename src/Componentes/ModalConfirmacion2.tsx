/**
 * Modal reutilizable para confirmar la eliminacion de un plato del perfil del usuario.
 */

import React from "react";
import { View, Text, TouchableOpacity,Modal } from "react-native";
import { styles } from "../Estilos/ModalConfirmacion";

export default function ModalConfirmacion({
  visible,
  onConfirm,
  onCancel,
}: any) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.text}>
            ¿Seguro quieres eliminar este plato?
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btn} onPress={onConfirm}>
              <Text style={styles.btnText}>Si</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={onCancel}>
              <Text style={styles.btnText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}