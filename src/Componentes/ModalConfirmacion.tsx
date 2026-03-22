import React from "react";
import { View, Text, TouchableOpacity,Modal } from "react-native";
import { estilos_modal_confirmacion } from "./css/modal_confirmacion_css";
import Texto from "./Texto";

export default function ModalConfirmacion({visible, confirmar, cancelar}: any) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={estilos_modal_confirmacion.overlay}>
        <View style={estilos_modal_confirmacion.box}>
          <Text style={estilos_modal_confirmacion.text}>
            ¿Quieres quitar este plato de tus guardados?
          </Text>

          <View style={estilos_modal_confirmacion.buttons}>
            <TouchableOpacity style={estilos_modal_confirmacion.btn} onPress={confirmar}>
              <Texto style={estilos_modal_confirmacion.btnText}>Si</Texto>
            </TouchableOpacity>

            <TouchableOpacity style={estilos_modal_confirmacion.btn} onPress={cancelar}>
              <Texto style={estilos_modal_confirmacion.btnText}>No</Texto>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}