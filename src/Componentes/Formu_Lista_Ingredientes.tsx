import React, { useState, useRef } from "react";
import { TouchableOpacity, Pressable, View, TextInput } from "react-native";
import Texto from "./Texto";
import estilos_formu_lista_ingredientes from "./css/formu_lista_ingredientes";
import estilos_global from "../estilos_global";

type Item = { texto: string; marcado: boolean };

const Formu_Lista_Ingredientes = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [lineaActiva, setLineaActiva] = useState("");
    const [editandoIndex, setEditandoIndex] = useState<number | null>(null);
    const inputRef = useRef<TextInput>(null);
    const inputsRef = useRef<(TextInput | null)[]>([]);

    // Funcion para que al dar enter, el item (ingrediente) se vuelva un checklist
    const handleChange = (text: string) => {
        if (text.includes("\n")) {
            const partes = text.split("\n");
            const confirmada = partes[0].trim();

            if (confirmada !== "") {
                setItems(prev => [...prev, { texto: confirmada, marcado: false }]);
            }

            setLineaActiva(partes.slice(1).join("\n"));
        } else {
            setLineaActiva(text);
        }
    };

    // Funcion para borrar unicamente con el teclado los ingredientes
    const handleKeyPress = ({ nativeEvent }: { nativeEvent: { key: string } }) => {
        if (nativeEvent.key === "Backspace" && lineaActiva === "" && items.length > 0) {
            const ultimoItem = items[items.length - 1];
            setItems(prev => prev.slice(0, -1));
            setLineaActiva(ultimoItem.texto);
        }
    };

    // Funcion para editar un item confirmado: actualiza su texto en tiempo real
    const handleChangeItem = (text: string, index: number) => {
        // Si se presiona Enter, se termina la edición
        if (text.includes("\n")) {
            setEditandoIndex(null);
            return;
        }
        setItems(prev =>
            prev.map((item, i) => i === index ? { ...item, texto: text } : item)
        );
    };

    // Funcion para borrar checklist si el item (ingrediente) que se estaba eliminando no tiene nada escrito
    const handleBlurItem = (index: number) => {
        setEditandoIndex(null);
        setItems(prev => prev.filter((item, i) => i !== index || item.texto.trim() !== ""));
    };

    // Funcion para marcar o desmarcar un item (ingrediente)
    const Toggle_Marcar = (index: number) => {
        setItems(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, marcado: !item.marcado } : item
            )
        );
    };

    return (
        <View style={estilos_formu_lista_ingredientes.contenedor}>

            <Pressable
                style={estilos_formu_lista_ingredientes.caja_contenedor}
                onPress={() => inputRef.current?.focus()}
            >
                

                    {/* Renderizado de ingredientes ya creados: es el nuevo estado que adquiere un item cuando se da enter */}
                    {items.map((item, i) => (
                        <View key={i} style={estilos_formu_lista_ingredientes.caja_ingrediente}>
                            <TouchableOpacity
                                style={item.marcado
                                    ? estilos_formu_lista_ingredientes.btn_check
                                    : estilos_formu_lista_ingredientes.btn_no_check}
                                onPress={() => Toggle_Marcar(i)}
                            >
                                <Texto style={estilos_formu_lista_ingredientes.btn_check_icono}>
                                    {item.marcado ? "✓" : ""}
                                </Texto>
                            </TouchableOpacity>

                            {/* ← Editar ingrediente */}
                            {editandoIndex === i ? (
                                <TextInput
                                    ref={el => { inputsRef.current[i] = el; }}
                                    value={item.texto}
                                    onChangeText={text => handleChangeItem(text, i)}
                                    onBlur={() => handleBlurItem(i)}
                                    autoFocus
                                    style={{
                                        flex: 1,
                                        fontSize: 16,
                                        color: "#000",
                                        paddingVertical: 0,
                                    }}
                                />
                            ) : (
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => {setEditandoIndex(i);}}
                                >
                                    <Texto style={item.marcado
                                        ? estilos_formu_lista_ingredientes.texto_check
                                        : undefined}
                                    >
                                        {item.texto}
                                    </Texto>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}

                    {/* Input para poder escribir */}
                    <View style={estilos_formu_lista_ingredientes.caja_ingrediente}>
                        <View style={estilos_formu_lista_ingredientes.btn_no_check} />
                        <TextInput
                            ref={inputRef}
                            value={lineaActiva}
                            onChangeText={handleChange}
                            onKeyPress={handleKeyPress}
                            multiline
                            placeholder="Escribe un ingrediente..."
                            placeholderTextColor={'grey'}
                            style={{ flex: 1 }} 
                        />
                    </View>
            
            </Pressable>

            <View style={estilos_formu_lista_ingredientes.caja_btn_guardar}>
                <TouchableOpacity style={estilos_global.btn_1}>
                    <Texto style={estilos_global.texto_btn_1}>Guardar</Texto>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Formu_Lista_Ingredientes;