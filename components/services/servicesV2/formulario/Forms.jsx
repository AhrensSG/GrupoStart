import { addProductToCart } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";
import Modal from "@/components/login/Modal";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Componente principal del formulario personalizado
export default function Formulario() {
    //Nuevo precio base
    const precioBase = 14900;
    // Estado inicial de los ítems del formulario con valores predeterminados
    const [items, setItems] = useState([
        {
            detalle: "Cantidad de posteos e historias básicas",
            cantidad: 0,
            valor: precioBase.toFixed(2),
            info: "Son posteos de una sola imagen, normalmente se suele utilizar este tipo de recursos para dar avisos en general a la comunidad, estos mismos posteos se publicarán también en las historias, es por esto que llamamos a esta categoría “posteo e historias básicas”",
        },
        {
            detalle: "Cantidad de historias tamaño completo",
            cantidad: 0,
            valor: (precioBase * 0.85).toFixed(2),
            info: "Estas son imagenes exclusivas para las historias, normalmente tienen por objetivo de interactuar con la comunidad, conocerlos o realizar promociones por tiempo limitado",
        },
        {
            detalle: "Cantidad de carruseles",
            cantidad: 0,
            precioA: (precioBase).toFixed(2),
            info: "Estos son posteos con varias imágenes que forman parte del mismo contenido, este tipo de recursos junto con los reels, son las herramientas más poderosas del marketing actual. Con este recurso lograremos aparecer tantas veces como cantidad de imágenes añadidas al carrusel haya en el inicio de nuestros seguidores",
            max: 30,
        },
        {
            detalle: "Cantidad de imágenes para el carrusel",
            cantidad: 0,
            precioB: (precioBase).toFixed(2),
            info: "Aquí deberás determinar la cantidad de imágenes que te gustaría que tuvieran tus carruseles, con un mínimo de 1 y con un máximo de 20, cuantas más imágenes añadas al carrusel mayores son las posibilidades de crear posteos increíbles y mayor será el número de veces que aparecerás en el inicio de tus seguidores",
            max: 20,
        },
        {
            detalle: "Cantidad de vídeos: Idea, Guión y edición de videos",
            cantidad: 0,
            valor: (precioBase * 2.68).toFixed(2),
            info: "Esta es sin duda la herramienta más poderosa del marketing de redes sociales en la actualidad. Esta opción está pensada para que te brindemos ideas disruptivas con grandes posibilidades de obtener gran alcance, además de brindarte el guión estructurado con estrategias únicas desarrolladas por nosotros, te vamos a asesorar además en las formas correctas en las que deberás brindarnos el material grabado y con él generamos el paso final para un video único “una edición verdaderamente profesional”",
        },
        {
            detalle: "¿Deseas agregar efemérides?",
            cantidad: 0,
            valor: 0, // Inicializa el valor a 0
            info: "Las efemérides son posteos realizados para conmemorar un día especial en tu nicho, como por ejemplo “un post especial por el día del nutricionista”. Si tildas esta opción automáticamente agregaremos a tu plan la posibilidad de postear hasta 3 efemérides por mes en tu plan.",
        },
        {
            detalle: "Cantidad de días para publicidad Meta",
            cantidad: 0,
            max: 31,
            info: "Este es un recurso imprescindible para lograr resultados comerciales positivos, además de lograr impulsar el alcance de tu cuenta y ganar seguidores. Aquí deberás determinar la cantidad de días que te gustaría que circulen las campañas publicitarias que preparamos exclusivamente para vos. Cuantos más días elijas mayor será la efectividad de tus campañas publicitarias.",
        },
        {
            detalle: "Presupuesto por día para publicidad Meta",
            cantidad: 0,
            presupuesto: 0,
            presupuestoTotal: 0,
            info: "El presupuesto por dia determina el alcance que tendrá tu campaña publicitaria es por esto que es muy importante que se alinee con los objetivos de conquista de mercado de tu empresa, por ejemplo: Si buscas realizar campañas solamente en tu ciudad, el presupuesto mínimo puede brindarte resultados positivos, pero si deseas cubrir zonas demográficas más grandes deberás ampliar tu presupuesto tanto como mercados nuevos desees alcanzar. Además, grandes presupuestos publicitarios generan resultados positivos más rápidos, si buscas resultados rápidos deberás elegir un presupuesto acorde a lo que buscas. (Minimo $4500)",
        },
    ]);

    const { state, dispatch } = useContext(Context);
    const router = useRouter();
    const [showLogin, setShowLogin] = useState(false);
    const handleBuyNow = async () => {
        // Verifica si el usuario está autenticado
        if (!state.user) {
            setShowLogin(true);
            return toast.info("¡Inicia sesión y continúa!");
        }

        // Filtra los ítems seleccionados
        const selectedItems = items
            .filter((item) => item.cantidad > 0)
            .map((item) => ({
                id: item.detalle,
                name: item.detalle,
                description: item.info,
                price: item.valor || item.precioA || item.precioB,
                quantity: item.cantidad,
                budget: item.presupuesto,
            }));

        // Configura el paquete de productos a agregar al carrito
        const data = {
            id: "pack-gestion-redes",
            name: "Pack Personalizado de Gestión de Redes",
            description: "Servicio personalizado para redes sociales",
            price: calcularValorTotal(),
            items: selectedItems,
            productType: "pack",
        };

        // Verifica si el paquete ya está en el carrito
        if (state.cart?.some((prod) => prod.id === data.id)) {
            toast.info(`Se actualizó el producto en tu carrito!`);
        } else {
            toast.success(`Añadiste el pack personalizado a tu carrito!`);
        }
        // Añade al carrito y redirige al pago
        await addProductToCart(data, dispatch);
        return router.push("/payment");
    };

    // Estado del tooltip, que muestra la información de los ítems al pasar el mouse
    const [tooltip, setTooltip] = useState({
        visible: false,
        content: "", // Contenido del tooltip
        x: 0,
        y: 0,
    });

    // Maneja cuando el mouse pasa sobre un ítem para mostrar el tooltip
    const handleMouseOver = (event, info) => {
        const x = event.clientX + 10; // Posición del tooltip (X)
        const y = event.clientY + 10; // Posición del tooltip (Y)
        setTooltip({ visible: true, content: info, x, y });
    };

    // Oculta el tooltip cuando el mouse sale del ítem
    const handleMouseOut = () => {
        setTooltip({ visible: false, content: "", x: 0, y: 0 });
    };

    // Estado de los interruptores para seleccionar redes sociales y efemérides
    const [formData, setFormData] = useState({
        facebook: false,
        instagram: false,
        tiktok: false,
        efemerides: false,
    });

    // Estado para habilitar o deshabilitar la edición del formulario
    const [isEditable, setIsEditable] = useState(false);

    const handleEfemeridesToggle = (checked) => {
        setFormData((prevData) => ({
            ...prevData,
            efemerides: checked,
        }));

        setItems((prevItems) => {
            const newItems = [...prevItems];

            // Suponiendo que el índice 5 corresponde a "Efemérides"
            newItems[5].cantidad = checked ? 1 : 0;
            newItems[5].valor = (checked ? (14900 - 14900 * 0.25) * 3 : 0).toString();

            // Reiniciar el valor de "Efemérides" si el interruptor está desactivado
            if (!checked) {
                newItems[5].valor = 0;
            }

            // Recalcular el total con los nuevos valores
            setTotal(calcularValorTotal(newItems));

            return newItems; // Retornar el nuevo estado de los ítems
        });
    };

    //Habilitacion del formulario mediante los interruptores de redes, efemerides y reinicio de cantidades
    const handleToggleChange = (e) => {
        const { name, checked } = e.target;
    
        setFormData((prevData) => {
            const updatedData = { 
                ...prevData, 
                [name]: checked
            };
    
            // Verificar si al menos uno de los interruptores de redes sociales está activado
            const isAnySocialMediaActive = updatedData.facebook || updatedData.instagram || updatedData.tiktok;
    
            setIsEditable(isAnySocialMediaActive); // Habilitar o deshabilitar la edición
    
            setItems((prevItems) => {
                return prevItems.map((item, index) => {
                    // Reiniciar cantidades solo si TODOS los interruptores están desactivados
                    if (!isAnySocialMediaActive) {
                        return { ...item, cantidad: 0 };
                    }
    
                    // Si efemérides está desactivado, reiniciar su valor
                    if (index === 5 && !updatedData.efemerides) {
                        return { ...item, cantidad: 0, valor: 0 };
                    }
    
                    return item; // Mantener otros valores sin cambios
                });
            });
    
            // Si no hay ningún interruptor de redes sociales activado, desactivar efemérides
            if (!isAnySocialMediaActive) {
                updatedData.efemerides = false;
            }
    
            return updatedData; // Retornar el nuevo estado
        });
    };

    
    // Incrementar la cantidad del ítem en el índice dado
    const handleIncrement = (index) => {
        const newItems = [...items];

        if (index === 2) {
            newItems[2].cantidad += 1; // Incrementar la cantidad de carruseles

            // Solo establecer imágenes a 1 si no hay imágenes seleccionadas
            if (newItems[2].cantidad === 1 && newItems[3].cantidad === 0) {
                newItems[3].cantidad = 1; // Establecer a 1 solo en el primer carrusel
            }
        } else if (index === 3) {
            if (newItems[2].cantidad > 0 && newItems[3].cantidad < 20) {
                // Validar que no exceda 20
                newItems[3].cantidad += 1;
            }
        } else if (index === 6) {
            // Lógica para el índice 6
            if (newItems[6].cantidad < 365) {
                if (newItems[6].cantidad === 0) {
                    newItems[6].cantidad = 5; // Establecer a 5 si estaba en 0
                } else {
                    newItems[6].cantidad += 1; // Incrementar en 1
                }
            }
        } else {
            newItems[index].cantidad += 1;
        }

        setItems(newItems);
    };

    // Decrementar la cantidad del ítem en el índice dado
    const handleDecrement = (index) => {
        const newItems = [...items];

        if (index === 2) {
            if (newItems[2].cantidad > 0) {
                newItems[2].cantidad -= 1; // Decrementar la cantidad de carruseles

                // Si no quedan carruseles, reiniciar las imágenes a 0
                if (newItems[2].cantidad === 0) {
                    newItems[3].cantidad = 0; // Reiniciar cantidad de imágenes solo si no hay carruseles
                }
            }
        } else if (index === 3) {
            if (newItems[3].cantidad > 0) {
                newItems[3].cantidad -= 1; // Decrementar la cantidad de imágenes
            }
        } else if (index === 6) {
            // Lógica para el índice 6
            if (newItems[6].cantidad > 0) {
                if (newItems[6].cantidad === 5) {
                    newItems[6].cantidad = 0; // Permitir decrementar a 0 si está en 5
                } else {
                    newItems[6].cantidad -= 1; // Decrementar en 1
                }
            }
        } else {
            if (newItems[index].cantidad > 0) {
                newItems[index].cantidad -= 1; // Decrementar en 1
            }
        }

        setItems(newItems);
    };

    const calcularSubtotalCarruseles = () => {
        const cantidadCarruseles = items[2].cantidad; // Cantidad de carruseles
        const cantidadImagenes = items[3].cantidad; // Cantidad de imágenes
        const precioCarrusel = 14900; // Precio por un carrusel
        let costoImagen; // Costo por imagen dependiendo de la cantidad de imágenes añadidas

        // Determinar el costo por imagen con descuentos según la cantidad de imágenes
        if (cantidadImagenes >= 1 && cantidadImagenes < 5) {
            costoImagen = 14900 * 0.75; // 25% de descuento
        } else if (cantidadImagenes >= 5 && cantidadImagenes < 10) {
            costoImagen = 14900 * 0.65; // 35% de descuento
        } else if (cantidadImagenes >= 10 && cantidadImagenes < 15) {
            costoImagen = 14900 * 0.55; // 45% de descuento
        } else if (cantidadImagenes >= 15 && cantidadImagenes <= 20) {
            costoImagen = 14900 * 0.45; // 55% de descuento
        } else {
            costoImagen = 0; // No se permite más de 20 imágenes
        }

        // Calcular el subtotal para un carrusel con la cantidad de imágenes seleccionada
        const subtotalPorCarrusel = precioCarrusel + (costoImagen * cantidadImagenes);

        // Calcular el total multiplicando el subtotal por la cantidad de carruseles
        const subtotalTotal = subtotalPorCarrusel * cantidadCarruseles;

        return subtotalTotal;
    };

    const handleInputChange = (index, value) => { 
        const newItems = [...items];
    
        // Para el índice 6 (validación de cantidad entre 0 y 365)
        if (index === 6) {
            const numericValue = Number(value);
            if (value === "" || (numericValue >= 0 && numericValue <= 365)) {
                newItems[6].cantidad = numericValue; // Actualiza el valor
                setError(""); // Limpiar error si es válido
            }
        } 
        
        // Para el índice 7 (validación de presupuesto)
        else if (index === 7) {
            let formattedValue = value.replace(/^0+(?=\d)/, ''); // Elimina ceros iniciales inválidos
            let cantidad = 1
            // Si Facebook e Instagram están desactivados, forzar presupuesto a 0
            if (!formData.facebook && !formData.instagram) {
                formattedValue = "0";
                cantidad = 0;
            }
    
            newItems[7].presupuesto = formattedValue;
            newItems[7].cantidad = cantidad;
            setError(""); // Limpiar error mientras se está escribiendo
        } 
        
        // Para otros índices
        else {
            const numericValue = Number(value);
            newItems[index].cantidad = numericValue; // Actualiza el valor
            setError(""); // Limpiar error si es válido
        }
    
        setItems(newItems);
    };
    
    // Validación al perder el foco (onBlur)
    const handleBlur = (index) => {
        if (index === 7) {
            const numericValue = Number(items[7].presupuesto);
    
            // Si Facebook e Instagram están desactivados, reiniciar presupuesto a 0
            if (!formData.facebook && !formData.instagram) {
                setItems((prevItems) => {
                    const updatedItems = [...prevItems];
                    updatedItems[7].presupuesto = "0"; // Reinicia a 0
                    return updatedItems;
                });
            } 
            
            // Validación de presupuesto mínimo
            else if (numericValue < 4500 && numericValue !== 0) {
                setError("El presupuesto no puede ser menor a $4500");
            } else {
                setError(""); // Limpiar error si es válido
            }
        }
    };
    
    // Efecto para reiniciar el presupuesto cuando se desactivan los interruptores
    useEffect(() => {
        if (!formData.facebook && !formData.instagram) {
            setItems((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[7].presupuesto = "0"; // Reiniciar a 0 si no hay redes activadas
                return updatedItems;
            });
        }
    }, [formData.facebook, formData.instagram]); // Se ejecuta cuando cambian los interruptores
    

    //Presupuesto Meta
    const calcularPresupuestoTotal = () => {
        const presupuestoPorDia = items[7].presupuesto || 0;
        const cantidadDeDias = items[6].cantidad || 0;
        const totalPresupuesto = presupuestoPorDia * cantidadDeDias;

        setItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[7].valor = totalPresupuesto; // Actualiza `valor` en el índice 7
            return newItems;
        });
    };

    // Efecto para recalcular el presupuesto total cada vez que cambie el presupuesto o la cantidad de días
    useEffect(() => {
        calcularPresupuestoTotal();
    }, [items[6].cantidad, items[7].presupuesto]); // Dependencias: cantidad de días y presupuesto por día

    const [total, setTotal] = useState(0); // Definición del estado del total

    // Función para calcular el valor total
    const calcularValorTotal = () => {
        // Recalcular el total basado en los valores y cantidades de los ítems
        let total = items.reduce((acc, item, index) => {
            const itemValor = item.valor || 0; // Asegúrate de que 'valor' sea un número
            const itemCantidad = item.cantidad || 0; // Asegúrate de que 'cantidad' sea un número

            // Si es el índice 2 (carruseles), sumar el subtotal de los carruseles
            if (index === 2) {
                return acc + calcularSubtotalCarruseles(); // Sumar el subtotal de los carruseles
            }

            // Si el índice 7 es presupuesto total, simplemente sumar el valor calculado de presupuesto
            if (index === 7) {
                return acc + (item.valor || 0); // Sumar el valor calculado del presupuesto
            }

            // Para los ítems que no son carruseles ni presupuesto, hacer multiplicación normal
            return acc + itemCantidad * itemValor;
        }, 0);

        // Si TikTok está activado, agregar $15,000 al total
        if (formData.tiktok) {
            total += 15000;
        }

        return total;
    };

    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleCloseWarningModal = () => {
        setShowWarningModal(false);
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const [error, setError] = useState(""); // Estado para el mensaje de error

    return (
        <div className="py-6 md:px-[10%] bg-[#FFFFFF] relative md:flex-wrap sm:w-auto xs:w-full max-xs:w-full xs:px-[3%] max-xs:px-[2%] sm:px-[4%]">
            {showLogin === true && <Modal setShowLogin={setShowLogin} />}
            {/* Encabezado del formulario */}
            <div className="text-center mb-8 mt-0 sm:w-full sm:mx-auto relative">
                <span className="bg-[#FB8A00] text-white font-bold xs:py-[11px] xs:px-[38px] max-xs:py-2 max-xs:px-4 rounded-medium border rounded-tl-full rounded-br-full text-center items-center justify-center xs:text-3xl max-xs:text-xl">
                    Plan Personalizado
                </span>
            </div>

            {/* Texto explicativo */}
            <div className="text-center justify-center items-center py-[5px]">
                <span className="text-center justify-center items-center text-md py-[26px]">
                    Elegí todo lo que quieras para tus redes sin límites para lograr el éxito!
                </span>
            </div>

            {/* Interruptores de redes sociales */}
            <div className="flex xs:space-x-4 max-xs:space-x-2 mb-4 justify-center items-center border-t-2 border-t-blue-500 bg-[#0853FC] text-white p-2 rounded-t-full">
                {["facebook", "instagram", "tiktok"].map((platform) => (
                    <label key={platform} className="flex items-center xs:space-x-2 max-xs:space-x-1">
                        <input
                            type="checkbox"
                            name={platform}
                            checked={formData[platform]}
                            onChange={handleToggleChange}
                            className="hidden"
                        />
                        <span
                            className={`xs:w-12 max-xs:w-6 xs:h-6 max-xs:h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                                formData[platform] ? "bg-orange-500" : "bg-gray-300"
                            }`}
                        >
                            <span
                                className={`xs:w-5 max-xs:w-4 xs:h-5 max-xs:h-3 bg-white rounded-full shadow-md transform transition-transform ${
                                    formData[platform] ? "xs:translate-x-6 max-xs:translate-x-4:" : "translate-x-0"
                                }`}
                            ></span>
                        </span>
                        <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                    </label>
                ))}
            </div>

            <div className="transition duration-3600 ease-in-out rounded-b-3xl">
            {isEditable ? ( 
                <div className="transition duration-3600 ease-in-out rounded-b-3xl">
            {/* Encabezados de columnas */}
            <div className="grid sm:grid-cols-3 max-xs:grid-cols-[3fr_1fr_1fr] xs:grid-cols-[2fr_1fr_1fr] mb-2">
                <h3 className="font-bold text-sm text-center">Detalle</h3>
                <h3 className="font-bold text-sm text-center">Cantidad</h3>
                <h3 className="font-bold text-sm text-center">Valor</h3>
            </div>

            {/* Línea horizontal continua debajo de los encabezados */}
            <hr className="border-2 border-black mb-4" />

                {/* Renderizar solo los ítems 5 y 6 si solo TikTok está activado */}
                {formData.tiktok && !formData.facebook && !formData.instagram && (
                    <>
                        {/* Ítem 5 */}
                        <div className="grid sm:grid-cols-3 xs:grid-cols-[2fr_1fr_1fr] max-xs:grid-cols-[3fr_1fr_1fr] items-center mb-2">
                            {/* Contenedor de icono de información y detalle */}
                            <div 
                                className="flex justify-center items-center space-x-2 text-black-900 text-sm font-bold text-center"
                                onMouseOver={(e) => handleMouseOver(e, items[4].info)}
                                onMouseOut={handleMouseOut}
                            >
                                {/* Icono de información */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-info-circle-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill="orange"
                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5 a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                                    />
                                    <path fill="white" d="M8 5.5 a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </svg>
                                <span className="md:text-center max-xs:text-start xs:text-start sm:text-start">{items[4].detalle}</span>
                            </div>

                            {/* Input de cantidad */}
                            <div className="flex justify-center sm:items-center xs:items-end max-xs:items-end max-xs:mx-0">
                                <input
                                    type="text"
                                    value={items[4].cantidad}
                                    onChange={(e) => handleInputChange(4, e.target.value)}
                                    min="0"
                                    disabled={!formData.tiktok}
                                    className="focus:outline-none focus:border-orange-500 text-center border-2 border-orange-500 bg-white text-black font-semibold rounded text-sm xs:w-8 max-xs:w-8 appearance-none"
                                />
                                <div className="hidden md:flex flex-col ml-2">
                                    <button
                                        onClick={() => handleIncrement(4)}
                                        disabled={!formData.tiktok}
                                        className="bg-gray-300 text-black rounded-t xs:px-1 max-xs:px-3 xs:py-0.1 max-xs:py-[3px] xs:text-xs max-xs:text-sm xs:font-md max-xs:font-extrabold"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleDecrement(4)}
                                        disabled={!formData.tiktok}
                                        className="bg-gray-300 text-black xs:px-1 max-xs:px-3 xs:py-0.1 max-xs:py-[3px] xs:text-xs max-xs:text-sm xs:font-md max-xs:font-extrabold rounded-b"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>

                            {/* Columna de valor */}
                            <div className="text-sm text-center">
                                {`$${(items[4].cantidad * items[4].valor).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            </div>
                        </div>

                        <hr className="xs:border-2 max-xs:border-1 max-xs:border-gray-500 xs:border-black mb-2 " />

                        {/* Ítem 6 */}
                        <div className="grid sm:grid-cols-3 xs:grid-cols-[2fr_1fr_1fr] max-xs:grid-cols-[3fr_1fr_1fr] justify-center items-center mb-2">
                            {/* Contenedor de icono de información y detalle */}
                            <div 
                                className="flex justify-center items-center space-x-2 text-black-900 text-sm font-bold text-center"
                                onMouseOver={(e) => handleMouseOver(e, items[5].info)}
                                onMouseOut={handleMouseOut}
                            >
                                {/* Icono de información */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-info-circle-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill="orange"
                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5 a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                                    />
                                    <path fill="white" d="M8 5.5 a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </svg>
                                <span className="md:text-center max-xs:text-start xs:text-start sm:text-start">{items[5].detalle}</span>
                            </div>

                            {/* Switch de efemérides */}
                            <label className="flex items-center justify-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="efemerides"
                                    checked={formData.efemerides}
                                    onChange={(e) => handleEfemeridesToggle(e.target.checked)}
                                    className="hidden"
                                    disabled={!formData.tiktok}
                                />
                                <span
                                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                                        formData.efemerides ? "bg-orange-500" : "bg-gray-300"
                                    }`}
                                >
                                    <span
                                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                                            formData.efemerides ? "translate-x-6" : "translate-x-0"
                                        }`}
                                    ></span>
                                </span>
                            </label>

                            {/* Columna de valor */}
                            <div className="text-sm text-center">
                                {`$${items[5].valor.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            </div>
                        </div>
                        <hr className="xs:border-2 max-xs:border-1 max-xs:border-gray-500 xs:border-black mb-2 " />
                    </>
                )}


            {/* Formulario con columnas y líneas continuas para cada ítem */}
            {(formData.facebook || formData.instagram) && (
                <>
            {items.map((item, index) => (
                <div key={index}>
                    <div className="grid sm:grid-cols-3 xs:grid-cols-[2fr_1fr_1fr] max-xs:grid-cols-[3fr_1fr_1fr] items-center mb-2">
                        <div
                            className="text-black-900 text-sm font-bold max-xs:flex-grow flex xs:items-center max-xs:items-start text-start md:justify-center max-xs:justify-items-start xs:justify-items-start"
                            onMouseOver={(e) => handleMouseOver(e, item.info)}
                            onMouseOut={handleMouseOut}
                        >
                            {/* Icono de información */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-info-circle-fill xs:mr-2 max-xs:mr-1 max-xs:items-start sm:items-center flex"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill="orange"
                                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5 a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                                />
                                <path fill="white" d="M8 5.5 a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                            </svg>
                            <div className="text-black-900 text-sm max-xs:items-start max-xs:text-start">{item.detalle}</div>
                        </div>

                        {/* Campo de entrada para los índices 0 a 5 */}
                        
                        {index < 5 ? (
                            <div className="flex justify-center sm:items-center xs:items-end max-xs:items-end max-xs:mx-0">
                                <input
                                    type="text"
                                    value={item.cantidad}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    min="0"
                                    disabled={!(formData.facebook || formData.instagram || formData.tiktok)}  // Deshabilitar si no es editable
                                    className="focus:outline-none focus:border-orange-500 text-center border-2 border-orange-500 bg-white text-black font-semibold rounded text-sm xs:w-8 max-xs:w-8 appearance-none"
                                />
                                <div className="hidden md:flex flex-col ml-2">
                                    <button
                                        onClick={() => handleIncrement(index)}
                                        disabled={!isEditable} // Deshabilitar si no es editable
                                        className="bg-gray-300 text-black rounded-t xs:px-1 max-xs:px-3 xs:py-0.1 max-xs:py-[3px] xs:text-xs max-xs:text-sm xs:font-md max-xs:font-extrabold"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleDecrement(index)}
                                        disabled={!isEditable} // Deshabilitar si no es editable
                                        className="bg-gray-300 text-black xs:px-1 max-xs:px-3 xs:py-0.1 max-xs:py-[3px] xs:text-xs max-xs:text-sm xs:font-md max-xs:font-extrabold rounded-b"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        ) : item.detalle === "¿Deseas agregar efemérides?" ? (
                            // Condición para el interruptor de efemérides
                            <label className="flex items-center justify-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="efemerides"
                                    checked={formData.efemerides}
                                    onChange={(e) => handleEfemeridesToggle(e.target.checked)}
                                    className="hidden"
                                    disabled={!formData.facebook && !formData.instagram && !formData.tiktok}
                                />
                                <span
                                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                                        formData.efemerides ? "bg-orange-500" : "bg-gray-300"
                                    }`}
                                >
                                    <span
                                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                                            formData.efemerides ? "translate-x-6" : "translate-x-0"
                                        }`}
                                    ></span>
                                </span>
                            </label>
                        ) : index === 6 ? (
                            // Campo de entrada para el índice 6
                            <div className="flex justify-center sm:items-center xs:items-end max-xs:items-end max-xs:mx-0">
                                <input
                                    type="text"
                                    value={items[6].cantidad}
                                    onChange={(e) => handleInputChange(6, e.target.value)}
                                    min="0"
                                    disabled={!isEditable} // Deshabilitar si no es editable
                                    className="focus:outline-none focus:border-orange-500 text-center border-2 border-orange-500 bg-white text-black font-semibold rounded text-sm xs:w-8 max-xs:w-8 max-xs:mx-0 appearance-none"
                                    style={{ MozAppearance: "textfield" }}
                                />
                                <div className="hidden md:flex flex-col ml-2">
                                    <button
                                        onClick={() => handleIncrement(index)}
                                        disabled={!isEditable} // Deshabilitar si no es editable
                                        className="bg-gray-300 text-black xs:px-1 max-xs:px-3 xs:py-0.1 max-xs:py-[3px] xs:text-xs max-xs:text-sm xs:font-md max-xs:font-extrabold rounded-t"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleDecrement(index)}
                                        disabled={!isEditable} // Deshabilitar si no es editable
                                        className="bg-gray-300 text-black xs:px-1 max-xs:px-3 xs:py-0.1 max-xs:py-[3px] xs:text-xs max-xs:text-sm xs:font-md max-xs:font-extrabold rounded-b"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        ) : index === 7 ? (
                            // Campo de entrada para el índice 7
                            <div className="flex relative justify-center items-center">
                                <div className="flex items-center">
                                    <span className="text-black font-semibold mr-2">$</span> {/* Símbolo $ al lado izquierdo */}
                                    <input
                                        type="text"
                                        value={item.presupuesto}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onBlur={() => handleBlur(index)} // Validar al perder el foco
                                        disabled={!isEditable} // Deshabilitar si no es editable
                                        maxLength={12}
                                        className={`focus:outline-none focus:border-orange-500 border-2 
                  ${error && index === 7 ? "border-red-500" : "border-orange-500"} 
                  bg-white text-black font-semibold rounded text-sm appearance-none`}
                                        style={{
                                            MozAppearance: "textfield",
                                            width:
                                                item.presupuesto && !isNaN(item.presupuesto) && parseFloat(item.presupuesto) > 0
                                                    ? `${Math.max(item.presupuesto.length * 0.7 + 4, 7)}ch` // Ancho dinámico
                                                    : "6ch", // Ancho mínimo cuando vacío o 0
                                            textAlign: "center",
                                            paddingX: "0.5vh", // Alinear el texto a la derecha para mejor lectura
                                        }}
                                    />
                                </div>
                                {error && index === 7 && <p className="text-red-500 text-xs">{error}</p>}
                            </div>
                        ) : (
                            // Renderizado para otros índices
                            <div className="flex justify-center items-center max-xs:mx-[-2vh] xs:mx-0">
                                <span className="bg-white text-black px-3 py-0.5 border-2 border-orange-500 rounded text-sm">{item.cantidad}</span>
                                <div className="hidden md:flex flex-col ml-2">
                                    <button
                                        onClick={() => handleIncrement(index)}
                                        disabled={!isEditable} // Deshabilitar si no es editable
                                        className="bg-gray-300 text-black px-1 text-xs rounded-t"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleDecrement(index)}
                                        disabled={!isEditable} // Deshabilitar si no es editable
                                        className="bg-gray-300 text-black px-1 text-xs rounded-b"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Columna de valor */}
                        <div className="text-sm text-center">
                            {index === 6
                                ? ""
                                : index === 5
                                ? `$${items[5].valor.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                : index === 2
                                ? ""
                                : index === 3
                                ? `$${calcularSubtotalCarruseles().toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                : index === 7
                                ? `$${(items[7].presupuesto * (items[6].cantidad || 0)).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                : `$${(item.cantidad * item.valor).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        </div>
                    </div>
                    {/* Línea horizontal para separar los ítems */}
                    {index !== 2 && index !== 6 && <hr className="xs:border-2 max-xs:border-1 max-xs:border-gray-500 xs:border-black mb-2 " />}
                </div>
            ))}

            </>
            )}
            
            {/* Valor total y resultado */}

            <div className="flex items-center mt-4 xs:justify-end max-xs:justify-center">
                <h3 className="font-extrabold text-lg uppercase mr-4">Valor Total:</h3>
                <span className="font-extrabold text-lg border-2 border-orange-500 px-2 py-1 rounded text-center">${calcularValorTotal().toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {/* Botón de enviar */}
            <div className="flex xs:justify-end max-xs:justify-center mt-4">
                <button
                    onClick={handleBuyNow}
                    className="bg-blue-600 text-white text-1xl px-[95px] py-1 rounded-medium border rounded-tl-xl rounded-br-xl font-lg"
                >
                    CONTRATAR
                </button>
            </div>

            </div>
            ) : (
            
                <div className="lg:p-12 md:p-6 sm:p-6 xs:p-6 max-xs:p-3 bg-blue-300 rounded-t-md md:rounded-b-[6vh] sm:rounded-b-[4vh] xs:rounded-b-[4vh] max-xs:rounded-b-[2vh] border-2 border-blue-400">
                        <p className="lg:text-3xl md:text-xl text-white rounded-xl py-2 px-0 mx-auto bg-orange-500 font-extrabold justify-items-center text-center border-white border-2 ">
                            Seleccioná una red social para armar tu plan personalizado
                        </p>
                </div>
            )}
            </div>

                {/* Mensaje debajo del formulario */}
                <div className="flex w-auto xs:justify-end max-xs:justify-center">
                    <p className="mt-4 text-md w-auto font-extrabold text-white bg-[#FB8A00] rounded-tl-full rounded-br-full justify-items-center text-end px-5 py-2">
                        Servicio de suscripción mensual
                    </p>
                </div>

            {/* Modal de advertencia */}
            {showWarningModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-lg font-bold">Advertencia</h2>
                        <p>{modalMessage}</p>
                        <button onClick={handleCloseWarningModal} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de éxito */}
            {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-green-500 p-5 rounded shadow-lg">
                        <h2 className="text-lg font-bold text-white">Éxito</h2>
                        <p className="text-white">{modalMessage}</p>
                        <button onClick={handleCloseSuccessModal} className="mt-4 bg-white text-green-500 px-4 py-2 rounded">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Tooltip */}
            {tooltip.visible && (
                <div className="absolute bg-gray-700 text-white text-sm px-2 py-1 rounded max-w-2xl" style={{ top: tooltip.y, left: tooltip.x }}>
                    {tooltip.content}
                </div>
            )}
            
        </div>
    );
}
