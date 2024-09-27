import { useState, useEffect } from 'react';

const ResponsiveContainer = ({ children }) => {
    const [scale, setScale] = useState(1);
    
    // Referencia basada en tu pantalla
    const referenceWidth = 1600;
    const referenceHeight = 900;

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Calcular escala basada en la referencia
            const widthScale = width / referenceWidth;
            const heightScale = height / referenceHeight;

            // Usar la escala mínima para mantener la proporción
            const newScale = Math.min(widthScale, heightScale);

            setScale(newScale);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Ejecutar al cargar la página

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            {children}
        </div>
    );
};

export default ResponsiveContainer;
