import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import ModalConfirmacion from "../Componentes/ModalConfirmacion";
import Notificacion from "../Componentes/Notificacion"; 
import Header from "../Componentes/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../estilos_global";
import PublicacionCard from "../Componentes/PublicacionCard";
import estilos_publicaciones from "./css/publicaciones_css";
import Texto from "../Componentes/Texto";

export default function MisPlatoss({ navigation }: any) {


  // ================= Estados para ver la notificacion o el modal de confirmacion =================
  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarNoti, setMostrarNoti] = useState(false); 

  const [guardar_ejemplo, setGuardar_Ejemplo] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
        <Header 
          title="Mis Platos" 
          onBack={() => navigation.goBack()} 
        /> 
      </View>

      {/* Renderizado de notificacion */}
      {mostrarNoti && ( 
        <Notificacion
          mensaje="Plato eliminado"
          onFinish={() => setMostrarNoti(false)}
          icono={require('../Img/icono-correcto.png')}
        />
      )}

      <ScrollView
        style={{ flex: 1, backgroundColor: '#000000' }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >

        <View style={estilos_publicaciones.container}>
          <PublicacionCard
            guardar_ejemplo={guardar_ejemplo}
            setGuardar_Ejemplo={setModalVisible}
          />

          <TouchableOpacity style={estilos_publicaciones.btn_ingredientes} onPress={() => navigation.navigate('Lista_Ingredientes')}>
            <Texto>Lista de Ingredientes</Texto>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Renderizado de modal de confirmacion */}
      <ModalConfirmacion
        visible={modalVisible}
        confirmar={() => [setMostrarNoti(true), setModalVisible(false)]}
        cancelar={() => setModalVisible(false)}
      />

  
    </SafeAreaView>
  );
}