import Toast from 'react-native-toast-message';

export const Mensaje_Toast = {
    exito: (mensaje: string) => Toast.show({ type: 'success', text1: mensaje }),
    error: (mensaje: string) => Toast.show({ type: 'error', text1: mensaje }),
    info: (mensaje: string) => Toast.show({ type: 'info', text1: mensaje }),
};