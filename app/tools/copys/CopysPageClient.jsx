"use client"

import { useState } from "react"
import { MessageCircle, Brain, Heart, Zap, Calendar, AlertCircle, TrendingUp, ChevronDown } from "lucide-react"
import Link from "next/link"

const timelineData = [
  { classification: "Interesado", reason: "Tiene el deseo, pero la lógica aún lo hace dudar.", followUp: "Día del primer contacto + 5 días hábiles", icon: "message" },
  { classification: "Potencial cliente", reason: "Está casi convencido, alta emoción, necesita un empujón final.", followUp: "Día del primer contacto + 1 día hábil", icon: "trending" },
  { classification: "No interesado: razones económicas", reason: "El dolor de gastar es mayor que el valor que percibe.", followUp: "Día del primer contacto + 60 días hábiles", icon: "alert" },
  { classification: "No interesado: tiene una mejor oferta", reason: "Eligió a otro. Está justificando su decisión.", followUp: "Día del primer contacto + 3 días hábiles", icon: "alert" },
  { classification: "No interesado: no es lo que buscaba", reason: "Nuestra propuesta no hizo clic con lo que él imaginaba.", followUp: "Día del primer contacto + 30 días hábiles", icon: "alert" },
  { classification: "No interesado: otras razones", reason: "Dudas ocultas, cansancio o mal momento.", followUp: "Día del primer contacto + 45 días hábiles", icon: "alert" },
  { classification: "No hubo respuesta", reason: "No captamos su atención; el instinto filtró el mensaje.", followUp: "Día del primer contacto + 20 días hábiles", icon: "calendar" },
]

const strategiesData = [
  { id: 2, category: "Interesado", title: "Contacto 2", subtitle: "Seguimiento", whatHappened: "Probablemente se bloqueó por recibir demasiada información. Su lado lógico se paralizó al tener que pensar tanto. Necesita que le hagamos la vida fácil con un resumen rápido y directo de cómo ganará valor, sin presionarlo para que compre ya mismo.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto], ¿cómo estás? Hace unos días charlamos sobre [retomar lo conversado anteriormente] y se me ocurrió que puede interesarte esta alternativa [Dar una oferta alternativa mejorando tiempo de entrega, precio o ambas] creo que es excelente para vos ¿qué pensas?"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 3, category: "Interesado", title: "Contacto 3", subtitle: "Cierre", whatHappened: "Su instinto de supervivencia aún ve tu oferta como un riesgo porque es algo nuevo. Para romper este miedo, usamos la \"Prueba Social\": cuando no estamos seguros de algo, nos relaja saber que a otros les funcionó bien.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"¡Hola [Nombre del prospecto]! Estaba revisando mensajes hoy y me acordé de vos. Tuvimos un cliente que [Mencionar el problema]. Y solucionamos ese problema [mencionar cómo se resolvió] se hizo rápido y fácil. Fue una compra inteligente y terminó super contento, creo que esta solución también se aplicaría a vos. ¿te gustaría probar?"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 4, category: "Interesado", title: "Contacto 4", subtitle: "Último intento", whatHappened: "Entró en la comodidad de no hacer nada. Como no ve que vaya a perder algo si retrasa la decisión, lo deja para después. Tenemos que despertar un sentido de urgencia real para que vea que esperar le hace perder una oportunidad de valor.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto], ¡espero que estés teniendo un bonito día! Te escribo rapidito para avisarte que los cupos/el stock para [Producto/Servicio] se cierran hoy. Como mostraste bastante interés antes, quise darte prioridad antes de mostrarlo a nuevas personas. Si todavía te interesa, este es el momento ideal para avanzar. ¿Te anoto?"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 5, category: "Interesado", title: "Contacto 5", subtitle: "Reactivación", whatHappened: "Ya llegamos al límite de los 5 impactos. Si insistimos, nos volveremos ruido molesto. Aquí usamos \"psicología inversa\": al retirarle amablemente la oferta, hacemos que sienta que se le escapa, lo cual muchas veces reactiva sus ganas de tenerla.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Como no tuvimos más novedades tuyas, asumo que solucionar [Problema principal] ya no es tu prioridad ahora mismo o que encontraste otra ruta. Voy a cerrar tu expediente temporalmente para no llenarte el WhatsApp de mensajes. Si más adelante decides ir por ese [Gran beneficio], acá tenés las puertas abiertas. ¡Muchos éxitos!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 7, category: "Potencial Cliente", title: "Contacto 2", subtitle: "Seguimiento", whatHappened: "El cliente ya lo quiere, pero un pequeño detalle logístico (una duda sobre el pago, entrega o implementación) lo frenó de golpe. Solo hay que limpiar el camino de forma muy suave y servicial.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto], creo que ayer nos entendimos super bien, quise hablarte para estar seguro de que no haya quedado alguna duda importante sobre [Mencionar tiempos de entrega, formas de pago, garantías]? Mi idea es que todo te resulte súper fluido y seguro."\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 8, category: "Potencial Cliente", title: "Contacto 3", subtitle: "Cierre", whatHappened: "Emocionalmente lo desea, pero necesita números y datos reales para justificar la decisión ante sí mismo o ante un socio. Necesitamos darle un argumento lógico sólido que resalte el gran valor que obtendrá.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"¡Hola [Nombre del prospecto]! estaría encantado de tenerte como cliente por eso te quiero contar que [Producto/servicio] a diferencia de otros similares [destacar una ventaja del producto o servicio] y se que se puede ajustar bien a lo que necesitas. Es una compra estratégica de la que no te vas a arrepentir. ¿Te parece bien si agendamos hoy?"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 12, category: "Potencial Cliente", title: "Contacto 4", subtitle: "Último intento", whatHappened: "Pasaron los días y se enfrió. En vez de presionarlo cobrándole la respuesta, usamos la regla de la reciprocidad: le regalamos algo de valor (un artículo, un tip, un cupón de descuento) para reactivar la afinidad sin pedirle nada a cambio.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Leyendo un poco hoy, me crucé con este [artículo/guía/tip] sobre [Tema del cliente] y pensé directamente en vos. Creo que te va a servir un montón, míralo cuando tengas tiempo y luego me contas."\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 13, category: "Potencial Cliente", title: "Contacto 5", subtitle: "Reactivación", whatHappened: "Su situación cambió o calculó mal sus tiempos, y se estancó. Es el quinto contacto, así que vamos a retirarle amablemente la oferta, haciéndole sentir que se le escapa.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Estamos agotando los últimos [cupos/stock] no se cuando volvamos a [abrir/tener más]. Se que probar [Producto/servicio] puede [mencionar un aspecto positivo que puede sentir con tu producto/servicio]. Sin embargo luego de hoy ya no te hablaremos, por respeto a tus tiempos, pero no quería dejar de intentar que pruebes [producto/servicio] sencillamente porque sé que es para vos."\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 10, category: "No Interesado: Razones Económicas", title: "Contacto 2", subtitle: "Seguimiento", whatHappened: "A la mente le duele gastar. Si el precio le pareció alto al principio, se asustó. A los 60 días su billetera pudo haberse recuperado. Debemos evaluar su nueva situación.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto], pasó un tiempito desde que hablamos, solo quería saludarte y preguntarte si pudiste resolver [Describir problema/ si es un producto se puede reemplazar el "pudiste resolver" por una oferta fugaz de bajo costo]"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 11, category: "No Interesado: Razones Económicas", title: "Contacto 3", subtitle: "Oferta", whatHappened: "Sigue necesitando una solución, pero en su cabeza sigue el recuerdo del precio \"caro\". Es momento de ofrecerle una versión más accesible (un plan menor, facilidades, una oferta fugaz de un producto + un regalo) para que pruebe el valor sin sentir dolor en el bolsillo.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"¡Hola [Nombre del prospecto]! Estuve dándole vueltas a lo que necesitabas y armé una alternativa a medida. [describir la propuesta] para que puedas disfrutar del beneficio de [Beneficio] con una inversión mínima e inteligente. ¿Qué te parece esta nueva opción?"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 14, category: "No Interesado: Razones Económicas", title: "Contacto 4", subtitle: "Último intento", whatHappened: "Sigue viendo la compra como un gasto y no como una inversión inteligente. Como a las personas nos duele más perder algo que ganar algo, debemos mostrarle sutilmente cuánto le está costando NO tener nuestro servicio.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\nServicios:\n\n"Hola [Nombre del prospecto]. Viendo estadísticas de negocios como el tuyo, notamos algo súper interesante: las marcas pierden casi [Dinero/Tiempo] por mes al no tener resuelto [Problema]. Muchas veces patear la decisión termina saliendo más caro en el día a día. Te dejo este dato porque creo que aporta valor si están armando números para los próximos meses."\n\nProductos:\n\n"Hola [Nombre del prospecto] ¿cómo estás? Pasó tiempo desde la última vez que hablamos, en [Nombre de la empresa] hoy estamos mucho más equipados que antes, tenemos un catálogo con muchas opciones que te puedo pasar si gustas, sin embargo creo que esta solución puede interesarte [describir el producto] con este producto vas a [describir beneficio, puede ser ahorro de tiempo, comfort, ahorrar "x" al año] el precio de lista es de [precio de lista] pero hoy para vos quiero dejartelo en [precio promocional para el cliente] ¿querés tomar la oportunidad antes de que se vaya?"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 15, category: "No Interesado: Razones Económicas", title: "Contacto 5", subtitle: "Reactivación", whatHappened: "Definitivamente tu producto está fuera de su liga económica actual. Seguir presionando lo va a irritar. Nos despedimos como expertos educados, dejando un buen recuerdo por si en el futuro su situación mejora.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Te agradezco un montón la sinceridad que tuvimos al hablar de presupuestos. Entiendo al 100% las realidades económicas. Voy a dejar de enviarte propuestas para no llenarte el chat, pero si el día de mañana la situación se acomoda y quieren darle un impulso inteligente a [Área], acá estará el equipo listo para sumar. ¡Un saludo grande!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 16, category: "No Interesado: Tiene una mejor oferta", title: "Contacto 2", subtitle: "Seguimiento", whatHappened: "Apenas días después de quizás haber elegido a tu competidor, podría empezar a dudar de su decisión si las cosas no son tan mágicas como le prometieron. Este contacto busca, sutilmente, posicionarnos como aliados por si su nueva elección falla.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\nServicios:\n\n"Hola [Nombre del prospecto]. Se que la última vez mencionaste que había una solución que se ajustaba mejor a lo que necesitabas, no podemos saber si ya lo tenes resuelto al 100%, pero queremos celebrar la decisión de mejorar [Área/Problema], más allá de con quien hacerlo. Solo te escribíamos para que sepas que estamos acá para lo que necesites, podes hacernos consultas sin compromiso ni costo y con gusto te ayudamos."\n\nProductos:\n\n"Hola [Nombre del prospecto]. Se que la última vez mencionaste que había una alternativa mejor, no pudimos aceptarlo, por eso te acercamos esta alternativa [describir oferta del producto] esta mucho mejor no? ¿Te interesaría probarla?"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 17, category: "No Interesado: Tiene una mejor oferta", title: "Contacto 3", subtitle: "Cierre", whatHappened: "Es posible que el competidor ofrezca lo básico, pero le falte un detalle clave que solo tú tienes. Con elegancia, le abrimos los ojos sobre esa ventaja única que nosotros aportamos y que la competencia suele omitir.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"¡Hola [Nombre del prospecto]! Deseando que estes super bien, quería compartirte un dato clave. Mucha gente nota que, superado el arranque básico, el verdadero problema suele ser [Mencionar algo que tú tienes y la competencia no, ej: el soporte inmediato / diseño de alto impacto]. Te paso el dato porque eso viene por defecto con nosotros, para que lo tengas presente a futuro."\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 18, category: "No Interesado: Tiene una mejor oferta", title: "Contacto 4", subtitle: "Último intento", whatHappened: "Puede que ya esté frustrado con su elección, pero su orgullo le impide admitir que se equivocó. Necesita ver que otros también cometieron ese error y lo solucionaron rápido para animarse a cambiar.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto], espero que todo marche de diez. Justo ayer se incorporó un cliente con un problema muy similar al tuyo, pasó 3 meses antes de que el acuerdo se de, este cliente intentó con otras soluciones pero nos comentó que no solucionó su problema real y eso nos hizo pensar en tu caso, no queremos perder el contacto contigo por eso te escribimos cada tanto ¡Esperamos estés muy bien! Saludos."\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 19, category: "No Interesado: Tiene una mejor oferta", title: "Contacto 5", subtitle: "Reactivación", whatHappened: "Está atado a su decisión (por contrato o porque está feliz de verdad). Si insistimos, nos verá como acosadores. Nos retiramos con clase para ser su plan B preferido en el futuro.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. ¡Esperamos que estes super bien! Lo pensamos y no queremos ser una molestía por eso vamos a frenar los mensajes para no molestar. Sin embargo, nos encantaría mantener un contacto puramente profesional, por si algún día necesitan una segunda opinión o deciden expandirse, cuentan con nosotros ¡Todo el éxito con los proyectos!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 20, category: "No Interesado: No es lo que buscaba", title: "Contacto 2", subtitle: "Seguimiento", whatHappened: "No logramos explicar bien por qué nuestro producto encajaba con su vida. Nos vimos \"desconectados\". Al mes, le pedimos feedback con humildad, lo cual baja todas sus defensas.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto] revisando chats ví nuestra conversación, la última vez nos dijiste que el producto no se ajustaba a lo que requerías, actualmente cambiamos muchas cosas en [nombre de la empresa] casi que me atrevo a decir que somos algo nuevo. Sabiendo que nuestra idea original no fue lo que esperabas, ¿te animarías a contarme brevemente qué detalle o función clave sentiste que nos faltó? Esa sinceridad me ayuda muchísimo a afinar nuestras propuestas a futuro. ¡Mil gracias por el tiempo!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 21, category: "No Interesado: No es lo que buscaba", title: "Contacto 3", subtitle: "Cierre", whatHappened: "Su forma de ver el problema es tan cerrada que no imagina cómo nuestra herramienta puede adaptarse a él. Necesitamos contarle una breve historia real para que visualice nuevas formas de usar nuestro servicio de manera muy inteligente.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"¡Hola [Nombre del prospecto]! Ya sé que sentías qué [Producto/Servicio] estaba medio lejos de lo que buscabas, pero quería contarte algo rápido. Un colega tuyo del sector pensaba igual, hasta que decidió usar nuestra herramienta de una forma súper distinta: solo para [Mencionar un uso muy específico y original]. La agilidad que ganó fue total, creemos que esa perspectiva puede aportarte una nueva forma de verlo ¿qué opinas?"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 22, category: "No Interesado: No es lo que buscaba", title: "Contacto 4", subtitle: "Último intento", whatHappened: "Sigue sin ver nuestra propuesta como útil para él. Necesitamos inspirarlo. Al compartirle información valiosa de su sector, nos ve como expertos con autoridad, no como simples vendedores.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Buen [día/tarde/noche] antes que nada no te escribo para ofrecerte nada, sino para pasarte un dato de valor. Armamos este [reporte/guía] cortito sobre las tendencias en [Tema clave de su sector]. Sabiendo que a los líderes les gusta estar un paso adelante, estoy seguro de que esta información les va a servir internamente. ¡Un abrazo!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 23, category: "No Interesado: No es lo que buscaba", title: "Contacto 5", subtitle: "Reactivación", whatHappened: "Definitivamente somos incompatibles en este momento. Aceptarlo sin enojo nos da puntos. Le avisamos que nos retiramos, pero dejamos la puerta abierta por si en el futuro sacamos justo lo que él necesitaba.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Mirando nuestra conversación, creemos que lo que ofrecemos hoy no encaja con lo que buscas. Voy a frenar el seguimiento para no llenarte de notificaciones. En [Nombre de empresa] estamos preparando innovaciones en [Nueva función futura] y quizás te puede interesar, en nuestras stories vas a tener novedades seguro ¡Sigamos en contacto por ahí! saludos"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 24, category: "No Interesado: Otras razones", title: "Contacto 2", subtitle: "Seguimiento", whatHappened: "Puede que te haya ignorado porque tenía un día malísimo, mucho estrés o distracciones. A los 45 días, usamos una técnica para \"romper el patrón\": le hablamos de algo totalmente distinto para que baje la guardia.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Pasó más de un mes desde que cruzamos mensajes. Me dio la sensación de que te agarré justo en una semana de locos y mucho trabajo. Dejando totalmente de lado lo de [Producto/Servicio], solo pasaba a saludarte y desearte que los objetivos para este mes se estén cumpliendo de diez. ¡Un abrazo a la distancia!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 25, category: "No Interesado: Otras razones", title: "Contacto 3", subtitle: "Cierre", whatHappened: "Tal vez desconfía mucho de los vendedores por internet. Cree que todos quieren sacarle dinero. Para desarmar eso, hay que darle un regalo útil y sin condiciones para generar gratitud natural.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\nServicios:\n\n"¡Hola [Nombre del prospecto]! Hoy me crucé con este material y fue inevitable acordarme de vos. Te comparto esta [Plantilla / Excel / Lista de ideas] que usamos internamente y que alivia un montón la carga a la hora de armar [Tarea pesada]. Te la paso así, directo, sin registros ni nada. ¡Ojalá te sirva para trabajar más relajado! Un abrazo."\n\nProductos:\n\n"¡Hola [Nombre del prospecto]! Solo pasábamos por acá para saludarte y aprovechar a mostrarte esta novedad [descripción de la novedad] por su lanzamiento se encuentra con un descuento del [descuento%] y queríamos que seas el primero en saberlo ¡Que tengas una linda tarde!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 26, category: "No Interesado: Otras razones", title: "Contacto 4", subtitle: "Último intento", whatHappened: "Simplemente olvidó qué era lo que hacíamos o no lo vio como algo de alto valor percibido. Necesitamos contarle que mejoramos mucho desde la última vez que hablamos, dándole estatus a la propuesta.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\nServicios:\n\n"Hola [Nombre del prospecto]. Te paso una actualización rapidísima. Hace poco sumamos una mejora enorme en [Nueva función premium] que hace que las marcas logren [Beneficio brutal] en la mitad de tiempo. Sé que antes no cuadraban las cosas, pero ahora el panorama cambió por completo y el valor es altísimo. ¿Te muestro cómo funciona en 5 minutitos?"\n\nProductos:\n\n"Hola [Nombre del prospecto] aún no te tenemos de cliente y el desafío de lograrlo nos motiva, sin ser molestos quiero comentarte que [producto] [describir un beneficio aplicable de forma directa en la vida real, un descuento o una promoción asociada] y sabemos que puede serte de gran valor, no queríamos terminar el día sin comentartelo ¡Que tengas linda tarde!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 27, category: "No Interesado: Otras razones", title: "Contacto 5", subtitle: "Reactivación", whatHappened: "Sigue cerrado. Llegamos al contacto cinco. Se retira la oferta con dignidad, dejándole claro que nosotros somos quienes cerramos la conversación, lo que lo libera de la tensión de rechazar.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Aunque nos apena concluimos que lo mejor es despedirnos por ahora. Aunque no hayamos llegado a nada, en [nombre de la empresa] consideramos que al menos formamos un lazo y aportamos un poquito para que sepas de nosotros y nuestras soluciones. Fue un gusto compartir ideas y mi línea queda abierta para el futuro. ¡Muchos éxitos en lo que viene!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 28, category: "No hubo respuesta", title: "Contacto 2", subtitle: "Seguimiento", whatHappened: "El mensaje se perdió entre el bombardeo de notificaciones y ni lo registró. Está en \"ceguera publicitaria\". No lo juzgues por no contestar, dale una salida fácil para quitarle la culpa.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto], hace unas semanas iniciamos una conversación que no continuó, sabemos lo agitados que son los días cuando uno está a mil y es muy probable que te escribiera en el peor momento del día, hoy quiero mostrarte algo diferente en [nombre de empresa] tenemos esta novedad [describir novedad] y pensé que podría interesarte ¿qué opinas?"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 29, category: "No hubo respuesta", title: "Contacto 3", subtitle: "Cierre", whatHappened: "Puede ser que tu solución no es su prioridad en este momento, queremos lograr familiaridad antes de pensar en vender, por eso le escribimos un mensaje que le haga saber que seguimos en el mapa.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"¡Hola [Nombre del prospecto]! esperamos que tengas una linda tarde, pensamos que esta novedad podría llamar tu atención [describir la novedad] aún no la publicamos y hay [muy pocos cupos/ muy pocas unidades] y queremos mostrartela antes que a nadie con un descuento promocional de [porcentaje de descuento %] Para ser super breves contestanos solo con un "1" o "2" si te gustaría saber más:\n\n1- Me interesa, cuéntenme más\n2 - No por ahora, pero quizás más adelante."\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 30, category: "No hubo respuesta", title: "Contacto 4", subtitle: "Último intento", whatHappened: "Piensa que cada vez que le escribes es para sacarle dinero. Para derrumbar esa idea de \"es otro vendedor más\", regálale algo valioso sin exigir nada.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Hoy no hay novedades ni ofertas, solo pasamos a saludarte y dejarte un regalito. Liberamos este [Informe/Checklist/Guía] pensado para resolver [Gran problema de su sector]. Muchos líderes lo están aprovechando así que me pareció clave que lo tuvieras gratis y a mano. Te dejo el link directo. ¡Que te sea de muchísimo provecho!"\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
  { id: 31, category: "No hubo respuesta", title: "Contacto 5", subtitle: "Reactivación", whatHappened: "Este es el último intento y se basa en hacerle ver que nos retiramos y sacamos su nombre de nuestra lista. Quitamos la presión por completo.", psychologicalReason: "", suggestion: 'Sugerimos volver a hablarle con un mensaje como este:\n\n"Hola [Nombre del prospecto]. Este será mi último contacto por acá. Al no tener tu feedback, entiendo lógicamente que [Producto/servicio] no es una prioridad por ahora. Nos retiramos haciéndote saber que fue un placer aportarte novedades y que ojalá más adelante hagamos algo, un abrazo."\n\nSi este copy no se adapta a tu producto/servicio utilízalo de inspiración para crear uno adaptado a tu producto/servicio.' },
]

const categoryIcons = {
  "Interesado": <MessageCircle className="w-5 h-5" />,
  "Potencial Cliente": <TrendingUp className="w-5 h-5" />,
  "No Interesado: Razones Económicas": <AlertCircle className="w-5 h-5" />,
  "No Interesado: Tiene una mejor oferta": <AlertCircle className="w-5 h-5" />,
  "No Interesado: No es lo que buscaba": <AlertCircle className="w-5 h-5" />,
  "No Interesado: Otras razones": <AlertCircle className="w-5 h-5" />,
  "No hubo respuesta": <Calendar className="w-5 h-5" />,
}

function TimelineIcon({ icon }) {
  const cls = "w-5 h-5"
  switch (icon) {
    case "message": return <MessageCircle className={cls} />
    case "trending": return <TrendingUp className={cls} />
    case "alert": return <AlertCircle className={cls} />
    case "calendar": return <Calendar className={cls} />
    default: return <Calendar className={cls} />
  }
}

export default function CopysPageClient() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/tools" className="text-sm text-gray-400 hover:text-gray-600">← Volver</Link>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg text-gray-900">Guía de manejo de objeciones</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-16">
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex justify-center">
              <div className="space-y-6 max-w-3xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Dominá la Psicología de las Ventas por{" "}
                  <span className="text-blue-600">WhatsApp</span>
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed">
                  El proceso de ventas por WhatsApp ha dejado de ser un simple intercambio de mensajes para convertirse en una forma de conectar con la mente de nuestros clientes. Para vender más, no basta con dar argumentos lógicos; la ciencia nos ha demostrado que el 95% de nuestras decisiones de compra nacen de las emociones y el instinto subconsciente. Solo usamos la lógica después, para justificar lo que ya decidimos sentir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro - 3 Brains */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                La Psicología de la Venta en Términos Simples
              </h2>
              <p className="text-lg text-gray-500">
                Para entender por qué un cliente duda, imagina que su cerebro tiene tres "capas" trabajando al mismo tiempo:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Zap className="w-6 h-6" />, title: "El Cerebro Instintivo (Reptiliano)", desc: "Es el guardián. Su trabajo es evitar riesgos, ahorrar energía y mantener al cliente a salvo. Si ve algo desconocido o complicado, dice \"no\" inmediatamente.", color: "blue" },
                { icon: <Heart className="w-6 h-6" />, title: "El Cerebro Emocional (Límbico)", desc: "Es el que siente. Busca pertenecer, emocionarse y conectar. Aquí es donde nace el deseo de comprar tu producto.", color: "orange" },
                { icon: <Brain className="w-6 h-6" />, title: "El Cerebro Lógico (Neocórtex)", desc: "Es el analista. Compara precios, lee las características técnicas y busca justificaciones.", color: "blue" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
                  <div className={`w-12 h-12 rounded-lg ${item.color === "blue" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-500"} flex items-center justify-center mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-2xl p-8 text-center">
              <p className="text-lg text-gray-900">
                Para cerrar una venta, primero debemos relajar al guardián (instinto), enamorar al emocional y, por último, darle los datos al analista lógico. <span className="font-bold">Si no hay confianza, el instinto bloquea la compra.</span> Y la confianza no se logra en un solo mensaje, se construye poco a poco.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-2xl p-8">
                <h3 className="font-bold text-xl text-gray-900 mb-4">El Viaje del Cliente y el "Efecto de Mera Exposición"</h3>
                <p className="text-gray-700 mb-4">
                  El Mapeo del Viaje del Cliente es simplemente entender el camino que recorre una persona desde que descubre que tiene un problema hasta que te compra. Durante este viaje, el cliente necesita que le hablemos de ventajas prácticas, transformando datos técnicos aburridos en beneficios que mejoren su vida real.
                </p>
                <p className="text-gray-700">
                  Aquí entra en juego un concepto vital: el <strong>Efecto de Mera Exposición</strong>. Este principio psicológico explica que las personas preferimos las cosas simplemente porque nos resultan familiares. Al principio, un prospecto ve tu oferta como algo nuevo y "riesgoso". Pero si te mantienes en contacto de forma constante, lo desconocido se vuelve familiar. La familiaridad genera comodidad mental, y esa comodidad se transforma en confianza.
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-2xl p-8">
                <h3 className="font-bold text-xl text-gray-900 mb-4">La Regla de Oro: El punto óptimo de 3 a 5 contactos</h3>
                <p className="text-gray-700 mb-4">
                  ¿Cuántas veces debemos escribirle a alguien antes de rendirnos o antes de volvernos una molestia? La <strong>"Teoría de los Tres Impactos" de Herbert Krugman</strong> nos da la respuesta:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                  <li><strong>Impacto 1 (Curiosidad):</strong> El cliente se pregunta "¿Qué es esto?".</li>
                  <li><strong>Impacto 2 (Relevancia):</strong> El cliente piensa "¿Esto me sirve a mí? ¿Es una compra inteligente?".</li>
                  <li><strong>Impacto 3 (Decisión):</strong> El cliente ya tiene la información procesada y toma una postura.</li>
                </ul>
                <p className="text-gray-700">
                  Estudios posteriores (Pechmann & Stewart) demostraron que el punto dulce para vender está entre <strong>3 y 5 contactos</strong>. En este rango, logramos vencer las dudas iniciales. Sin embargo, si superas los 5 contactos con el mismo mensaje, generas desgaste. El cliente se aburre, se siente invadido (especialmente en WhatsApp) y te bloquea o ignora. Por eso, cada seguimiento debe ser diferente y respetar ciertos tiempos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cronograma Estratégico de Seguimiento
              </h2>
              <p className="text-lg text-gray-500">
                La regla de oro: 3 a 5 contactos es el punto dulce. Acá te mostramos cuándo volver a hablarle según la clasificación del lead.
              </p>
            </div>
            <div className="space-y-4">
              {timelineData.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mt-1 shrink-0">
                      <TimelineIcon icon={item.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{item.classification}</h3>
                      <p className="text-gray-500 mb-3">{item.reason}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                        <Calendar className="w-4 h-4" />
                        {item.followUp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notas importantes */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-2xl p-8 md:p-10">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Notas importantes</h3>
              <div className="space-y-6 text-gray-700">
                <div className="flex gap-4">
                  <span className="font-bold text-blue-600 shrink-0 mt-0.5">1 -</span>
                  <p>Denominamos "Lead" o "prospecto" a aquel contacto que llegó tu canal de ventas preguntando por algo relacionado a tu oferta, a partir de la interacción contigo decidirás cómo clasificarlo, ello va a determinar el viaje que tendrá junto a tu marca ya que existe una manera concreta de contactar a cada lead según su grado de interés.</p>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-blue-600 shrink-0 mt-0.5">2 -</span>
                  <p>Los mensajes pueden o no ajustarse a tu producto/servicio la idea es que tengas una base para no quedarte con la mente en blanco al realizar los contactos, adapta el mensaje a tu producto/servicio usando los fundamentos y los mensajes ejemplo como inspiración.</p>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-blue-600 shrink-0 mt-0.5">3 -</span>
                  <div>
                    <p className="mb-2">No todos los mensajes deben realizarse en formato texto, te sugerimos variar formatos para lograr mayor dinamismo, el dinamismo mantiene al cerebro en constante sensación de novedad y mejora tus posibilidades de éxito, puedes realizar los contactos en:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Formato texto</li>
                      <li>Audio</li>
                      <li>Video corto</li>
                      <li>Imagen</li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-blue-600 shrink-0 mt-0.5">4 -</span>
                  <p>Comenzar el viaje de contactos con tus prospectos tiene como objetivo lograr familiaridad, la familiaridad como explicamos antes genera confianza, la confianza genera "consideración" y la consideración es la primer etapa de ventas, los disparadores son una parte fundamental del éxito, pero poseer una estrategía de ventas que contemple "la psicología de ventas" explicada al principio, seduzca y baje objeciones es lo que verdaderamente termina cerrando ventas, no descuides tu estrategía, tómate el tiempo de hacerlo bien para que tu tasa de cierre supere a toda tu competencia.</p>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-blue-600 shrink-0 mt-0.5">5 -</span>
                  <p>Cuida a tus prospectos, se amable, respeta sus tiempos y sus decisiones. No todos los casos son salvables, a continuación damos consejos de re-contacto para las clasificaciones que sí consideramos salvables, pero de momento que el prospecto te manifieste que ya no desea que el contacto continue respetalo para evitar fricciones, el éxito viene de la mano del método, en el camino te encontrarás con resultados maravillosos y quizás algunos pocos malos, si alguna interacción resulta "mala" no te enfoques en ella (tendemos a hacerlo) te sugerimos mirar en cambió todo lo bueno que si logra la constancia</p>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-blue-600 shrink-0 mt-0.5">6 -</span>
                  <p>Te deseamos el mayor de los éxitos, cuando entendemos que vender es ayudar, el enfoque cambia totalmente, estaríamos encantados que nos cuentes tu experiencia en nuestros canales de contacto ¡Hoy vas a sumarte a las empresas que entendieron que las ventas no se cierran en el primer contacto y facturan de verdad! ¡Bienvenido!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategies */}
        <section id="estrategias" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Estrategias y Mensajes
              </h2>
              <p className="text-lg text-gray-500">
                Descubrí qué pasó con cada tipo de lead y cómo responder en cada etapa de contacto.
              </p>
            </div>

            {Object.entries(
              strategiesData.reduce((acc, s) => {
                if (!acc[s.category]) acc[s.category] = []
                acc[s.category].push(s)
                return acc
              }, {})
            ).map(([category, strategies]) => (
              <div key={category} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    {categoryIcons[category] || <MessageCircle className="w-5 h-5" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {strategies.map((s) => (
                    <StrategyCard key={s.id} strategy={s} />
                  ))}
                </div>
              </div>
            ))}


          </div>
        </section>

        {/* Conclusión */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Conclusión: Vender no es insistir, es acompañar
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Aplicar estas secuencias de contactos te permite persuadir con ética. La diferencia entre manipular y persuadir es clara: la manipulación usa el cansancio y el miedo para forzar una venta. La persuasión ética, en cambio, simplifica el mensaje para que el cerebro no se sature, y acompaña al cliente usando tiempos inteligentes, demostrando que tu producto es, ante todo, una compra valiosa y segura.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">© {new Date().getFullYear()}</span>
          <div className="flex items-center gap-3 sm:gap-5">
            <a href="mailto:support@grupostart.com.ar" className="text-xs sm:text-sm text-gray-400 hover:text-[#0051FF] transition-colors truncate">
              support@grupostart.com.ar
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StrategyCard({ strategy }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm transition-all hover:shadow-md cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{strategy.title}</h3>
            {strategy.subtitle && <p className="text-sm text-gray-500 mt-1">{strategy.subtitle}</p>}
          </div>
          <ChevronDown className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
        {open && (
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">¿Qué le pudo pasar al lead?</h4>
              <p className="text-gray-600">{strategy.whatHappened}</p>
            </div>
            {strategy.psychologicalReason && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Razón Psicológica</h4>
                <p className="text-gray-600 italic">{strategy.psychologicalReason}</p>
              </div>
            )}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 whitespace-pre-wrap">{strategy.suggestion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
