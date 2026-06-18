import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { VideoView, useVideoPlayer } from 'expo-video';
import estilos_robot from "../../Estilos/Chatbot/robot_css";
import Texto from "../Compartidos/Texto";

const VIDEO_TRANSFORMACION = require('../../Animaciones/transformacion.mp4');
const DURACION_TRANSFORMACION = 2500; // ms que dura el video de transformacion

const frases = [
    "¿Qué quieres cocinar hoy?",
    "¿Tienes hambre? ¡Te ayudo!",
    "¿Qué hay en tu nevera?",
    "¿Algo rico para hoy?",
    "¿Qué se te antoja?",
];

const videos_por_intencion: Record<string, any[]> = {
    "feliz":      [
        require('../../Animaciones/animaciones chef/feliz_1.mp4'),
        require('../../Animaciones/animaciones chef/feliz_2.mp4'),
        require('../../Animaciones/animaciones chef/feliz_3.mp4'),
    ],
    "triste":     [
        require('../../Animaciones/animaciones chef/triste_1.mp4'),
        require('../../Animaciones/animaciones chef/triste_2.mp4'),
    ],
    "enojado":    [
        require('../../Animaciones/animaciones chef/enojado_1.mp4'),
        require('../../Animaciones/animaciones chef/enojado_2.mp4'),
    ],
    "hambre":     [
        require('../../Animaciones/animaciones chef/hablar_1.mp4'),
    ],
    "receta":     [
        require('../../Animaciones/animaciones chef/hablar_2.mp4'),
        require('../../Animaciones/animaciones chef/hablar_3.mp4'),
    ],
    "rapido":     [
        require('../../Animaciones/animaciones chef/hablar_4.mp4'),
    ],
    "saludable":  [
        require('../../Animaciones/animaciones chef/hablar_5.mp4'),
    ],
    "dulce":      [
        require('../../Animaciones/animaciones chef/hablar_1.mp4'),
    ],
    "salado":     [
        require('../../Animaciones/animaciones chef/hablar_2.mp4'),
    ],
    "hola":       [
        require('../../Animaciones/animaciones normal/saludar_1.mp4'),
        require('../../Animaciones/animaciones normal/saludar_2.mp4'),
    ],
    "gracias":    [
        require('../../Animaciones/animaciones chef/victoria_1.mp4'),
        require('../../Animaciones/animaciones chef/victoria_2.mp4'),
        require('../../Animaciones/animaciones chef/victoria_3.mp4'),
    ],
    "default":    [
        require('../../Animaciones/animaciones normal/esperar_1.mp4'),
        require('../../Animaciones/animaciones normal/esperar_2.mp4'),
        require('../../Animaciones/animaciones normal/esperar_3.mp4'),
        require('../../Animaciones/animaciones normal/esperar_4.mp4'),
        require('../../Animaciones/animaciones normal/esperar_5.mp4'),
    ],
};

const elegir_video_aleatorio = (intencion: string | null) => {
    const opciones = videos_por_intencion[intencion ?? "default"] ?? videos_por_intencion["default"];
    return opciones[Math.floor(Math.random() * opciones.length)];
};

const Robot = ({ cambiar_tamano, intencion }: any) => {

    const [frase, setFrase] = useState(frases[0]);
    const cambiar_tamano_prev = useRef<boolean>(cambiar_tamano);
    const en_transformacion = useRef(false);

    const montado = useRef(true);
    const timeout_retorno = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timeout_transformacion = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalo_default = useRef<ReturnType<typeof setInterval> | null>(null);

    const player = useVideoPlayer(require('../../Animaciones/animaciones normal/esperar_1.mp4'), p => {
        p.loop = true;
        p.play();
    });

    useEffect(() => {
        montado.current = true;
        return () => { montado.current = false; };
    }, []);

    useEffect(() => {
        if (!cambiar_tamano) {
            setFrase(frases[Math.floor(Math.random() * frases.length)]);
        }
    }, [cambiar_tamano]);

    // Detectar cuando cambia_tamano pasa de false → true para reproducir transformacion
    useEffect(() => {
        const anterior = cambiar_tamano_prev.current;
        cambiar_tamano_prev.current = cambiar_tamano;

        // Solo disparar transformacion cuando pasa de modo normal → modo chat (false → true)
        if (!anterior && cambiar_tamano && !en_transformacion.current) {
            en_transformacion.current = true;

            if (timeout_retorno.current) clearTimeout(timeout_retorno.current);
            if (intervalo_default.current) clearInterval(intervalo_default.current);
            if (timeout_transformacion.current) clearTimeout(timeout_transformacion.current);

            try {
                player.replace(VIDEO_TRANSFORMACION);
                player.loop = false;
                player.play();
            } catch (e) {}

            // Despues de la duracion de la transformacion, volver al flujo normal
            timeout_transformacion.current = setTimeout(() => {
                en_transformacion.current = false;
                if (!montado.current) return;
                // Si hay intencion activa la aplica, si no vuelve a default
                try {
                    const video = intencion
                        ? elegir_video_aleatorio(intencion)
                        : elegir_video_aleatorio(null);
                    player.replace(video);
                    player.loop = true;
                    player.play();
                } catch (e) {}

                if (!intencion) iniciar_rotacion_default();
            }, DURACION_TRANSFORMACION);
        }
    }, [cambiar_tamano]);

    const TIEMPO_VOLVER_DEFAULT = 8000;

    useEffect(() => {
        if (!montado.current) return;
        // Si estamos en medio de la transformacion, no interrumpir
        if (en_transformacion.current) return;

        if (timeout_retorno.current) clearTimeout(timeout_retorno.current);
        if (intervalo_default.current) clearInterval(intervalo_default.current);

        if (intencion) {
            try {
                player.replace(elegir_video_aleatorio(intencion));
                player.loop = true;
                player.play();
            } catch (e) {}

            timeout_retorno.current = setTimeout(() => {
                if (!montado.current) return;
                try {
                    player.replace(elegir_video_aleatorio(null));
                    player.loop = true;
                    player.play();
                } catch (e) {}
                iniciar_rotacion_default();
            }, TIEMPO_VOLVER_DEFAULT);

        } else {
            iniciar_rotacion_default();
        }

        return () => {
            if (timeout_retorno.current) clearTimeout(timeout_retorno.current);
            if (intervalo_default.current) clearInterval(intervalo_default.current);
        };
    }, [intencion]);

    const iniciar_rotacion_default = () => {
        if (intervalo_default.current) clearInterval(intervalo_default.current);
        intervalo_default.current = setInterval(() => {
            if (!montado.current) return;
            try {
                player.replace(elegir_video_aleatorio(null));
                player.play();
            } catch (e) {}
        }, 10000);
    };

    return (
        <View>
            {cambiar_tamano === true ?
            (null) :
            (
                <View style={estilos_robot.caja_texto}>
                    <Texto style={estilos_robot.texto}>{frase}</Texto>
                </View>
            )}

            <View style={cambiar_tamano === true ? estilos_robot.caja_robot_pequeno : estilos_robot.caja_robot}>
                <VideoView
                    player={player}
                    nativeControls={false}
                    style={cambiar_tamano ? estilos_robot.robot_pequeno : estilos_robot.robot}
                />
            </View>
        </View>
    );
};

export default Robot;
