import React, { useState, useContext } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Formu_Descripcion_Pasos from "../Componentes/Formu_Descripcion_Pasos";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import ModalConfirmacion from "../Componentes/ModalConfirmacion";

type Props = NativeStackScreenProps<RootStackParamList, 'Descripcion'>;

const Descripcion = ({route, navigation}: Props) => {

    //Datos recibidos de la vista de subir_receta
    const {titulo, archivo, ingredientes, tiempo_preparacion, tipo_tiempo, dificultad, plato} = route.params;
    const es_edicion = !!plato;

    const [modal_visible, setModal_visible] = useState(false);
    const [tipo_modal, setTipo_modal] = useState<'eliminar' | 'guardar' | null>(null);

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        
            <View style={{backgroundColor: colores.color_2}}>
            <Header 
                title={es_edicion ? "Edita tu plato" : "¡Sube un plato!"} 
                onBack={() => navigation.goBack()} 
            /> 
            </View>
    
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
            
            <ScrollView
                style={{ flex: 1, backgroundColor: '#000000' }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >
    
            <View style={estilos_publicaciones.container}>
                
                <Formu_Descripcion_Pasos
                    datos_receta={{ titulo, archivo, ingredientes, tiempo_preparacion, tipo_tiempo, dificultad }}
                    navigation={navigation}
                    plato={plato}
                    Cancelar_Cambios={() => setModal_visible(true)}
                />

            </View>
    
            </ScrollView>
    
            </KeyboardAvoidingView>

            <ModalConfirmacion
                texto={"¿Quieres deshacer los cambios?"}
                visible={modal_visible}
                confirmar={() => {
                    navigation.pop(2);
                }}
                cancelar={() => setModal_visible(false)}
            />
    
        </SafeAreaView>
    )
}

export default Descripcion;