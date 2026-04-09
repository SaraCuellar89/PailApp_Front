/**
 * Contexto global del foro.
 * Mantiene las publicaciones en memoria y expone acciones para crear recetas,
 * guardar platos, dar like y agregar comentarios o respuestas anidadas.
 */
import React, { createContext, useContext, useState } from "react";

export interface Usuario {
  id: string;
  nombre: string;
  foto: string;
}

export interface Comentario {
  id: string;
  usuario: Usuario;
  texto: string;
  fecha: Date;
  likes: number;
  respuestas: Comentario[];
}

export interface Publicacion {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: any;
  ingredientes: string;
  tiempo: string;
  dificultad: string;
  fecha: Date;
  likes: number;
  comentarios: number;
  likedByUserr: boolean;
  listaComentarios: Comentario[];
  guardado: boolean;
}

interface ForoContextProps {
  publicaciones: Publicacion[];
  agregarPublicacion: (
    data: Omit<
      Publicacion,
      "id" | "fecha" | "likes" | "comentarios" | "guardado" | "listaComentarios" | "likedByUserr"
    >
  ) => void;
  toggleGuardar: (id: number) => void;
  agregarComentario: (id: number, texto: string, parentId?: string) => void; 
  toggleLikePublicacion: (id:number) => void;
}

const ForoContext = createContext<ForoContextProps | undefined>(undefined);

export const ForoProvider = ({ children }: any) => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

  const agregarPublicacion = (data: any) => {
    // Cada publicacion se completa aqui con metadatos que la UI espera.
    const nueva: Publicacion = {
      id: Date.now(),
      fecha: new Date(),
      likes: 0,
      likedByUserr: false,
      comentarios: 0,
      listaComentarios: [], 
      guardado: false,
      ...data,
    };

    setPublicaciones((prev) => [nueva, ...prev]);
  };

  const toggleGuardar = (id: number) => {
    // Alterna si una receta aparece o no dentro de "Mis platos".
    setPublicaciones((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, guardado: !p.guardado } : p
      )
    );
  };

const toggleLikePublicacion = (id: number) => {
  setPublicaciones((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;

      const yaDioLike = p.likedByUserr;

      return {
        ...p,
        // El contador se recalcula segun el estado anterior del like del usuario.
        likedByUserr: !yaDioLike,
        likes: yaDioLike ? p.likes - 1 : p.likes + 1,
      };
    })
  );
};

const agregarComentario = (
  publicacionId: number,
  texto: string,
  parentId?: string
) => {
  // Usuario temporal mientras aun no exista autenticacion real enlazada al foro.
  const usuarioMock: Usuario = {
    id: "1",
    nombre: "usuario",
    foto: "https://static.wikia.nocookie.net/fallout/images/e/e4/Dogmeat.jpg/revision/latest/scale-to-width-down/250?cb=20110216164620&path-prefix=es",
  };

  setPublicaciones((prev) =>
    prev.map((pub) => {
      if (pub.id !== publicacionId) return pub;

      const nuevoComentario: Comentario = {
        id: Date.now().toString(),
        usuario: usuarioMock,
        texto,
        fecha: new Date(),
        likes: 0,
        respuestas: [],
      };

      if (!parentId) {
        // Si no hay comentario padre, se agrega al nivel principal del hilo.
        return {
          ...pub,
          listaComentarios: [...pub.listaComentarios, nuevoComentario],
          comentarios: pub.comentarios + 1,
        };
      }

      const agregarRespuesta = (comentarios: Comentario[]): Comentario[] =>
        comentarios.map((c) => {
          if (c.id === parentId) {
            return {
              ...c,
              // Las respuestas se guardan dentro del comentario padre correspondiente.
              respuestas: [...c.respuestas, nuevoComentario],
            };
          }
          return {
            ...c,
            respuestas: agregarRespuesta(c.respuestas),
          };
        });

      return {
        ...pub,
        listaComentarios: agregarRespuesta(pub.listaComentarios),
        comentarios: pub.comentarios + 1,
      };
    })
  );
};

  return (
    <ForoContext.Provider
      value={{ publicaciones, agregarPublicacion, toggleGuardar, agregarComentario, toggleLikePublicacion }}
    >
      {children}
    </ForoContext.Provider>
  );
};

export const useForo = () => {
  const context = useContext(ForoContext);
  if (!context)
    throw new Error("useForo debe usarse dentro de ForoProvider");
  return context;
};
