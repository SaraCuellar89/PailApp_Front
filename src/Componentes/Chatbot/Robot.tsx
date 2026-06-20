import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { VideoView, useVideoPlayer } from 'expo-video';
import estilos_robot from "../../Estilos/Chatbot/robot_css";
import Texto from "../Compartidos/Texto";
import { inferirTodasLasIntenciones } from "./utils/intenciones";

// ─── Constantes ───────────────────────────────────────────────
const VIDEO_TRANSFORMACION    = require('../../Animaciones/transformacion.mp4');
const VIDEO_TRANSFORMACION_2  = require('../../Animaciones/transformacion_2.mp4');
const DURACION_TRANSFORMACION = 2500;
const DURACION_CLIP_COLA      = 4000;
const DURACION_SALUDO         = 4000;
const ROTACION_DEFAULT_MS     = 9000;
const DURACION_INACTIVIDAD    = 60 * 1000;

// ─── Videos por intencion ─────────────────────────────────────
const videos_por_intencion: Record<string, any[]> = {
    "feliz":      [
        require('../../Animaciones/animaciones_chef/feliz_1.mp4'),
        require('../../Animaciones/animaciones_chef/feliz_2.mp4'),
        require('../../Animaciones/animaciones_chef/feliz_3.mp4'),
    ],
    "triste":     [
        require('../../Animaciones/animaciones_chef/triste_1.mp4'),
        require('../../Animaciones/animaciones_chef/triste_2.mp4'),
    ],
    "enojado":    [
        require('../../Animaciones/animaciones_chef/enojado_1.mp4'),
        require('../../Animaciones/animaciones_chef/enojado_2.mp4'),
    ],
    "hambre":     [require('../../Animaciones/animaciones_chef/hablar_1.mp4')],
    "receta":     [
        require('../../Animaciones/animaciones_chef/hablar_2.mp4'),
        require('../../Animaciones/animaciones_chef/hablar_3.mp4'),
    ],
    "rapido":     [require('../../Animaciones/animaciones_chef/hablar_4.mp4')],
    "saludable":  [require('../../Animaciones/animaciones_chef/hablar_5.mp4')],
    "dulce":      [require('../../Animaciones/animaciones_chef/hablar_1.mp4')],
    "salado":     [require('../../Animaciones/animaciones_chef/hablar_2.mp4')],
    "gracias":    [
        require('../../Animaciones/animaciones_chef/victoria_1.mp4'),
        require('../../Animaciones/animaciones_chef/victoria_2.mp4'),
        require('../../Animaciones/animaciones_chef/victoria_3.mp4'),
    ],
    "victoria":   [
        require('../../Animaciones/animaciones_chef/victoria_1.mp4'),
        require('../../Animaciones/animaciones_chef/victoria_2.mp4'),
    ],
    "default":    [
        require('../../Animaciones/animaciones_normal/esperar_1.mp4'),
        require('../../Animaciones/animaciones_normal/esperar_2.mp4'),
        require('../../Animaciones/animaciones_normal/esperar_3.mp4'),
        require('../../Animaciones/animaciones_normal/esperar_4.mp4'),
        require('../../Animaciones/animaciones_normal/esperar_5.mp4'),
    ],
};

const VIDEOS_HOLA: any[] = [
    require('../../Animaciones/animaciones_normal/saludar_1.mp4'),
    require('../../Animaciones/animaciones_normal/saludar_2.mp4'),
];

const VIDEOS_IDLE_CHEF: any[] = [
    require('../../Animaciones/animaciones_chef/esperar_1.mp4'),
];

const elegir_video_aleatorio = (intencion: string | null) => {
    const opciones = videos_por_intencion[intencion ?? "default"] ?? videos_por_intencion["default"];
    return opciones[Math.floor(Math.random() * opciones.length)];
};

const elegir_de_pool = (pool: any[]) => pool[Math.floor(Math.random() * pool.length)];

const construir_cola = (intenciones: string[]): any[] => {
    const cola: any[] = [];
    let ultimo: any = null;
    const lista = intenciones.length > 0 ? intenciones : ["__generico__"];
    for (const intencion of lista) {
        const opciones = videos_por_intencion[intencion] ?? VIDEOS_IDLE_CHEF;
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

type RobotProps = {
    cambiar_tamano: boolean;
    intencion: string | null;
    respuesta?: string | null;
};

const Robot = ({ cambiar_tamano, intencion, respuesta }: RobotProps) => {

    const [frase, setFrase] = useState(frases[0]);

    const player = useVideoPlayer(
        require('../../Animaciones/animaciones_normal/esperar_1.mp4'),
        p => { p.loop = true; p.play(); }
    );

    // ── Todos los refs de estado interno ────────────────────────
    const montado             = useRef(true);
    const en_cola             = useRef(false);
    const en_transformacion   = useRef(false);
    const en_saludo           = useRef(false);
    const modo_chef           = useRef(false);
    const primera_carga       = useRef(true);
    const cambiar_tamano_prev = useRef<boolean>(cambiar_tamano);

    // ── Un único objeto para todos los timers ────────────────────
    // Así no hay problema de closures capturando refs viejos de timers
    const timers = useRef<{
        cola:        ReturnType<typeof setTimeout>  | null;
        retorno:     ReturnType<typeof setTimeout>  | null;
        transf:      ReturnType<typeof setTimeout>  | null;
        intervalo:   ReturnType<typeof setInterval> | null;
        inactividad: ReturnType<typeof setTimeout>  | null;
    }>({
        cola: null, retorno: null, transf: null,
        intervalo: null, inactividad: null,
    });

    const limpiar_timers = useCallback(() => {
        const t = timers.current;
        if (t.cola)        clearTimeout(t.cola);
        if (t.retorno)     clearTimeout(t.retorno);
        if (t.transf)      clearTimeout(t.transf);
        if (t.intervalo)   clearInterval(t.intervalo);
        if (t.inactividad) clearTimeout(t.inactividad);
        timers.current = { cola: null, retorno: null, transf: null, intervalo: null, inactividad: null };
    }, []);

    useEffect(() => {
        montado.current = true;
        return () => { montado.current = false; limpiar_timers(); };
    }, [limpiar_timers]);

    useEffect(() => {
        if (!cambiar_tamano) {
            setFrase(frases[Math.floor(Math.random() * frases.length)]);
        }
    }, [cambiar_tamano]);

    // ── reproducir: accede siempre al player actual, sin deps extras ──
    const reproducir = useCallback((video: any, loop = true) => {
        if (!montado.current) return;
        try {
            player.replace(video);
            player.loop = loop;
            player.play();
        } catch (e) {}
    }, [player]);

    // ── iniciar_rotacion_default: lee modo_chef en tiempo de ejecución ──
    // No depende de nada que cambie → useCallback con [] es seguro
    // porque lee los refs directamente en runtime.
    const iniciar_rotacion_default = useCallback(() => {
        if (timers.current.intervalo) clearInterval(timers.current.intervalo);

        // Leer modo_chef EN EL MOMENTO de ejecutar, no en el closure
        const elegir = () =>
            modo_chef.current
                ? elegir_de_pool(VIDEOS_IDLE_CHEF)
                : elegir_video_aleatorio(null);

        reproducir(elegir(), true);

        timers.current.intervalo = setInterval(() => {
            if (!montado.current || en_cola.current) return;
            reproducir(elegir(), true);
        }, ROTACION_DEFAULT_MS);
    }, [reproducir]);

    // ── reproducir_cola: llama a iniciar_rotacion_default por ref ────
    // Para evitar el problema del closure viejo, guardamos la función
    // en un ref y la llamamos desde ahí → siempre la versión más nueva.
    const iniciar_rotacion_default_ref = useRef(iniciar_rotacion_default);
    useEffect(() => {
        iniciar_rotacion_default_ref.current = iniciar_rotacion_default;
    }, [iniciar_rotacion_default]);

    const reproducir_cola = useCallback((clips: any[]) => {
        if (!montado.current || clips.length === 0) return;

        limpiar_timers();
        en_cola.current = true;

        const avanzar = (index: number) => {
            if (!montado.current || index >= clips.length) {
                en_cola.current = false;
                // Llamar siempre la versión más reciente vía ref
                iniciar_rotacion_default_ref.current();
                return;
            }
            reproducir(clips[index], false);
            timers.current.cola = setTimeout(() => avanzar(index + 1), DURACION_CLIP_COLA);
        };

        avanzar(0);
    }, [reproducir, limpiar_timers]);

    // ── volver_a_modo_normal: usa ref para iniciar_rotacion_default ──
    const volver_a_modo_normal = useCallback(() => {
        if (!montado.current || !modo_chef.current) return;

        en_transformacion.current = true;
        limpiar_timers();
        en_cola.current = false;

        reproducir(VIDEO_TRANSFORMACION_2, false);

        timers.current.transf = setTimeout(() => {
            if (!montado.current) return;
            en_transformacion.current = false;
            modo_chef.current = false;
            // Llamar vía ref → lee modo_chef=false correctamente
            iniciar_rotacion_default_ref.current();
        }, DURACION_TRANSFORMACION);
    }, [reproducir, limpiar_timers]);

    const reiniciar_temporizador_inactividad = useCallback(() => {
        if (timers.current.inactividad) clearTimeout(timers.current.inactividad);
        if (!modo_chef.current) return;

        timers.current.inactividad = setTimeout(() => {
            volver_a_modo_normal();
        }, DURACION_INACTIVIDAD);
    }, [volver_a_modo_normal]);

    // ── Saludo inicial: solo al montar ───────────────────────────
    useEffect(() => {
        en_saludo.current = true;
        const clip = VIDEOS_HOLA[Math.floor(Math.random() * VIDEOS_HOLA.length)];
        reproducir(clip, false);

        timers.current.retorno = setTimeout(() => {
            if (!montado.current) return;
            en_saludo.current = false;
            iniciar_rotacion_default_ref.current();
        }, DURACION_SALUDO);

        return () => { limpiar_timers(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Respuesta del bot → cola de animaciones ──────────────────
    useEffect(() => {
        if (!respuesta || en_transformacion.current || en_saludo.current) return;
        const intenciones = inferirTodasLasIntenciones(respuesta);
        const cola        = construir_cola(intenciones);
        reproducir_cola(cola);
        reiniciar_temporizador_inactividad();
    }, [respuesta]);

    // ── Transicion normal → chef ─────────────────────────────────
    useEffect(() => {
        const anterior = cambiar_tamano_prev.current;
        cambiar_tamano_prev.current = cambiar_tamano;

        if (!anterior && cambiar_tamano && !en_transformacion.current) {
            en_transformacion.current = true;
            limpiar_timers();
            en_cola.current   = false;
            en_saludo.current = false;

            reproducir(VIDEO_TRANSFORMACION, false);

            timers.current.transf = setTimeout(() => {
                if (!montado.current) return;
                en_transformacion.current = false;
                modo_chef.current = true;

                if (intencion && intencion !== "default") {
                    reproducir(elegir_video_aleatorio(intencion), true);
                } else {
                    iniciar_rotacion_default_ref.current();
                }

                reiniciar_temporizador_inactividad();
            }, DURACION_TRANSFORMACION);
        }
    }, [cambiar_tamano]);

    // ── Cambio de intencion (solo modo normal) ───────────────────
    useEffect(() => {
        if (!montado.current) return;
        if (en_saludo.current || en_transformacion.current || en_cola.current || modo_chef.current) return;
        if (primera_carga.current) {
            primera_carga.current = false;
            return;
        }

        limpiar_timers();

        if (intencion && intencion !== "default") {
            reproducir(elegir_video_aleatorio(intencion), true);
            timers.current.retorno = setTimeout(() => {
                if (!montado.current) return;
                iniciar_rotacion_default_ref.current();
            }, 8000);
        } else {
            iniciar_rotacion_default_ref.current();
        }

        return () => { limpiar_timers(); };
    }, [intencion]);

    // ── Render ───────────────────────────────────────────────────
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