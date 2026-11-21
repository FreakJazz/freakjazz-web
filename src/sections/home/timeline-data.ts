export type Lang = 'es' | 'en';
export type Bilingual = { es: string; en: string };
export type TimelineKind = 'experience' | 'education' | 'courses';

export type TimelineItem = {
  period: Bilingual;
  title: Bilingual;
  org: string | Bilingual;
  icon: string;
  points?: { es: string[]; en: string[] };
  tags?: string[];
};

const L = (es: string, en: string): Bilingual => ({ es, en });

// Ordered from most recent to oldest.

export const EXPERIENCE: TimelineItem[] = [
  {
    period: L('May 2026 – Presente (6 meses)', 'May 2026 – Present (6 months)'),
    title: L('Líder de Proyecto e Ingeniera de Software Senior', 'Project Lead & Senior Software Engineer'),
    org: L('Sector bancario y financiero', 'Banking & financial sector'),
    icon: 'solar:rocket-2-bold-duotone',
    points: {
      es: [
        'Lidero el diseño y desarrollo de soluciones bancarias, financieras y transaccionales con microservicios, Clean Architecture y arquitectura orientada a eventos sobre Kafka.',
        'Defino arquitecturas, contratos de API, estándares de desarrollo, integraciones y seguridad, autenticación y autorización basadas en roles, atributos y permisos.',
        'Diseño un motor configurable de gestión de efectivo en Go: los usuarios definen sus propios formatos de órdenes y archivos (campos y tipos de datos), cómo se mapean archivos y APIs hacia los servicios destino y el flujo completo de procesamiento (prevalidación de datos, cuentas y empresa, aprobación y ejecución de transacciones), con procesamiento por lotes, programado y en tiempo real, circuit breakers, reintentos configurables y entrega por APIs, SFTP y SMTP.',
        'Construyo soluciones en Python para automatización de procesos y para procesamiento, depuración y transformación de grandes volúmenes de datos, incluidas conciliaciones financieras.',
        'Diseño e integro soluciones de IA generativa, LLM y agentes de IA para optimizar procesos y automatizar tareas, con herramientas como GitHub Copilot.',
        'Desarrollo algoritmos de geolocalización, mapas e IA para el análisis de información geográfica.',
        'Implemento integraciones, procesos batch y pipelines CI/CD con Jenkins, Kafka y servicios en la nube, garantizando escalabilidad, trazabilidad y mantenibilidad.',
      ],
      en: [
        'Lead the design and development of banking, financial and transactional solutions with microservices, Clean Architecture and event-driven architecture on Kafka.',
        'Define architectures, API contracts, development standards, integrations, and role-, attribute- and permission-based security, authentication and authorization.',
        'Design a configurable cash management engine in Go: users define their own order and file formats (fields and data types), how files and APIs map to the target services, and the full processing flow (pre-validation of data, accounts and company, approval, and transaction execution), with batch, scheduled and real-time processing, circuit breakers, configurable retries, and delivery over APIs, SFTP and SMTP.',
        'Build Python solutions for process automation and for processing, cleansing and transforming large data volumes, including financial reconciliations.',
        'Design and integrate generative AI, LLM and AI-agent solutions to optimize processes and automate tasks, using tools such as GitHub Copilot.',
        'Develop geolocation, mapping and AI algorithms for geographic data analysis.',
        'Implement integrations, batch processes and CI/CD pipelines with Jenkins, Kafka and cloud services, ensuring scalability, traceability and maintainability.',
      ],
    },
    tags: ['Go', 'Kafka', 'Python', 'Clean Architecture', 'LLM', 'Jenkins'],
  },
  {
    period: L('Jun 2025 – Abr 2026 (10 meses)', 'Jun 2025 – Apr 2026 (10 months)'),
    title: L('Especialista de Desarrollo', 'Development Specialist'),
    org: 'NETBY / Publipromueve',
    icon: 'solar:wallet-bold-duotone',
    points: {
      es: [
        'Lideré el diseño y desarrollo de soluciones backend para plataformas financieras, de fidelización, logística y pagos (fidelización bancaria con tarjetas, millas y premios; suscripciones y pagos recurrentes; seguimiento de envíos) con .NET Core, microservicios, Clean Architecture y arquitectura orientada a eventos, para 500 mil usuarios.',
        'Diseñé e implementé integraciones mediante APIs REST, AWS SQS, webhooks y mensajería asíncrona, garantizando interoperabilidad y trazabilidad.',
        'Implementé autenticación y autorización con Keycloak, AWS Cognito, JWT y OAuth 2.0, incluida la gestión de roles y permisos.',
        'Gestioné pipelines CI/CD con Jenkins, control de calidad con SonarQube, pruebas, monitoreo y catálogos de errores estandarizados.',
        'Optimicé estructuras de datos y consultas en PostgreSQL, MongoDB y Redis, con estrategias de caché para sistemas de alta concurrencia, reduciendo los tiempos de respuesta en un 80 %.',
        'Construí soluciones en Python para automatización de procesos, procesamiento y transformación de datos, conciliaciones y ejecución de procesos batch.',
      ],
      en: [
        'Led the design and development of backend solutions for financial, loyalty, logistics and payments platforms (banking loyalty with cards, mileage and rewards; subscriptions and recurring payments; shipment tracking) using .NET Core, microservices, Clean Architecture and event-driven architecture, serving 500k users.',
        'Designed and implemented integrations through REST APIs, AWS SQS, webhooks and asynchronous messaging, ensuring interoperability and traceability.',
        'Implemented authentication and authorization with Keycloak, AWS Cognito, JWT and OAuth 2.0, including role and permission management.',
        'Managed CI/CD pipelines with Jenkins, quality control with SonarQube, testing, monitoring and standardized error catalogs.',
        'Optimized data structures and queries in PostgreSQL, MongoDB and Redis, with caching strategies for high-concurrency systems, reducing response times by 80%.',
        'Built Python solutions for process automation, data processing and transformation, reconciliations and batch execution.',
      ],
    },
    tags: ['.NET Core', 'AWS SQS', 'Keycloak', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    period: L('Jun 2025 – Ago 2025 (2 meses)', 'Jun 2025 – Aug 2025 (2 months)'),
    title: L('Instructora Técnica', 'Technical Instructor'),
    org: 'ConQuito',
    icon: 'solar:square-academic-cap-bold-duotone',
    points: {
      es: [
        'Dicté la clase magistral «Lógica de programación con Python».',
        'Realicé el taller «Desarrollo de sitios web con Python».',
        'Lideré el taller «Chatbots de ventas con Python».',
      ],
      en: [
        'Delivered a masterclass on “Programming Logic with Python.”',
        'Conducted a workshop on “Website Development with Python.”',
        'Led a workshop on “Sales Chatbots with Python.”',
      ],
    },
    tags: ['Python', 'Chatbots'],
  },
  {
    period: L('Ene 2022 – May 2025 (3 años 5 meses)', 'Jan 2022 – May 2025 (3 years, 5 months)'),
    title: L(
      'Analista de Sistemas e Informática Electoral II',
      'Electoral Systems & Information Technology Analyst II'
    ),
    org: 'Consejo Nacional Electoral',
    icon: 'solar:city-bold-duotone',
    points: {
      es: [
        'Lideré el diseño y desarrollo de soluciones basadas en microservicios sobre Docker y Kubernetes, con despliegues en la nube enfocados en escalabilidad, disponibilidad y resiliencia.',
        'Diseñé el sistema de interconexión automatizada con DINARP: sin APIs estandarizadas, construí componentes de integración a medida y procesamiento concurrente para intercambiar y consultar datos con el Registro Civil, SRI, Función Judicial, Superintendencias de Compañías y de Bancos, SERCOP y otras instituciones, cubriendo los paquetes de datos de cada candidato (candidatos, aportantes, adherentes, etc.), con manejo de errores, trazabilidad y validaciones.',
        'Implementé plataformas de contabilidad electoral para la fiscalización financiera de organizaciones políticas, integradas con DINARP.',
        'Desarrollé plataformas de observación electoral y consulta ciudadana, y aplicaciones móviles para la publicación en tiempo real de candidatos y resultados, usadas por 10 millones de usuarios el día de las elecciones.',
        'Coordiné despliegues, releases y mantenimiento con pipelines CI/CD (GitHub, Azure DevOps).',
        'Implementé servicios backend con .NET Core (C#) y Python (Django, FastAPI, Flask), APIs REST, WebSockets e integraciones seguras con JWT y OAuth 2.0; construí aplicaciones web y móviles con Angular, React, Next.js, React Native, Xamarin, Java y .NET MVC.',
        'Diseñé y optimicé bases de datos y procedimientos almacenados en Oracle, PostgreSQL, MongoDB y SQL Server.',
      ],
      en: [
        'Led the design and development of microservices-based solutions on Docker and Kubernetes, with cloud deployments focused on scalability, availability and resilience.',
        "Designed the automated interconnection system with DINARP: with no standardized APIs, built custom integration components and concurrent processing to exchange and query data with the Civil Registry, SRI, Judiciary, Superintendences of Companies and Banks, SERCOP and other institutions, covering every candidate's data packages (candidates, contributors, adherents, etc.), with error handling, traceability and validations.",
        'Implemented electoral accounting platforms for the financial oversight of political organizations, integrated with DINARP.',
        'Developed electoral observation and citizen consultation platforms and mobile apps for real-time publication of candidates and results, used by 10 million users on election day.',
        'Coordinated deployments, releases and maintenance with CI/CD pipelines (GitHub, Azure DevOps).',
        'Implemented backend services with .NET Core (C#) and Python (Django, FastAPI, Flask), REST APIs, WebSockets and secure integrations with JWT and OAuth 2.0; built web and mobile apps with Angular, React, Next.js, React Native, Xamarin, Java and .NET MVC.',
        'Designed and optimized databases and stored procedures in Oracle, PostgreSQL, MongoDB and SQL Server.',
      ],
    },
    tags: ['.NET Core', 'Kubernetes', 'Angular', 'React Native', 'Oracle', 'PostgreSQL'],
  },
  {
    period: L('Ene 2022 – Mar 2022 (3 meses)', 'Jan 2022 – Mar 2022 (3 months)'),
    title: L('Instructora', 'Instructor'),
    org: 'Genius Preuniversitario',
    icon: 'solar:notebook-bold-duotone',
    points: {
      es: ['Dicté cursos preuniversitarios de Matemáticas, Física, Geometría y Razonamiento Abstracto.'],
      en: ['Taught preparatory courses in Mathematics, Physics, Geometry and Abstract Reasoning.'],
    },
  },
  {
    period: L('Nov 2020 – Dic 2021 (1 año 1 mes)', 'Nov 2020 – Dec 2021 (1 year, 1 month)'),
    title: L('Desarrolladora Full Stack', 'Full-Stack Developer'),
    org: 'Gradav Software',
    icon: 'solar:code-square-bold-duotone',
    points: {
      es: [
        'Construí frontends con React, Next.js y Angular, y aplicaciones móviles con React Native.',
        'Desarrollé backends con Django, Flask, FastAPI, .NET Core y APIs REST, con autenticación JWT y WebSockets.',
        'Gestioné servidores en AWS (Elastic Beanstalk, EC2, RDS) y Firebase; diseñé bases de datos PostgreSQL y MySQL.',
        'Usé Git, GitHub y TFS/Azure DevOps para la gestión de código, ramas y colaboración en equipo.',
      ],
      en: [
        'Built frontends with React, Next.js and Angular, and mobile apps with React Native.',
        'Developed backends with Django, Flask, FastAPI, .NET Core and REST APIs, with JWT authentication and WebSockets.',
        'Managed servers on AWS (Elastic Beanstalk, EC2, RDS) and Firebase; designed PostgreSQL and MySQL databases.',
        'Used Git, GitHub and TFS/Azure DevOps for code management, branching and team collaboration.',
      ],
    },
    tags: ['React', 'Next.js', 'Django', 'FastAPI', 'AWS', 'Firebase'],
  },
  {
    period: L('Ago 2019 – Dic 2020 (1 año 4 meses)', 'Aug 2019 – Dec 2020 (1 year, 4 months)'),
    title: L('Desarrolladora Full Stack', 'Full-Stack Developer'),
    org: 'JRTec',
    icon: 'solar:cpu-bolt-bold-duotone',
    points: {
      es: [
        'Construí aplicaciones web y móviles con React, Next.js y React Native, y backends con Django, Flask, FastAPI y APIs REST, con JWT y WebSockets.',
        'Desplegué en AWS (Elastic Beanstalk, EC2, RDS) y Firebase; diseñé bases de datos PostgreSQL, MySQL y MongoDB.',
        'Desarrollé soluciones IoT de hardware y software, y participé en el diseño de sistemas, el análisis y la arquitectura de software.',
        'Usé Git, GitHub y TFS/Azure DevOps para la gestión de código y la colaboración en equipo.',
      ],
      en: [
        'Built web and mobile apps with React, Next.js and React Native, and backends with Django, Flask, FastAPI and REST APIs, with JWT and WebSockets.',
        'Deployed on AWS (Elastic Beanstalk, EC2, RDS) and Firebase; designed PostgreSQL, MySQL and MongoDB databases.',
        'Developed hardware and software IoT solutions, and contributed to system design, analysis and software architecture.',
        'Used Git, GitHub and TFS/Azure DevOps for code management and team collaboration.',
      ],
    },
    tags: ['IoT', 'React Native', 'Django', 'AWS', 'MongoDB'],
  },
];

export const EDUCATION: TimelineItem[] = [
  {
    period: L('Mar 2023 – Abr 2024', 'Mar 2023 – Apr 2024'),
    title: L(
      'Máster en Ingeniería de Software y Sistemas Informáticos',
      'Master in Software Engineering and Computer Systems'
    ),
    org: 'Universidad Internacional de La Rioja (UNIR)',
    icon: 'solar:diploma-bold-duotone',
    points: {
      es: [
        'Tesis: «Metodología de implementación de seguridad para arquitectura de aplicaciones web usando Angular, Node.js, Express y MongoDB (MEAN Stack)».',
      ],
      en: [
        'Thesis: “Security implementation methodology for web application architecture using Angular, Node.js, Express and MongoDB (MEAN Stack)”.',
      ],
    },
  },
  {
    period: L('Sep 2012 – May 2019', 'Sep 2012 – May 2019'),
    title: L('Ingeniería en Electrónica y Control', 'Electronics and Control Engineering'),
    org: 'Escuela Politécnica Nacional (EPN)',
    icon: 'solar:book-bold-duotone',
    points: {
      es: [
        'Jefa de equipo de seguidor de línea y robot bailarín en el Club de Robótica.',
        'Tesis: «Sistema de coordinación de robots móviles y cuadricópteros en un entorno industrial».',
      ],
      en: [
        'Team leader of the line follower and dancing robot teams at the Robotics Club.',
        'Thesis: “Coordination system for mobile robots and quadcopters in an industrial environment”.',
      ],
    },
  },
  {
    period: L('Sep 2004 – Jun 2011', 'Sep 2004 – Jun 2011'),
    title: L(
      'Bachillerato Físico Matemático · Auxiliar en Informática',
      'High School: Physics & Mathematics · IT Assistant'
    ),
    org: 'Unidad Educativa Municipal Experimental «Antonio José de Sucre»',
    icon: 'solar:square-academic-cap-bold-duotone',
  },
];

export const COURSES: TimelineItem[] = [
  {
    period: L('2026', '2026'),
    title: L(
      'Arquitectura de Software Moderna: DDD, Eventos, Microservicios',
      'Modern Software Architecture: DDD, Events, Microservices'
    ),
    org: 'Udemy',
    icon: 'solar:widget-5-bold-duotone',
  },
  {
    period: L('2025', '2025'),
    title: L(
      'Optimización Total: IA en la cadena de suministro para negocios',
      'Total Optimization: AI in the supply chain for business'
    ),
    org: 'ConQuito',
    icon: 'solar:atom-bold-duotone',
  },
  {
    period: L('2025', '2025'),
    title: L(
      'JobTalk: Inglés para entrevistas laborales y networking',
      'JobTalk: English for job interviews and networking'
    ),
    org: 'ConQuito',
    icon: 'solar:chat-round-dots-bold-duotone',
  },
  {
    period: L('2023', '2023'),
    title: L('Curso de Programación en Python', 'Python Programming Course'),
    org: 'Universidad Internacional de La Rioja',
    icon: 'solar:code-bold-duotone',
  },
];

export const TIMELINES: Record<TimelineKind, TimelineItem[]> = {
  experience: EXPERIENCE,
  education: EDUCATION,
  courses: COURSES,
};
