import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { VideoView, useVideoPlayer } from 'expo-video';
import estilos_robot from "../../Estilos/Chatbot/robot_css";
import Texto from "../Compartidos/Texto";

// ─── Constantes ───────────────────────────────────────────────
const VIDEO_TRANSFORMACION   = require('../../Animaciones/transformacion.mp4');
const DURACION_TRANSFORMACION = 2500;
const TIEMPO_VOLVER_DEFAULT   = 8000;
const DURACION_CROSSFADE      = 400;
const ROTACION_DEFAULT_MS     = 10000;

// ─── Videos por intencion ─────────────────────────────────────
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
    "hambre":     [require('../../Animaciones/animaciones chef/hablar_1.mp4')],
    "receta":     [
        require('../../Animaciones/animaciones chef/hablar_2.mp4'),
        require('../../Animaciones/animaciones chef/hablar_3.mp4'),
    ],
    "rapido":     [require('../../Animaciones/animaciones chef/hablar_4.mp4')],
    "saludable":  [require('../../Animaciones/animaciones chef/hablar_5.mp4')],
    "dulce":      [require('../../Animaciones/animaciones chef/hablar_1.mp4')],
    "salado":     [require('../../Animaciones/animaciones chef/hablar_2.mp4')],
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

const frases = [
    "¿Qué quieres cocinar hoy?",
    "¿Tienes hambre? ¡Te ayudo!",
    "¿Qué hay en tu nevera?",
    "¿Algo rico para hoy?",
    "¿Qué se te antoja?",
];

// ─── Componente ───────────────────────────────────────────────
const Robot = ({ cambiar_tamano, intencion }: any) => {

    const [frase, setFrase] = useState(frases[0]);

    const activo = useRef<0 | 1>(0);

    const opacidad_A = useRef(new Animated.Value(1)).current;
    const opacidad_B = useRef(new Animated.Value(0)).current;

    const playerA = useVideoPlayer(
        require('../../Animaciones/animaciones normal/esperar_1.mp4'),
        p => { p.loop = true; p.play(); }
    );
    const playerB = useVideoPlayer(
        require('../../Animaciones/animaciones normal/esperar_2.mp4'),
        p => { p.loop = true; }
    );

    const montado              = useRef(true);
    const en_transformacion    = useRef(false);
    const cambiar_tamano_prev  = useRef<boolean>(cambiar_tamano);
    const timeout_retorno      = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timeout_transf       = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalo_default    = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        montado.current = true;
        return () => {
            montado.current = false;
            if (timeout_retorno.current)   clearTimeout(timeout_retorno.current);
            if (timeout_transf.current)    clearTimeout(timeout_transf.current);
            if (intervalo_default.current) clearInterval(intervalo_default.current);
        };
    }, []);

    useEffect(() => {
        if (!cambiar_tamano) {
            setFrase(frases[Math.floor(Math.random() * frases.length)]);
        }
    }, [cambiar_tamano]);

    // ── Funcion principal: crossfade hacia un nuevo video ────────
    const reproducir = (video: any, loop = true) => {
        if (!montado.current) return;

        const siguiente: 0 | 1 = activo.current === 0 ? 1 : 0;
        const player_siguiente  = siguiente === 0 ? playerA : playerB;
        const opacidad_siguiente = siguiente === 0 ? opacidad_A : opacidad_B;
        const opacidad_saliente  = siguiente === 0 ? opacidad_B : opacidad_A;

        try {
            player_siguiente.replace(video);
            player_siguiente.loop = loop;
            player_siguiente.play();
        } catch (e) {}

        Animated.parallel([
            Animated.timing(opacidad_siguiente, {
                toValue: 1,
                duration: DURACION_CROSSFADE,
                useNativeDriver: true,
            }),
            Animated.timing(opacidad_saliente, {
                toValue: 0,
                duration: DURACION_CROSSFADE,
                useNativeDriver: true,
            }),
        ]).start(() => {
            try {
                const player_saliente = siguiente === 0 ? playerB : playerA;
                player_saliente.pause();
            } catch (e) {}
        });

        activo.current = siguiente;
    };

    // ── Rotacion de videos idle ──────────────────────────────────
    const iniciar_rotacion_default = () => {
        if (intervalo_default.current) clearInterval(intervalo_default.current);
        intervalo_default.current = setInterval(() => {
            if (!montado.current) return;
            reproducir(elegir_video_aleatorio(null), true);
        }, ROTACION_DEFAULT_MS);
    };

    // ── Transicion al enviar mensaje ─────────────────────────────
    useEffect(() => {
        const anterior = cambiar_tamano_prev.current;
        cambiar_tamano_prev.current = cambiar_tamano;

        if (!anterior && cambiar_tamano && !en_transformacion.current) {
            en_transformacion.current = true;

            if (timeout_retorno.current)   clearTimeout(timeout_retorno.current);
            if (intervalo_default.current) clearInterval(intervalo_default.current);
            if (timeout_transf.current)    clearTimeout(timeout_transf.current);

            reproducir(VIDEO_TRANSFORMACION, false);

            timeout_transf.current = setTimeout(() => {
                en_transformacion.current = false;
                if (!montado.current) return;
                const video = elegir_video_aleatorio(intencion ?? null);
                reproducir(video, true);
                if (!intencion) iniciar_rotacion_default();
            }, DURACION_TRANSFORMACION);
        }
    }, [cambiar_tamano]);

    // ── Cambio de intencion ──────────────────────────────────────
    useEffect(() => {
        if (!montado.current) return;
        if (en_transformacion.current) return;

        if (timeout_retorno.current)   clearTimeout(timeout_retorno.current);
        if (intervalo_default.current) clearInterval(intervalo_default.current);

        if (intencion) {
            reproducir(elegir_video_aleatorio(intencion), true);

            timeout_retorno.current = setTimeout(() => {
                if (!montado.current) return;
                reproducir(elegir_video_aleatorio(null), true);
                iniciar_rotacion_default();
            }, TIEMPO_VOLVER_DEFAULT);
        } else {
            iniciar_rotacion_default();
        }

        return () => {
            if (timeout_retorno.current)   clearTimeout(timeout_retorno.current);
            if (intervalo_default.current) clearInterval(intervalo_default.current);
        };
    }, [intencion]);

    // ── Render ───────────────────────────────────────────────────
    const estilo_robot = cambiar_tamano ? estilos_robot.robot_pequeno : estilos_robot.robot;
    const estilo_caja  = cambiar_tamano ? estilos_robot.caja_robot_pequeno : estilos_robot.caja_robot;

    return (
        <View>
            {!cambiar_tamano && (
                <View style={estilos_robot.caja_texto}>
                    <Texto style={estilos_robot.texto}>{frase}</Texto>
                </View>
            )}

            <View style={estilo_caja}>
                {/* Player A */}
                <Animated.View style={[estilos_robot.player_overlay, { opacity: opacidad_A }]}>
                    <VideoView player={playerA} nativeControls={false} style={estilo_robot} />
                </Animated.View>

                {/* Player B */}
                <Animated.View style={[estilos_robot.player_overlay, { opacity: opacidad_B }]}>
                    <VideoView player={playerB} nativeControls={false} style={estilo_robot} />
                </Animated.View>
            </View>
        </View>
    );
};

export default Robot;
