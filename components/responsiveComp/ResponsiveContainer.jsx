import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para validar las props

const ResponsiveContainer = ({ children, maxWidth = '1600px' }) => {
    // Define un estado llamado 'scale' con valor inicial de 1
    const [scale, setScale] = useState(1);

    useEffect(() => {
        // Función para manejar el redimensionamiento de la pantalla
        const handleResize = () => {
            // Obtiene el ancho actual de la ventana
            const screenWidth = window.innerWidth;

            // Calcula la escala basada en 1600px como ancho de referencia
            let newScale = screenWidth / 1600;

            // Si el ancho de la pantalla es menor a 1024px, ajusta el tamaño proporcionalmente
            if (screenWidth < 1024) {
                // Calcula un factor de escala adicional para pantallas más pequeñas
                const scaleFactor = 1 - ((1024 - screenWidth) * 0.02) / 1024;
                // Aplica este factor al nuevo tamaño de escala
                newScale *= scaleFactor;
            }

            // Limita la escala para que no sea menor que 0.4 (evita que el contenido sea demasiado pequeño)
            if (newScale < 0.4) {
                newScale = 0.4;
            }

            // Actualiza el estado con la nueva escala
            setScale(newScale);
        };

        // Agrega un evento 'resize' para llamar a handleResize cuando se cambie el tamaño de la ventana
        window.addEventListener('resize', handleResize);
        handleResize(); // Ejecuta la función una vez cuando la página carga por primera vez

        // Elimina el evento 'resize' cuando el componente se desmonta
        return () => window.removeEventListener('resize', handleResize);
    }, []); // [] indica que este efecto se ejecuta solo una vez al montar

    return (
        <div
            style={{
                width: '100%', // Ocupa todo el ancho disponible
                minHeight: '100%', // Ocupa al menos toda la altura disponible
                maxHeight: '100%', // Limita la altura máxima al 100% del contenedor
                overflowX: 'hidden', // Previene el desplazamiento horizontal
                display: 'flex', // Usa flexbox para centrar el contenido
                justifyContent: 'center', // Centra el contenido horizontalmente
                transform: `scale(${scale})`, // Aplica el escalado calculado
                transformOrigin: 'top left', // Establece el punto de origen del escalado en la esquina superior izquierda
            }}
        >
            {/* Contenedor principal para el contenido */}
            <div
                style={{
                    maxWidth: maxWidth, // Limita el ancho máximo al valor especificado (1600px por defecto)
                    width: '100%', // Establece el ancho al 100% del contenedor padre
                    boxSizing: 'border-box', // Incluye padding y border dentro del ancho y la altura total
                }}
            >
                {children} {/* Renderiza los elementos hijos pasados a este contenedor */}
            </div>
        </div>
    );
};

ResponsiveContainer.propTypes = {
    children: PropTypes.node.isRequired, // Valida que 'children' es un nodo React y es obligatorio
    maxWidth: PropTypes.string, // Valida que 'maxWidth' sea una cadena de texto
};

export default ResponsiveContainer; // Exporta el componente para usarlo en otros archivos
