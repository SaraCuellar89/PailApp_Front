/**
 * Contexto sencillo para exponer recetas del usuario a las pantallas de perfil.
 * Hoy funciona como almacenamiento temporal en memoria.
 */
import React, { createContext, useContext, useState } from "react";

const RecetasContext = createContext<any>(null);

export const RecetasProvider = ({ children }: any) => {
const [recetas, setRecetas] = useState([
// Datos semilla para que las vistas de perfil tengan contenido inicial.
{
id: 1,
titulo: "Pasta con Pollo",
descripcion: "Lorem ipsum dolor sit amet",
imagen: "../assets/pasta.jpg",
tiempo: 30,
dificultad: "Fácil",
likes: 12,
comentarios: 3,
fecha: new Date(),
usuario: "usuario1"
}
]);

return (
<RecetasContext.Provider
value={{
recetas,
setRecetas
}}
>
{children}
</RecetasContext.Provider>
);
};

export const useRecetas = () => useContext(RecetasContext);
