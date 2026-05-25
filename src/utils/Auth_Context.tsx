// ================= Automatizar el guardado y lectura de los datos del usuario en sesion =================

import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Usuario = any;

type AuthContextType = {
    usuario: Usuario | null;
    setUsuario: (user: Usuario | null) => void;
    cargando: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setLoading] = useState(true);

    const cargarUsuario = async () => {
        try {
            const info_usuario = await AsyncStorage.getItem("usuario");
            if (info_usuario) {
                setUsuario(JSON.parse(info_usuario));
            }
        } catch (err) {
            // Si AsyncStorage falla (storage corrupto o permisos), continuamos sin sesion
            console.warn("Error al leer usuario de AsyncStorage:", err);
        } finally {
            // Siempre desbloquear la pantalla de carga
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuario();
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, setUsuario, cargando }}>
            {children}
        </AuthContext.Provider>
    );
};
