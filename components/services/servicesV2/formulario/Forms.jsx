import React, { useState } from "react";

// Componente principal del formulario personalizado
export default function Formulario() {

  // Estado inicial de los ítems del formulario con valores predeterminados
  const [items, setItems] = useState([
    {
      detalle: "Cantidad de posteos e historias básicas", // Descripción del ítem
      cantidad: 0, // Cantidad seleccionada (inicialmente 0)
      valor: 1000, // Precio por unidad
      info: "Descripción del primer item.", // Descripción para el tooltip
    },
    {
      detalle: "Cantidad de historias tamaño completo",
      cantidad: 0,
      valor: 1000,
      info: "Descripción del segundo item.",
    },
    {
      detalle: "Cantidad de carruseles",
      cantidad: 0,
      valor: 3000,
      info: "Publicaciones con múltiples imágenes deslizables.",
      max: 5, // Máximo permitido para este ítem
    },
    {
      detalle: "Cantidad de imágenes para el carrusel",
      cantidad: 0,
      valor: 500,
      info: "Imágenes adicionales para los carruseles seleccionados.",
      max: 20,
    },
    {
      detalle: "Idea, guión y edición de videos",
      cantidad: 0,
      valor: 5000,
      info: "Creación completa de contenido de video profesional.",
    },
    {
      detalle: "¿Deseas agregar efemérides?", // Descripción del ítem con interruptor
      cantidad: 0,//Cantidad inicial
      valor: 3000, // Inicialmente 0 porque depende del interruptor
      info: "Publicaciones conmemorativas de fechas importantes.",
    },
    {
      detalle: "Cantidad de días para publicidad Meta",
      cantidad: 0,
      valor: 2000,
      info: "Días de promoción pagada en plataformas de Meta.",
    },
    {
      detalle: "Presupuesto por día para publicidad Meta",
      cantidad: 0,
      valor: 1000,
      info: "Monto asignado diariamente para publicidad en Meta.",
    },
  ]);

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
    efemerides: false, // Estado del interruptor de efemérides
  });

  // Maneja el cambio de estado de los interruptores
  const handleToggleChange = (e) => {
    const { name, checked } = e.target; // Detecta qué interruptor cambió
    setFormData({ ...formData, [name]: checked }); // Actualiza el estado del interruptor

    // Si es efemérides, cambia su valor en el array de ítems
    if (name === "efemerides") {
      const newItems = [...items];
      newItems[5].valor = checked ? 3000 : 0; // Asigna valor si está activado
      setItems(newItems); // Actualiza el estado de los ítems
    }

    const socialNetwork = e.target.name;
  if (socialNetwork === 'facebook' || socialNetwork === 'instagram') {
    setSelectedSocialNetwork(socialNetwork);
  }
  };

  // Incrementa la cantidad de un ítem seleccionado
  const handleIncrement = (index) => {
    const newItems = [...items];

    // Si es el ítem de carruseles, valida el límite máximo
    if (index === 2 && newItems[2].cantidad >= newItems[2].max) {
      alert("Has alcanzado el máximo número de carruseles permitidos.");
      return;
    }

    // Incrementa cantidad y actualiza otras dependencias
    if (index === 2) {
      newItems[2].cantidad += 1;
      newItems[3].cantidad += 3; // Incrementa las imágenes automáticamente
    } else if (index === 3) {
      const maxImages = items[2].cantidad * 20; // Calcula el máximo de imágenes
      if (newItems[3].cantidad < maxImages) {
        newItems[3].cantidad += 1;
      }
    } else if (index === 6) {
      if (newItems[6].cantidad === 0) {
        newItems[6].cantidad = 3;
      } else if (newItems[6].cantidad < 30) {
        newItems[6].cantidad += 1;
      }
    } else {
      newItems[index].cantidad += 1; // Incrementa la cantidad normal
    }

    setItems(newItems); // Actualiza el estado con la nueva cantidad
  };

  // Decrementa la cantidad de un ítem seleccionado
  const handleDecrement = (index) => {
    const newItems = [...items];

    // Decrementa la cantidad de carruseles y ajusta imágenes asociadas
    if (index === 2) {
      if (newItems[2].cantidad > 0) {
        newItems[2].cantidad -= 1;
        newItems[3].cantidad = Math.max(
          newItems[3].cantidad - 3,
          newItems[2].cantidad * 3
        );
      }
      if (newItems[2].cantidad === 0) {
        newItems[3].cantidad = 0; // Si no hay carruseles, no hay imágenes
      }
    } else if (index === 3) {
      if (newItems[3].cantidad > newItems[2].cantidad * 3) {
        newItems[3].cantidad -= 1;
      }
    } else if (index === 6) {
      if (newItems[6].cantidad > 3) {
        newItems[6].cantidad -= 1;
      } else if (newItems[6].cantidad === 3) {
        newItems[6].cantidad = 0; // Asegura un mínimo de días de publicidad
      }
    } else {
      if (newItems[index].cantidad > 0) {
        newItems[index].cantidad -= 1; // Decrementa normalmente
      }
    }

    setItems(newItems); // Actualiza el estado con la nueva cantidad
  };

  // Calcula el valor total sumando el costo de cada ítem
  const calcularValorTotal = () => {
    return items.reduce((total, item) => total + item.cantidad * item.valor, 0);
  };

  // Restablece todos los campos del formulario
  const limpiarFormulario = () => {
    // Resetea los valores del formulario y los ítems
    setFormData({
      facebook: false,
      instagram: false,
      tiktok: false,
      efemerides: false,
    });
    const itemsReseteados = items.map((item) => ({
      ...item,
      cantidad: 0, // Restablece las cantidades a 0
      valor: item.detalle === "¿Deseas agregar efemérides?" ? 0 : item.valor, // Restablece efemérides a 0
    }));
    setItems(itemsReseteados); // Actualiza el estado
  };

  const [item7Value, setItem7Value] = useState(0);

  const handleItem8Change = (value) => {
    setItem7Value(value);
  };

  // Valida que al menos una red social y un servicio estén seleccionados
  const validarFormulario = () => {
    // Validar si hay al menos una red social seleccionada
    if (!formData.facebook && !formData.instagram && !formData.tiktok) {
      alert("Por favor selecciona al menos una red social.");
      return false;
    }
    // Validar si se seleccionó al menos un servicio
    const alMenosUnServicio = items.some((item) => item.cantidad > 0);
    if (!alMenosUnServicio) {
      alert("Por favor selecciona al menos un servicio.");
      return false;
    }
    // Validación de carruseles
    if (items[2].cantidad > items[2].max) {
      alert("Has alcanzado el máximo número de carruseles permitidos.");
      return false;
    }

    // Validación de imágenes
    if (items[3].cantidad > items[2].cantidad * 20) {
      alert("Has alcanzado el máximo número de imágenes permitidos.");
      return false;
    }
    {/*
    // Validación de días de publicidad
    if (items[6].cantidad < 3) {
      alert("Por favor selecciona al menos 3 días de publicidad.");
      return false;
    }

    // Validación del presupuesto de publicidad
    if (items[7].cantidad <= 0) {
      alert("Por favor especifica un presupuesto para publicidad.");
      return false;
    }
  */}

    return true; // Si todo está correcto, el formulario es válido
  };

  const [selectedSocialNetwork, setSelectedSocialNetwork] = useState(null);

const handleSocialNetworkChange = (socialNetwork) => {
  setSelectedSocialNetwork(socialNetwork);
};

const isMetaSocialNetwork = selectedSocialNetwork === 'Facebook' || selectedSocialNetwork === 'Instagram';


  // Maneja el envío del formulario
  const handleSubmit = () => {
    if (validarFormulario()) {
      alert("Formulario enviado con éxito.");
    }
  };

  return (
    <section className="py-6 px-16 bg-[#FFFFFF] relative">
      {/* Encabezado del formulario */}
      <div className="text-center mb-8 mt-0">
        <span className="bg-[#FB8A00] text-white font-bold py-[11px] px-[38px] rounded-medium border rounded-tl-xl rounded-br-xl text-center items-center justify-center text-3xl">
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
      <div className="flex space-x-4 mb-4 justify-center items-center border-t-2 border-t-blue-500 bg-[#0853FC] text-white p-2 rounded-t-full">
        {/* Interruptor de Facebook */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="facebook"
            checked={formData.facebook}
            onChange={handleToggleChange}
            className="hidden"
          />
          <span
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
              formData.facebook ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                formData.facebook ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </span>
          <span>Facebook</span>
        </label>

        {/* Interruptor de Instagram */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="instagram"
            checked={formData.instagram}
            onChange={handleToggleChange}
            className="hidden"
          />
          <span
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
              formData.instagram ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                formData.instagram ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </span>
          <span>Instagram</span>
        </label>

        {/* Interruptor de TikTok */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="tiktok"
            checked={formData.tiktok}
            onChange={handleToggleChange}
            className="hidden"
          />
          <span
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
              formData.tiktok ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                formData.tiktok ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </span>
          <span>TikTok</span>
        </label>
      </div>

      {/* Encabezados de columnas */}
      <div className="grid grid-cols-3 mb-2">
        <h3 className="font-bold text-sm text-center">Detalle</h3>
        <h3 className="font-bold text-sm text-center">Cantidad</h3>
        <h3 className="font-bold text-sm text-center">Valor</h3>
      </div>

      {/* Línea horizontal continua debajo de los encabezados */}
      <hr className="border-2 border-black mb-4" />

      {/* Formulario con columnas y líneas continuas para cada ítem */}
      {items.map((item, index) => (
        <div key={index}>
          <div className="grid grid-cols-3 items-center mb-2">
            <div
              className="text-black-900 text-sm text-center font-bold flex-col"
              onMouseOver={(e) => handleMouseOver(e, item.info)}
              onMouseOut={handleMouseOut}
            >
              {item.detalle}
            </div>
            {/* Condición para el interruptor de efemérides */}
            {item.detalle === "¿Deseas agregar efemérides?" ? (
              <label className="flex items-center justify-center space-x-2">
                <input
                  type="checkbox"
                  name="efemerides"
                  checked={formData.efemerides}
                  onChange={handleToggleChange}
                  className="hidden"
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
            ) : (
              <div className="flex justify-center items-center">
                <span className="bg-white text-black px-3 py-0.5 border-2 border-orange-500 rounded text-sm">
                  {item.cantidad}
                </span>
                <div className="flex flex-col ml-2">
                  <button
                    onClick={() => handleIncrement(index)}
                    className="bg-gray-300 text-black px-1 py-0.1 text-xs rounded-t"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDecrement(index)}
                    className="bg-gray-300 text-black px-1 py-0.1 text-xs rounded-b"
                  >
                    -
                  </button>
                </div>
              </div>
            )}
            <div className="text-sm text-center">
              ${item.cantidad * item.valor}
            </div>
          </div>

         {/* No more horizontal lines between items 3 and 4, and 6 and 7 */}
          {index !== 2 && index !== 6 && <hr className="border-2 border-black mb-2" />}
        </div>
      ))}
      

      {/* Valor total y resultado */}

      <div className="flex items-center mt-4 justify-end">
        <h3 className="font-extrabold text-lg uppercase mr-4">Valor Total:</h3>
        <span className="font-extrabold text-lg border-2 border-orange-500 pr-2 py-1 rounded text-center">
          ${calcularValorTotal()}
        </span>
      </div>


      {/* Botón de enviar */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white text-1xl px-[95px] py-1 rounded-medium border rounded-tl-xl rounded-br-xl font-lg"
        >
          CONTRATAR
        </button>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute bg-gray-700 text-white text-sm px-2 py-1 rounded"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.content}
        </div>
      )}
    </section>
  );
}
