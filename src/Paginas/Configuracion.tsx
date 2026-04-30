import { useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import ConfiguracionOpciones from "../Componentes/ConfiguracionOpciones";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import ModalConfirmacion from "../Componentes/ModalConfirmacion";

export default function Configuracion({navigation}: any) {

  // ================= Datos del usuario por un contexto difinido =================
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext no está disponible");
  const { setUsuario } = authContext;

  // ================= Estados para ver la notificacion o el modal de confirmacion =================
  const [modal_Visible, setModal_Visible] = useState(false);

  // ================= Funciones y estados para cerrar sesion =================
  const Cerrar_Sesion = async () => {
    try {    
        await AsyncStorage.removeItem("usuario");
        
        setUsuario(null); // limpia el contexto

        navigation.navigate("Inicio", { cerro_sesion: true });
    } catch (error) {
        console.log("Error:", error);
        Mensaje_Toast.error("No se pudo cerrar sesión");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

      <View style={{backgroundColor: colores.color_2}}>
          <Header 
          title="Configuración" 
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
          <ConfiguracionOpciones 
            Cerrar_Sesion={() => setModal_Visible(true)}
          />
        </View>

      </ScrollView>

      {/* Renderizado de modal de confirmacion */}
      <ModalConfirmacion
        texto={"¿Quieres salir de tu cuenta?"}
        visible={modal_Visible}
        confirmar={() => [setModal_Visible(false), Cerrar_Sesion()]}
        cancelar={() => [setModal_Visible(false)]}
      />

    </SafeAreaView>
  );

}