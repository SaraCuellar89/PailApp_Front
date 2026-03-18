import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, useWindowDimensions, View } from 'react-native';

const imagenes = [
    require('../Img/robot_1.png'),
    require('../Img/robot_2.png'),
    require('../Img/robot_3.png'),
];

const Carrusel_Fondo = () => {
    const { width, height } = useWindowDimensions();
    const [indiceActual, setIndiceActual] = useState(0);
    const ref = useRef<FlatList>(null);

    useEffect(() => {
        const intervalo = setInterval(() => {
        const siguiente = (indiceActual + 1) % imagenes.length;
        ref.current?.scrollToIndex({ index: siguiente, animated: true });
        setIndiceActual(siguiente);
        }, 3000);

        return () => clearInterval(intervalo);
    }, [indiceActual]);

    return (
        <FlatList
            ref={ref}
            data={imagenes}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
                <Image
                source={item}
                style={{ width, height, opacity: 0.2 }}
                resizeMode="cover"
                />
            )}
            style={{ position: 'absolute', top: 0, left: 0 }}
        />
    );
}

export default Carrusel_Fondo;