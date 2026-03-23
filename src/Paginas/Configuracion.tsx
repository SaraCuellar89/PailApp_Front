import { ScrollView, View } from "react-native";
import ConfiguracionOpciones from "../Componentes/ConfiguracionOpciones";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";

export default function Configuracion({navigation}: any) {

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
          <ConfiguracionOpciones />
        </View>

      </ScrollView>

    </SafeAreaView>
  );

}