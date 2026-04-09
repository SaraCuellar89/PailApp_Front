/**
 * Lista las publicaciones del foro ordenadas segun el filtro seleccionado.
 */

import React from "react";
import { ScrollView } from "react-native";
import { useForo } from "../context/ForoContext";
import PublicacionCard from "./PublicacionCard";

export default function ListaPublicaciones({ filtro, onGuardar, navigation }: any) {
  const { publicaciones } = useForo();

  const ordenadas = [...publicaciones].sort((a, b) =>
    filtro === "recientes"
      ? b.fecha.getTime() - a.fecha.getTime()
      : a.fecha.getTime() - b.fecha.getTime()
  );

  return (
    <ScrollView>
      {ordenadas.map((pub) => (
        <PublicacionCard
          key={pub.id}
          publicacion={pub}
          onGuardar={onGuardar}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}