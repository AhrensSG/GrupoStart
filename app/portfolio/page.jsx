import {
  ArrowUpRight,
  Braces,
  Cloud,
  Database,
  FileCheck2,
  Github,
  HeartPulse,
  KeyRound,
  Layers3,
  Mail,
  MapPin,
  Route,
  ScanLine,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import "./portfolio.css";

export const metadata = {
  title: "Guillermo | Software Engineer",
  description:
    "Portfolio de Guillermo, software engineer especializado en TypeScript, Node.js, Next.js y arquitectura de aplicaciones.",
};

const projects = [
  {
    number: "01",
    eyebrow: "HealthTech · Gestión clínica",
    title: "FSA Salud",
    description:
      "Plataforma para una clínica de Formosa orientada a coordinar turnos, derivaciones, recetas, historia clínica y atención remota en un mismo ecosistema digital.",
    outcomes: [
      "Arquitectura de microservicios para separar agendas, pacientes, historia clínica y recetas.",
      "Flujo de médico de cabecera a especialista con continuidad de información clínica.",
      "Recetas verificables mediante QR y código de barras para farmacias locales.",
      "Carga de estudios e imágenes médicas con acceso controlado para profesionales.",
      "Videollamadas para resolver consultas sin desplazamientos innecesarios.",
    ],
    stack: ["NestJS", "TypeScript", "Microservicios", "GraphQL", "Jest", "Supertest", "Seguridad"],
    icon: HeartPulse,
    tone: "rose",
  },
  {
    number: "02",
    eyebrow: "MobilityTech · Operaciones en ruta",
    title: "Viaje Seguro",
    description:
      "Plataforma de viajes que conecta pasajeros y conductores con rutas, desvíos y tarifas calculadas a partir de mapas, coordenadas y condiciones reales del trayecto.",
    outcomes: [
      "Visualización de la ruta asignada para cada conductor y viaje.",
      "Gestión de desvíos solicitados por pasajeros durante el recorrido.",
      "Cálculo automático del precio a partir de distancias y coordenadas.",
      "Integración con servicios de Google Maps para rutas y geolocalización.",
      "Flujos backend orientados a consistencia entre recorrido, tarifa y estado del viaje.",
    ],
    stack: ["NestJS", "TypeScript", "Google Maps API", "Geolocalización", "PostgreSQL", "APIs"],
    icon: Route,
    tone: "blue",
  },
  {
    number: "03",
    eyebrow: "PropTech · Operaciones digitales",
    title: "HelloFlatMate",
    description:
      "Plataforma inmobiliaria para digitalizar operaciones, contratos y procesos de alquiler. Un producto pensado para reducir fricción entre propietarios, inquilinos y equipos de gestión.",
    outcomes: [
      "Flujos de contratos digitales y firma electrónica.",
      "Arquitectura de microservicios con NestJS para separar dominios y responsabilidades.",
      "Testing unitario y de integración para proteger los flujos críticos.",
      "Autenticación, autorización y protección de endpoints mediante JWT.",
    ],
    stack: ["Next.js", "NestJS", "Microservicios", "JWT", "Testing", "PostgreSQL"],
    icon: MapPin,
    tone: "violet",
  },
  {
    number: "04",
    eyebrow: "Fintech interno · Automatización",
    title: "Control financiero para Chaleur et Rénovation",
    description:
      "Sistema de gestión conectado con los procesos financieros de la empresa para centralizar facturación, presupuestos, gastos y seguimiento operativo.",
    outcomes: [
      "Conexión con servicios bancarios mediante APIs.",
      "Generación y control de facturas y presupuestos.",
      "Seguimiento de gastos desde una única aplicación.",
      "Servicios NestJS desacoplados para integrar operaciones financieras.",
      "Testing y controles de seguridad en los flujos backend.",
    ],
    stack: ["TypeScript", "NestJS", "APIs REST", "PostgreSQL", "Testing", "Docker"],
    icon: Workflow,
    tone: "orange",
  },
  {
    number: "05",
    eyebrow: "Document intelligence · IA aplicada",
    title: "Cocolinda",
    description:
      "Aplicación para capturar albaranes y facturas con una fotografía, extraer sus datos y ayudar a detectar inconsistencias antes de incorporarlas al flujo administrativo.",
    outcomes: [
      "Captura documental orientada a reducir trabajo manual.",
      "Extracción y estructuración de información de facturas.",
      "Validaciones para localizar posibles errores o anomalías.",
      "Diseño de un flujo de revisión humana antes de confirmar datos.",
    ],
    stack: ["Next.js", "React", "TypeScript", "IA", "APIs"],
    icon: ScanLine,
    tone: "cyan",
  },
  {
    number: "06",
    eyebrow: "Legacy · Formación COBOL/Mainframe",
    title: "COBOL + DB2 demo",
    description:
      "Programa en IBM Enterprise COBOL con SQL embebido en DB2 que consulta saldos de cuentas sobre un cursor, manejando SQLCODE, copybooks y ficheros secuenciales con su JCL. Proyecto de autoaprendizaje en stack mainframe (COBOL, DB2, CICS roadmap) tomado para acercarme al ecosistema legacy bancario.",
    outcomes: [
      "SELECT embebido en DB2 con declaración de cursor, OPEN/FETCH/CLOSE y manejo de SQLCODE (encontrado / no encontrado / error).",
      "Uso de COPY CUENTA (copybook), ficheros secuenciales y control de abends.",
      "JCL completo de compilación (IGYCRCTL) + linkeo (IEWL) y ejecución (IKJEFT01/DSN).",
      "Proyecto de formación: no sustituye experiencia laboral real en mainframe, pero muestra iniciativa para perfiles junior COBOL.",
    ],
    stack: ["COBOL", "DB2", "JCL", "Mainframe", "SQL embebido"],
    icon: Server,
    tone: "cyan",
  },
  {
    number: "07",
    eyebrow: "Producto digital · Gestión empresarial",
    title: "Solbyt",
    description:
      "Aplicación de control de gastos creada para convertir información dispersa en una herramienta operativa clara para el día a día del negocio.",
    outcomes: [
      "Modelado de entidades y relaciones del dominio.",
      "Paneles y flujos para registrar y consultar gastos.",
      "APIs para conectar frontend, backend y persistencia.",
      "Base técnica preparada para evolucionar funcionalidades.",
    ],
    stack: ["React", "NestJS", "TypeScript", "SQL", "Git/GitHub"],
    icon: Database,
    tone: "lime",
  },
];

const capabilities = [
  { icon: Braces, label: "Product engineering", text: "De la idea al producto funcional" },
  { icon: Layers3, label: "Arquitectura", text: "Diseño modular y mantenible" },
  { icon: Database, label: "Datos", text: "SQL, NoSQL y modelado de dominio" },
  { icon: Server, label: "Backend", text: "APIs, integraciones y servicios" },
  { icon: ShieldCheck, label: "Seguridad", text: "JWT, roles y control de acceso" },
  { icon: Cloud, label: "Entrega", text: "Docker, Nginx y despliegues" },
];

const stackGroups = [
  { title: "Core", items: ["TypeScript", "JavaScript", "Node.js", "NestJS", "GraphQL"] },
  { title: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Responsive UI"] },
  { title: "Data", items: ["PostgreSQL", "SQL", "MongoDB", "Modelado relacional"] },
  { title: "Quality", items: ["Jest", "Supertest", "Unit testing", "Integration testing", "Code review"] },
  { title: "Delivery", items: ["Git", "GitHub", "Docker", "Nginx", "APIs REST"] },
];

export default function PortfolioPage() {
  return (
    <main className="portfolio-shell">
      <nav className="portfolio-nav" aria-label="Navegación principal">
        <a className="portfolio-mark" href="#top" aria-label="Volver al inicio">
          <span className="portfolio-mark-dot" />
          <span>G / engineer</span>
        </a>
        <div className="portfolio-nav-links">
          <a href="#work">Proyectos</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contacto</a>
        </div>
        <a className="nav-status" href="#contact">
          <span /> Disponible para oportunidades
        </a>
      </nav>

      <section className="portfolio-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> Software engineer · 2020 — presente · Valencia / remoto</p>
          <h1>Construyo software que convierte operaciones complejas en <em>sistemas claros.</em></h1>
          <p className="hero-lead">
            Backend developer con experiencia profesional desde 2020. Desarrollo productos
            web y plataformas de negocio con TypeScript, Node.js, NestJS, Next.js y bases de
            datos bien diseñadas. Me muevo entre producto, arquitectura e implementación.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explorar proyectos <ArrowUpRight size={16} /></a>
            <a className="button button-quiet" href="#contact">Hablemos <span>↗</span></a>
          </div>
          <div className="hero-proof">
            <span className="proof-line" />
            <span>Backend · Microservicios · Integraciones · Testing</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Perfil profesional">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-avatar-wrap">
            <img src="/guille.jpeg" alt="Guillermo, software engineer" className="hero-avatar" />
          </div>
          <div className="floating-card card-top"><Sparkles size={15} /><span>systems<br /><strong>that matter</strong></span></div>
          <div className="floating-card card-bottom"><span className="terminal-prompt">&gt;_</span><span>shipping<br /><strong>with intent</strong></span></div>
          <div className="hero-coordinate">39.4699° N<br />0.3763° W</div>
        </div>
      </section>

      <section className="capability-strip" aria-label="Áreas de especialización">
        {capabilities.map(({ icon: Icon, label, text }) => (
          <div className="capability" key={label}>
            <Icon size={19} strokeWidth={1.5} />
            <div><strong>{label}</strong><span>{text}</span></div>
          </div>
        ))}
      </section>

      <section className="work-section section-wrap" id="work">
        <div className="section-heading">
          <div><p className="eyebrow"><span>02</span> Trabajo seleccionado</p><h2>Productos reales.<br /><em>Problemas reales.</em></h2></div>
          <p className="section-intro">Experiencia construyendo herramientas digitales para inmobiliaria, operaciones financieras, administración y automatización documental.</p>
        </div>
        <div className="project-grid">
          {projects.map(({ number, eyebrow, title, description, outcomes, stack, icon: Icon, tone }) => (
            <article className={`project-card project-${tone}`} key={title}>
              <div className="project-topline"><span>{number}</span><Icon size={21} strokeWidth={1.4} /></div>
              <p className="project-eyebrow">{eyebrow}</p>
              <h3>{title}</h3>
              <p className="project-description">{description}</p>
              <ul>{outcomes.map((outcome) => <li key={outcome}><span />{outcome}</li>)}</ul>
              <div className="tag-list">{stack.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-section section-wrap">
        <div className="architecture-copy"><p className="eyebrow"><span>03</span> Cómo trabajo</p><h2>Pienso en el sistema,<br /><em>no solo en la pantalla.</em></h2><p>Me interesa entender el problema completo: dominio, datos, seguridad, integraciones y la experiencia de quien usará el producto. Diseño soluciones que puedan mantenerse cuando el proyecto crece.</p><p>En FSA Salud separé los dominios principales en servicios independientes: pacientes, agenda, derivaciones, historia clínica y recetas. Cada servicio encapsulaba sus reglas y exponía contratos mediante APIs; NestJS organizaba módulos, guards y resolvers, mientras JWT protegía la identidad y los permisos. GraphQL resolvía las consultas clínicas y REST cubría integraciones operativas. Validé los flujos con Jest, Supertest, tests unitarios, integración, endpoints, mocks y cobertura.</p></div>
        <div className="architecture-map" aria-label="Flujo de arquitectura de producto">
          <div className="architecture-node node-input"><span>01</span><strong>Domain</strong><small>reglas del negocio</small></div>
          <div className="architecture-connector connector-a" />
          <div className="architecture-node node-api"><span>02</span><strong>API layer</strong><small>contratos claros</small></div>
          <div className="architecture-connector connector-b" />
          <div className="architecture-node node-data"><span>03</span><strong>Data</strong><small>persistencia fiable</small></div>
          <div className="architecture-connector connector-c" />
          <div className="architecture-node node-ship"><span>04</span><strong>Delivery</strong><small>listo para operar</small></div>
          <div className="architecture-label"><KeyRound size={14} /> Security by design</div>
        </div>
      </section>

      <section className="credentials-section section-wrap" aria-label="Experiencia y formación">
        <div className="credential"><span>EXPERIENCIA</span><strong>2020 — presente</strong><small>Desarrollo de productos y plataformas digitales</small></div>
        <div className="credential"><span>FORMACIÓN SUPERIOR</span><strong>Técnico Superior en Programación</strong><small>Universidad Tecnológica Nacional · Argentina</small></div>
        <div className="credential"><span>LIDERAZGO TÉCNICO</span><strong>Equipos y calidad</strong><small>Code reviews · GitHub flow · Scrum · Jira · Trello</small></div>
        <div className="credential"><span>IDIOMAS</span><strong>Español · Inglés · Francés</strong><small>Comunicación técnica y trabajo con equipos internacionales</small></div>
      </section>

      <section className="stack-section section-wrap" id="stack">
        <div className="section-heading stack-heading"><div><p className="eyebrow"><span>04</span> Herramientas</p><h2>Un stack pensado para <em>entregar.</em></h2></div><p className="section-intro">Tecnologías que utilizo para construir, conectar y operar aplicaciones web modernas.</p></div>
        <div className="stack-grid">{stackGroups.map(({ title, items }) => <div className="stack-group" key={title}><span className="stack-index">0{stackGroups.findIndex((group) => group.title === title) + 1}</span><h3>{title}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div>
      </section>

      <section className="contact-section section-wrap" id="contact">
        <div className="contact-panel"><div><p className="eyebrow"><span>05</span> Siguiente proyecto</p><h2>¿Qué podemos<br /><em>construir?</em></h2></div><div className="contact-side"><p>Estoy buscando un equipo donde pueda aportar desde el backend, aprender rápido y participar en decisiones técnicas con impacto real.</p><div className="contact-actions"><a className="button button-light" href="mailto:guillermoahrens@gmail.com">Escríbeme <Mail size={16} /></a><a className="contact-phone" href="tel:+34627685867">+34 627 685 867</a></div><small>guillermoahrens@gmail.com</small></div></div>
      </section>

      <footer className="portfolio-footer"><span>© 2026 Guillermo · Software Engineer</span><span>Built with intention / Next.js</span><a href="#top">Volver arriba ↑</a></footer>
    </main>
  );
}
