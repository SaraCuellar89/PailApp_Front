import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useForo } from "../context/ForoContext";
import ModalConfirmacion from "../Componentes/ModalConfirmacion";
import PlatoGuardadoCard from "../Componentes/PlatoGuardadoCard";
import Notificacion from "../Componentes/Notificacion"; 
import Header from "../Componentes/Header";

export default function MisPlatoss({ navigation }: any) {
  const { publicaciones, toggleGuardar } = useForo();
  const guardados = publicaciones.filter(p => p.guardado);

  const [modalVisible, setModalVisible] = useState(false);
  const [platoSeleccionado, setPlatoSeleccionado] = useState<any>(null);
  const [mostrarNoti, setMostrarNoti] = useState(false); 

  const confirmarEliminar = () => {
    if (!platoSeleccionado) return;
    toggleGuardar(platoSeleccionado.id);
    setModalVisible(false);
    setMostrarNoti(true); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#EDE4C7" }}>

      {mostrarNoti && ( 
        <Notificacion
          mensaje="Plato eliminado"
          onFinish={() => setMostrarNoti(false)}
        />
      )}

      <Header title="Mis platos" onBack={() => navigation.goBack()} />

      <ScrollView>
        {guardados.map((plato) => (
          <PlatoGuardadoCard
            key={plato.id}
            plato={plato}
            onEliminar={(p: any) => {
              setPlatoSeleccionado(p);
              setModalVisible(true);
            }}
          />
        ))}
      </ScrollView>

      <ModalConfirmacion
        visible={modalVisible}
        onConfirm={confirmarEliminar}
        onCancel={() => setModalVisible(false)}
      />

    </View>
  );
}