import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    PanResponder,
    View,
    Dimensions,
} from "react-native";
import { VideoView, useVideoPlayer } from 'expo-video';
import estilos_robot from "../../Estilos/Chatbot/robot_css";
import Texto from "../Compartidos/Texto";

const { width: ANCHO, height: ALTO } = Dimensions.get('window');

// ─── Tamaños del robot para calcular límites ───────────────────────────────
const ROBOT_GRANDE_W  = ANCHO * 0.65;
const ROBOT_GRANDE_H  = ALTO  * 0.38;
const ROBOT_PEQUENO_W = ANCHO * 0.3;
const ROBOT_PEQUENO_H = ALTO  * 0.18;

// ─── Posición inicial centrada ─────────────────────────────────────────────
const POS_INICIAL_X = (ANCHO - ROBOT_GRANDE_W) / 2;
const POS_INICIAL_Y = (ALTO  - ROBOT_GRANDE_H) / 2 - 40;

// ─── Constantes de animación ───────────────────────────────────────────────
const VIDEO_TRANSFORMACION    = require('../../Animaciones/transformacion.mp4');
const DURACION_TRANSFORMACION = 2500;
const TIEMPO_VOLVER_DEFAULT   = 8000;
const DURACION_CROSSFADE      = 400;
const ROTACION_DEFAULT_MS     = 10000;

// Rebote al soltar: el robot vuelve suavemente a donde lo dejaste
const REBOTE_FRICCION  = 0.35;  // velocidad que mantiene al soltar (0=para, 1=libre)
const REBOTE_PASOS     = 8;     // frames del rebote
const REBOTE_DELAY     = 16;    // ms entre frames

// ─── Videos ────────────────────────────────────────────────────────────────
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

// ─── Componente ────────────────────────────────────────────────────────────
const Robot = ({ cambiar_tamano, intencion }: any) => {

    const [frase, setFrase] = useState(frases[0]);

    // Posición del robot (drag)
    const posicion = useRef(new Animated.ValueXY({ x: POS_INICIAL_X, y: POS_INICIAL_Y })).current;
    const pos_actual = useRef({ x: POS_INICIAL_X, y: POS_INICIAL_Y });
    const velocidad  = useRef({ x: 0, y: 0 });
    const ultimo_pos = useRef({ x: POS_INICIAL_X, y: POS_INICIAL_Y });

    // Actualizar pos_actual cuando cambia la Animated.Value
    useEffect(() => {
        const id = posicion.addListener((v) => { pos_actual.current = v; });
        return () => posicion.removeListener(id);
    }, []);

    // PanResponder para drag
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder:  () => true,

            onPanResponderGrant: () => {
                posicion.stopAnimation();
                posicion.setOffset(pos_actual.current);
                posicion.setValue({ x: 0, y: 0 });
                velocidad.current = { x: 0, y: 0 };
            },

            onPanResponderMove: (_, g) => {
                velocidad.current = { x: g.vx * 10, y: g.vy * 10 };
                posicion.setValue({ x: g.dx, y: g.dy });
            },

            onPanResponderRelease: (_, g) => {
                posicion.flattenOffset();

                const robot_w = cambiar_tamano ? ROBOT_PEQUENO_W : ROBOT_GRANDE_W;
                const robot_h = cambiar_tamano ? ROBOT_PEQUENO_H : ROBOT_GRANDE_H;
                const max_x = ANCHO - robot_w;
                const max_y = ALTO  - robot_h - 80; // margen barra inferior

                let vx = g.vx * 60 * REBOTE_FRICCION;
                let vy = g.vy * 60 * REBOTE_FRICCION;

                // Animacion de inercia: se frena gradualmente
                let paso = 0;
                const timer = setInterval(() => {
                    paso++;
                    vx *= 0.75;
                    vy *= 0.75;

                    const nx = Math.max(0, Math.min(max_x, pos_actual.current.x + vx));
                    const ny = Math.max(0, Math.min(max_y, pos_actual.current.y + vy));

                    posicion.setValue({ x: nx, y: ny });

                    if (paso >= REBOTE_PASOS || (Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5)) {
                        clearInterval(timer);
                    }
                }, REBOTE_DELAY);
            },
        })
    ).current;

    // ─── Crossfade players ────────────────────────────────────────────────
    const activo    = useRef<0 | 1>(0);
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

    const montado             = useRef(true);
    const en_transformacion   = useRef(false);
    const cambiar_tamano_prev = useRef<boolean>(cambiar_tamano);
    const timeout_retorno     = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timeout_transf      = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalo_default   = useRef<ReturnType<typeof setInterval> | null>(null);

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

    const reproducir = (video: any, loop = true) => {
        if (!montado.current) return;
        const siguiente: 0 | 1  = activo.current === 0 ? 1 : 0;
        const p_sig  = siguiente === 0 ? playerA : playerB;
        const op_sig = siguiente === 0 ? opacidad_A : opacidad_B;
        const op_sal = siguiente === 0 ? opacidad_B : opacidad_A;

        try { p_sig.replace(video); p_sig.loop = loop; p_sig.play(); } catch (e) {}

        Animated.parallel([
            Animated.timing(op_sig, { toValue: 1, duration: DURACION_CROSSFADE, useNativeDriver: true }),
            Animated.timing(op_sal, { toValue: 0, duration: DURACION_CROSSFADE, useNativeDriver: true }),
        ]).start(() => {
            try { (siguiente === 0 ? playerB : playerA).pause(); } catch (e) {}
        });

        activo.current = siguiente;
    };

    const iniciar_rotacion_default = () => {
        if (intervalo_default.current) clearInterval(intervalo_default.current);
        intervalo_default.current = setInterval(() => {
            if (!montado.current) return;
            reproducir(elegir_video_aleatorio(null), true);
        }, ROTACION_DEFAULT_MS);
    };

    // Transicion al cambiar modo
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
                reproducir(elegir_video_aleatorio(intencion ?? null), true);
                if (!intencion) iniciar_rotacion_default();
            }, DURACION_TRANSFORMACION);
        }
    }, [cambiar_tamano]);

    // Cambio de intencion
    useEffect(() => {
        if (!montado.current || en_transformacion.current) return;
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

    // ─── Render ────────────────────────────────────────────────────────────
    const estilo_robot = cambiar_tamano ? estilos_robot.robot_pequeno : estilos_robot.robot;
    const estilo_caja  = cambiar_tamano ? estilos_robot.caja_robot_pequeno : estilos_robot.caja_robot;

    return (
        <Animated.View
            style={[
                estilos_robot.caja_drag,
                { transform: posicion.getTranslateTransform() },
            ]}
            {...panResponder.panHandlers}
        >
            {!cambiar_tamano && (
                <View style={estilos_robot.caja_texto}>
                    <Texto style={estilos_robot.texto}>{frase}</Texto>
                </View>
            )}

            <View style={estilo_caja}>
                <Animated.View style={[{ position: 'absolute', width: '100%', height: '100%' }, { opacity: opacidad_A }]}>
                    <VideoView player={playerA} nativeControls={false} style={estilo_robot} />
                </Animated.View>
                <Animated.View style={[{ position: 'absolute', width: '100%', height: '100%' }, { opacity: opacidad_B }]}>
                    <VideoView player={playerB} nativeControls={false} style={estilo_robot} />
                </Animated.View>
            </View>
        </Animated.View>
    );
};

export default Robot;
