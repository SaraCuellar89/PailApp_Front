import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "../Estilos/Boton.estilo";

interface Props {
    title: string;
    onPress?: () => void;
}

export default function Boton({ title,onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
