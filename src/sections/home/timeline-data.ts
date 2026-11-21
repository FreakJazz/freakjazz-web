export type Lang = 'es' | 'en';
export type Bilingual = { es: string; en: string };
export type TimelineKind = 'experience' | 'education' | 'courses';

export type TimelineItem = {
  period: Bilingual;
  title: Bilingual;
  org: string;
  icon: string;
  points?: { es: string[]; en: string[] };
  tags?: string[];
};

const L = (es: string, en: string): Bilingual => ({ es, en });

// Ordered from most recent to oldest.

export const EXPERIENCE: TimelineItem[] = [
  {
    period: L('Jun 2025 – Abr 2026', 'Jun 2025 – Apr 2026'),
    title: L('Especialista de desarrollo', 'Development Specialist'),
    org: 'Netby / Publipromueve',
    icon: 'solar:rocket-2-bold-duotone',
    points: {
      es: [
        'Plataformas de fidelización bancaria, pagos, suscripciones y logística.',
        'Microservicios en .NET Core y Python con arquitectura orientada a eventos: colas, SQS y webhooks.',
        'Seguridad con Keycloak, AWS Cognito, JWT y OAuth2; calidad con SonarQube y catálogos de errores estandarizados.',
      ],
      en: [
        'Bank loyalty, payments, subscriptions and logistics platforms.',
        'Microservices in .NET Core and Python with event-driven architecture: queues, SQS and webhooks.',
        'Security with Keycloak, AWS Cognito, JWT and OAuth2; quality with SonarQube and standardized error catalogs.',
      ],
    },
    tags: ['.NET Core', 'Python', 'SQS', 'Keycloak', 'PostgreSQL', 'Redis'],
  },
  {
    period: L('Jun 2025 – Ago 2025', 'Jun 2025 – Aug 2025'),
    title: L('Capacitadora', 'Trainer'),
    org: 'ConQuito',
    icon: 'solar:square-academic-cap-bold-duotone',
    points: {
      es: [
        'Clase magistral «Lógica programática con Python».',
        'Talleres «Sitios web con Python» y «ChatBots para ventas con Python».',
      ],
      en: [
        'Keynote class “Programming logic with Python”.',
        'Workshops “Websites with Python” and “Sales chatbots with Python”.',
      ],
    },
    tags: ['Python', 'Chatbots'],
  },
  {
    period: L('Ene 2022 – May 2025', 'Jan 2022 – May 2025'),
    title: L('Analista de Sistemas e Informática Electoral 2', 'Systems & Electoral IT Analyst 2'),
    org: 'Consejo Nacional Electoral',
    icon: 'solar:city-bold-duotone',
    points: {
      es: [
        'Sistemas de alcance nacional: contabilidad electoral, interconexión de datos para fiscalización y plataformas de observación electoral.',
        'Arquitectura de microservicios con Docker y Kubernetes, despliegues, releases y CI/CD con GitHub y Azure DevOps.',
        'Desarrollo web y móvil con Angular, React, .NET Core y React Native; bases de datos Oracle y PostgreSQL.',
      ],
      en: [
        'National-scale systems: electoral accounting, data interconnection for auditing and electoral observation platforms.',
        'Microservices architecture with Docker and Kubernetes, deployments, releases and CI/CD with GitHub and Azure DevOps.',
        'Web and mobile development with Angular, React, .NET Core and React Native; Oracle and PostgreSQL databases.',
      ],
    },
    tags: ['.NET Core', 'Angular', 'React', 'Kubernetes', 'Oracle', 'PostgreSQL'],
  },
  {
    period: L('Ene 2022 – Mar 2022', 'Jan 2022 – Mar 2022'),
    title: L('Profesora', 'Teacher'),
    org: 'Genius Preuniversitario',
    icon: 'solar:notebook-bold-duotone',
    points: {
      es: ['Clases de nivelación en matemáticas, física, razonamiento abstracto y geometría.'],
      en: ['Preparatory classes in mathematics, physics, abstract reasoning and geometry.'],
    },
  },
  {
    period: L('Nov 2020 – Dic 2021', 'Nov 2020 – Dec 2021'),
    title: L('Desarrolladora Full Stack', 'Full Stack Developer'),
    org: 'Gradav Software',
    icon: 'solar:code-square-bold-duotone',
    points: {
      es: [
        'Aplicaciones web y móviles con React, Next.js y React Native.',
        'Backend con Django, Flask y FastAPI, y servidores en AWS, Heroku y Firebase.',
      ],
      en: [
        'Web and mobile applications with React, Next.js and React Native.',
        'Backend with Django, Flask and FastAPI, and servers on AWS, Heroku and Firebase.',
      ],
    },
    tags: ['React', 'React Native', 'Django', 'FastAPI', 'AWS'],
  },
  {
    period: L('Ago 2019 – Dic 2020', 'Aug 2019 – Dec 2020'),
    title: L('Desarrolladora Full Stack', 'Full Stack Developer'),
    org: 'JRTec',
    icon: 'solar:cpu-bolt-bold-duotone',
    points: {
      es: [
        'Proyectos industriales y electrónicos: software y hardware, IoT, soporte técnico y capacitación.',
        'Clases de robótica y programación.',
      ],
      en: [
        'Industrial and electronics projects: software and hardware, IoT, technical support and training.',
        'Robotics and programming classes.',
      ],
    },
    tags: ['IoT', 'Python', 'Electrónica'],
  },
  {
    period: L('Sep 2014 – Dic 2018', 'Sep 2014 – Dec 2018'),
    title: L('Técnica Electrónica y Tutora de proyectos', 'Electronics Technician & Project Tutor'),
    org: 'Club de Robótica · Escuela Politécnica Nacional',
    icon: 'solar:cup-star-bold-duotone',
    points: {
      es: [
        'Construcción de robots para concursos y tutoría de proyectos.',
        'Ganadora del Hackathon contra desastres naturales (IEEE Hack Tech Ecuador 2018) y segundo lugar en el Concurso Ecuatoriano de Robótica 2018.',
      ],
      en: [
        'Built robots for competitions and tutored projects.',
        'Winner of the natural disasters Hackathon (IEEE Hack Tech Ecuador 2018) and second place at the Ecuadorian Robotics Contest 2018.',
      ],
    },
    tags: ['Robótica', 'IEEE'],
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
