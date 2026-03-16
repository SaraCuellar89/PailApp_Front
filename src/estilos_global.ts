import { StyleSheet } from 'react-native';

export const colores = {
  color_1: '#FFDB0C',
  color_2: '#FFF8D4',
  color_3: '#FFFFFF',
  color_4: '#000000',
};

const estilos_global = StyleSheet.create({
    fondo_1: {
        backgroundColor: colores.color_1,
    },

    fondo_2: {
        backgroundColor: colores.color_2,
    },

    caja_input: {
        width: '100%',
        backgroundColor: colores.color_3,
        borderRadius: 10,
        color: colores.color_4,
        borderColor: colores.color_4,
        borderWidth: 1,
    },

    btn_1: {
        width: '50%',
        backgroundColor: colores.color_4,
        padding: 10,
        borderRadius: 10,
    },
    texto_btn_1: {
        color: colores.color_3,
        fontSize: 16,
        textAlign: 'center'
    }
  
});

export default estilos_global;