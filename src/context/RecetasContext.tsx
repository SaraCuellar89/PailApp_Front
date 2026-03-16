import React, { createContext, useContext, useState } from "react";

const RecetasContext = createContext<any>(null);

export const RecetasProvider = ({ children }: any) => {

const [recetas, setRecetas] = useState([
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