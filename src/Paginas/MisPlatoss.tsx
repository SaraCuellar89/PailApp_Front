import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useForo } from "../context/ForoContext";
import ModalConfirmacion from "../Componentes/ModalConfirmacion";
import Notificacion from "../Componentes/Notificacion"; 
import Header from "../Componentes/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import PublicacionCard from "../Componentes/PublicacionCard";
import estilos_publicaciones from "./css/publicaciones_css";

export default function MisPlatoss({ navigation }: any) {

  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarNoti, setMostrarNoti] = useState(false); 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={{ flex: 1, backgroundColor: "#EDE4C7" }}>

        {mostrarNoti && ( 
          <Notificacion
            mensaje="Plato eliminado"
            onFinish={() => setMostrarNoti(false)}
          />
        )}

        <View style={{backgroundColor: colores.color_2}}>
          <Header 
            title="Mis Platos" 
            onBack={() => navigation.goBack()} 
          /> 
        </View>

        <ScrollView
          style={{ flex: 1, backgroundColor: '#000000' }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >

          <View style={estilos_publicaciones.container}>
            <PublicacionCard/>
            <PublicacionCard/>
            <PublicacionCard/>
          </View>

        </ScrollView>

        <ModalConfirmacion
          visible={modalVisible}
          confirmar={null}
          cancelar={() => setModalVisible(false)}
        />

      </View>
    </SafeAreaView>
  );
}