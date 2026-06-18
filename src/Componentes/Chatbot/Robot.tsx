import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { VideoView, useVideoPlayer } from 'expo-video';
import estilos_robot from "../../Estilos/Chatbot/robot_css";
import Texto from "../Compartidos/Texto";
import { inferirTodasLasIntenciones } from "./utils/intenciones";

// ─── Constantes ───────────────────────────────────────────────
const VIDEO_TRANSFORMACION   = require('../../Animaciones/transformacion.mp4');
const DURACION_TRANSFORMACION = 2500;
const DURACION_CROSSFADE      = 400;
// Duración de cada clip en la cola (ms) antes de pasar al siguiente
const DURACION_CLIP_COLA      = 4000;
const ROTACION_DEFAULT_MS     = 9000;

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
    "victoria":   [
        require('../../Animaciones/animaciones chef/victoria_1.mp4'),
        require('../../Animaciones/animaciones chef/victoria_2.mp4'),
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

/** Construye una cola de clips sin repetir el mismo dos veces seguidas */
const construir_cola = (intenciones: string[]): any[] => {
    const cola: any[] = [];
    let ultimo: any = null;
    for (const intencion of intenciones) {
        const opciones = videos_por_intencion[intencion] ?? videos_por_intencion["default"];
        // elige uno distinto al anterior si es posible
        let candidato = opciones[Math.floor(Math.random() * opciones.length)];
        if (opciones.length > 1 && candidato === ultimo) {
            candidato = opciones.find(v => v !== ultimo) ?? candidato;
        }
        cola.push(candidato);
        ultimo = candidato;
    }
    return cola;
};

const frases = [
    "¿Qué quieres cocinar hoy?",
    "¿Tienes hambre? ¡Te ayudo!",
    "¿Qué hay en tu nevera?",
    "¿Algo rico para hoy?",
    "¿Qué se te antoja?",
];

// ─── Tipos ──────────────────────────────────────────────────
type RobotProps = {
    cambiar_tamano: boolean;
    intencion: string | null;
    respuesta?: string | null;  // ← texto completo de la respuesta del bot
};

// ─── Componente ───────────────────────────────────────────────
const Robot = ({ cambiar_tamano, intencion, respuesta }: RobotProps) => {

    const [frase, setFrase] = useState(frases[0]);

    const activo      = useRef<0 | 1>(0);
    const opacidad_A  = useRef(new Animated.Value(1)).current;
    const opacidad_B  = useRef(new Animated.Value(0)).current;

    const playerA = useVideoPlayer(
        require('../../Animaciones/animaciones normal/esperar_1.mp4'),
        p => { p.loop = true; p.play(); }
    );
    const playerB = useVideoPlayer(
        require('../../Animaciones/animaciones normal/esperar_2.mp4'),
        p => { p.loop = true; }
    );

    const montado             = useRef(true);
    const en_cola             = useRef(false);
    const en_transformacion   = useRef(false);
    const cambiar_tamano_prev = useRef<boolean>(cambiar_tamano);
    const timeout_cola        = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timeout_retorno     = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timeout_transf      = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalo_default   = useRef<ReturnType<typeof setInterval> | null>(null);

    const limpiar_timers = useCallback(() => {
        if (timeout_cola.current)      clearTimeout(timeout_cola.current);
        if (timeout_retorno.current)   clearTimeout(timeout_retorno.current);
        if (timeout_transf.current)    clearTimeout(timeout_transf.current);
        if (intervalo_default.current) clearInterval(intervalo_default.current);
    }, []);

    useEffect(() => {
        montado.current = true;
        return () => {
            montado.current = false;
            limpiar_timers();
        };
    }, [limpiar_timers]);

    useEffect(() => {
        if (!cambiar_tamano) {
            setFrase(frases[Math.floor(Math.random() * frases.length)]);
        }
    }, [cambiar_tamano]);

    // ── Crossfade al siguiente player ──────────────────────────────
    const reproducir = useCallback((video: any, loop = true) => {
        if (!montado.current) return;

        const siguiente: 0 | 1  = activo.current === 0 ? 1 : 0;
        const player_sig        = siguiente === 0 ? playerA : playerB;
        const opac_sig          = siguiente === 0 ? opacidad_A : opacidad_B;
        const opac_sal          = siguiente === 0 ? opacidad_B : opacidad_A;

        try {
            player_sig.replace(video);
            player_sig.loop = loop;
            player_sig.play();
        } catch (e) {}

        Animated.parallel([
            Animated.timing(opac_sig, { toValue: 1, duration: DURACION_CROSSFADE, useNativeDriver: true }),
            Animated.timing(opac_sal, { toValue: 0, duration: DURACION_CROSSFADE, useNativeDriver: true }),
        ]).start(() => {
            try { (siguiente === 0 ? playerB : playerA).pause(); } catch (e) {}
        });

        activo.current = siguiente;
    }, [playerA, playerB, opacidad_A, opacidad_B]);

    // ── Cola de animaciones: reproduce clips en secuencia ───────────────
    const reproducir_cola = useCallback((clips: any[]) => {
        if (!montado.current || clips.length === 0) return;

        limpiar_timers();
        en_cola.current = true;

        const avanzar = (index: number) => {
            if (!montado.current || index >= clips.length) {
                en_cola.current = false;
                iniciar_rotacion_default();
                return;
            }
            reproducir(clips[index], false);
            timeout_cola.current = setTimeout(() => avanzar(index + 1), DURACION_CLIP_COLA);
        };

        avanzar(0);
    }, [reproducir, limpiar_timers]);

    // ── Rotacion idle ──────────────────────────────────────────────
    const iniciar_rotacion_default = useCallback(() => {
        if (intervalo_default.current) clearInterval(intervalo_default.current);
        reproducir(elegir_video_aleatorio(null), true);
        intervalo_default.current = setInterval(() => {
            if (!montado.current || en_cola.current) return;
            reproducir(elegir_video_aleatorio(null), true);
        }, ROTACION_DEFAULT_MS);
    }, [reproducir]);

    // ── Cuando llega texto de respuesta del bot: armar cola dinámica ────
    useEffect(() => {
        if (!respuesta || en_transformacion.current) return;

        const intenciones = inferirTodasLasIntenciones(respuesta);
        const cola        = construir_cola(intenciones);
        reproducir_cola(cola);
    }, [respuesta]);

    // ── Transicion al enviar mensaje ─────────────────────────────
    useEffect(() => {
        const anterior = cambiar_tamano_prev.current;
        cambiar_tamano_prev.current = cambiar_tamano;

        if (!anterior && cambiar_tamano && !en_transformacion.current) {
            en_transformacion.current = true;
            limpiar_timers();
            en_cola.current = false;

            reproducir(VIDEO_TRANSFORMACION, false);

            timeout_transf.current = setTimeout(() => {
                en_transformacion.current = false;
                if (!montado.current) return;
                reproducir(elegir_video_aleatorio(intencion ?? null), true);
                if (!intencion) iniciar_rotacion_default();
            }, DURACION_TRANSFORMACION);
        }
    }, [cambiar_tamano]);

    // ── Cambio de intencion (fallback si no hay respuesta) ────────────
    useEffect(() => {
        if (!montado.current) return;
        if (en_transformacion.current || en_cola.current) return;

        limpiar_timers();

        if (intencion && intencion !== "default") {
            reproducir(elegir_video_aleatorio(intencion), true);
            timeout_retorno.current = setTimeout(() => {
                if (!montado.current) return;
                iniciar_rotacion_default();
            }, 8000);
        } else {
            iniciar_rotacion_default();
        }

        return () => { limpiar_timers(); };
    }, [intencion]);

    // ── Render ───────────────────────────────────────────────────
    const estilo_video = cambiar_tamano ? estilos_robot.robot_pequeno : estilos_robot.robot;
    const estilo_caja  = cambiar_tamano ? estilos_robot.caja_robot_pequeno : estilos_robot.caja_robot;

    return (
        <View>
            {!cambiar_tamano && (
                <View style={estilos_robot.caja_texto}>
                    <Texto style={estilos_robot.texto}>{frase}</Texto>
                </View>
            )}

            <View style={estilo_caja}>
                <Animated.View style={[estilos_robot.player_wrap, { opacity: opacidad_A, height: estilo_caja.height }]}>
                    <VideoView player={playerA} nativeControls={false} style={estilo_video} />
                </Animated.View>
                <Animated.View style={[estilos_robot.player_wrap, { opacity: opacidad_B, height: estilo_caja.height }]}>
                    <VideoView player={playerB} nativeControls={false} style={estilo_video} />
                </Animated.View>
            </View>
        </View>
    );
};

export default Robot;
