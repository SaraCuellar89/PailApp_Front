import React, { createContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Usuario = Record<string, any> | null

type AuthContextType = {
  usuario: Usuario
  setUsuario: (user: Usuario) => void
  cargando: boolean
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

type Props = { children: ReactNode }

export const AuthProvider = ({ children }: Props) => {
  const [usuario, setUsuarioState] = useState<Usuario>(null)
  const [cargando, setCargando] = useState(true)

  const cargarUsuario = async () => {
    try {
      const info = await AsyncStorage.getItem('usuario')
      if (info) setUsuarioState(JSON.parse(info))
    } catch (_) {}
    setCargando(false)
  }

  const setUsuario = async (user: Usuario) => {
    setUsuarioState(user)
    if (user) {
      await AsyncStorage.setItem('usuario', JSON.stringify(user))
    } else {
      await AsyncStorage.removeItem('usuario')
    }
  }

  const logout = async () => {
    setUsuarioState(null)
    await AsyncStorage.removeItem('usuario')
  }

  useEffect(() => { cargarUsuario() }, [])

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, cargando, logout }}>
      {children}
    </AuthContext.Provider>
  )
}