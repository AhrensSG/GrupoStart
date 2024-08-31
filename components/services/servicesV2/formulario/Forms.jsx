import React, { useState } from "react";

export default function Formulario() {
  const [items, setItems] = useState([
    {
      detalle: "Cantidad de posteos e historias básicas",
      cantidad: 0,
      valor: 1000,
      info: "Descripción del primer item.",
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
    },
    {
      detalle: "Cantidad de imágenes para el carrusel",
      cantidad: 0,
      valor: 500,
      info: "Imágenes adicionales para los carruseles seleccionados.",
    },
    {
      detalle: "Idea, guión y edición de videos",
      cantidad: 0,
      valor: 5000,
      info: "Creación completa de contenido de video profesional.",
    },
    {
      detalle: "Agregar cantidad de efemérides",
      cantidad: 0,
      valor: 800,
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

  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  const handleMouseOver = (event, info) => {
    const x = event.clientX + 10;
    const y = event.clientY + 10;
    setTooltip({ visible: true, content: info, x, y });
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, content: "", x: 0, y: 0 });
  };

  const [formData, setFormData] = useState({
    facebook: false,
    instagram: false,
    tiktok: false,
  });

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleIncrement = (index) => {
    const newItems = [...items];

    if (index === 2) {
      newItems[2].cantidad += 1;
      newItems[3].cantidad += 3;
    } else if (index === 3) {
      const maxImages = items[2].cantidad * 20;
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
      newItems[index].cantidad += 1;
    }

    setItems(newItems);
  };

  const handleDecrement = (index) => {
    const newItems = [...items];

    if (index === 2) {
      if (newItems[2].cantidad > 0) {
        newItems[2].cantidad -= 1;
        newItems[3].cantidad = Math.max(
          newItems[3].cantidad - 3,
          newItems[2].cantidad * 3
        );
      }
      if (newItems[2].cantidad === 0) {
        newItems[3].cantidad = 0;
      }
    } else if (index === 3) {
      if (newItems[3].cantidad > newItems[2].cantidad * 3) {
        newItems[3].cantidad -= 1;
      }
    } else if (index === 6) {
      if (newItems[6].cantidad > 3) {
        newItems[6].cantidad -= 1;
      } else if (newItems[6].cantidad === 3) {
        newItems[6].cantidad = 0;
      }
    } else {
      if (newItems[index].cantidad > 0) {
        newItems[index].cantidad -= 1;
      }
    }

    setItems(newItems);
  };

  const calcularValorTotal = () => {
    return items.reduce((total, item) => total + item.cantidad * item.valor, 0);
  };

  return (
    <section className="py-6 px-16 bg-[#FFFFFF] relative">
      <div className="text-center mb-8 mt-0">
        <span className="bg-[#FB8A00] text-white font-bold py-[11px] px-[38px] rounded-medium border rounded-tl-xl rounded-br-xl text-center items-center justify-center text-3xl">
          Plan Personalizado
        </span>
      </div>
      <div className="text-center justify-center items-center py-[5px]">
        <span className="text-center justify-center items-center text-md py-[26px] ">
          Elegí todo lo que quieras para tus redes sin límites para lograr el
          éxito!
        </span>
      </div>
      {/* Interruptores de redes sociales */}
      <div className="flex space-x-4 mb-4 justify-center items-center border-t-2 border-t-blue-500 bg-[#0853FC] text-white p-2 rounded-t-full">
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
              className="text-black-900 text-sm text-center"
              onMouseOver={(e) => handleMouseOver(e, item.info)}
              onMouseOut={handleMouseOut}
            >
              {item.detalle}
            </div>
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
            <div className="text-sm text-center">
              ${item.cantidad * item.valor}
            </div>
          </div>

          {/* Línea horizontal continua debajo de cada ítem */}
          <hr className="border-2 border-black mb-2" />
        </div>
      ))}

      {/* Valor total y resultado */}

      <div className="flex items-center mt-4 justify-end">
        <h3 className="font-extrabold text-lg uppercase mr-4">Valor Total:</h3>
        <span className="font-extrabold text-lg border-2 border-orange-500 pr-2 py-1 rounded text-center">
          ${calcularValorTotal()}
        </span>
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-600 text-white text-1xl px-[95px] py-1 rounded-medium border rounded-tl-xl rounded-br-xl font-lg">
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