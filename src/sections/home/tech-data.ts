export type TechItem = {
  name: string;
  /** Iconify icon (devicon / mdi). Items without icon render a monogram instead. */
  icon?: string;
  monogram?: string;
  color: string;
};

export type TechCategory = {
  key: string;
  labelKey: string;
  items: TechItem[];
};

// ----------------------------------------------------------------------

export const TECH_CATEGORIES: TechCategory[] = [
  {
    key: 'languages',
    labelKey: 'home.techLanguages',
    items: [
      { name: 'C#', icon: 'devicon:csharp', color: '#239120' },
      { name: 'Python', icon: 'devicon:python', color: '#3776AB' },
      { name: 'Go', icon: 'devicon:go', color: '#00ADD8' },
      { name: 'TypeScript', icon: 'devicon:typescript', color: '#3178C6' },
      { name: 'JavaScript', icon: 'devicon:javascript', color: '#F7DF1E' },
      { name: 'Java', icon: 'devicon:java', color: '#007396' },
      { name: 'SQL', icon: 'devicon:postgresql', color: '#4169E1' },
      { name: 'PL/SQL', icon: 'devicon:oracle', color: '#F80000' },
    ],
  },
  {
    key: 'frontend',
    labelKey: 'frameworks.frontend',
    items: [
      { name: 'React', icon: 'devicon:react', color: '#61DAFB' },
      { name: 'Next.js', icon: 'devicon:nextjs', color: '#000000' },
      { name: 'Angular', icon: 'devicon:angular', color: '#DD0031' },
      { name: 'React Native', icon: 'devicon:react', color: '#61DAFB' },
      { name: 'Material-UI', icon: 'devicon:materialui', color: '#0081CB' },
      { name: 'TypeScript', icon: 'devicon:typescript', color: '#3178C6' },
    ],
  },
  {
    key: 'backend',
    labelKey: 'frameworks.backend',
    items: [
      { name: '.NET Core', icon: 'devicon:dotnetcore', color: '#512BD4' },
      { name: 'FastAPI', icon: 'devicon:fastapi', color: '#009688' },
      { name: 'Django', icon: 'devicon:django', color: '#092E20' },
      { name: 'Flask', icon: 'devicon:flask', color: '#000000' },
      { name: 'Spring Boot', icon: 'devicon:spring', color: '#6DB33F' },
      { name: 'Go', icon: 'devicon:go', color: '#00ADD8' },
      { name: 'Keycloak', monogram: 'KC', color: '#4D4D4D' },
      { name: 'REST APIs', monogram: 'API', color: '#2970FF' },
    ],
  },
  {
    key: 'ai',
    labelKey: 'frameworks.ai',
    items: [
      { name: 'LLM', monogram: 'LLM', color: '#7C3AED' },
      { name: 'RAG', monogram: 'RAG', color: '#0EA5E9' },
      { name: 'AI Agents', icon: 'mdi:robot-outline', color: '#F59E0B' },
      { name: 'OpenAI API', icon: 'mdi:creation', color: '#412991' },
      { name: 'LangChain', icon: 'mdi:link-variant', color: '#1C8C6E' },
      { name: 'LangGraph', monogram: 'LG', color: '#1C3C3C' },
      { name: 'PyTorch', icon: 'devicon:pytorch', color: '#EE4C2C' },
      { name: 'Scikit-learn', icon: 'devicon:scikitlearn', color: '#F7931E' },
      { name: 'Pandas', icon: 'devicon:pandas', color: '#150458' },
      { name: 'NumPy', icon: 'devicon:numpy', color: '#013243' },
      { name: 'GitHub Copilot', icon: 'mdi:github', color: '#000000' },
    ],
  },
  {
    key: 'architecture',
    labelKey: 'home.techArchitecture',
    items: [
      { name: 'Clean Architecture', monogram: 'CA', color: '#2970FF' },
      { name: 'Hexagonal', monogram: 'HEX', color: '#7C3AED' },
      { name: 'DDD', monogram: 'DDD', color: '#EC4899' },
      { name: 'CQRS', monogram: 'CQRS', color: '#F59E0B' },
      { name: 'Microservices', monogram: 'µS', color: '#10B981' },
      { name: 'Event-Driven', monogram: 'EDA', color: '#EF4444' },
      { name: 'Apache Kafka', icon: 'devicon:apachekafka', color: '#231F20' },
    ],
  },
  {
    key: 'cloud',
    labelKey: 'frameworks.cloudDevOps',
    items: [
      { name: 'AWS', icon: 'devicon:amazonwebservices-wordmark', color: '#FF9900' },
      { name: 'Azure', icon: 'devicon:azure', color: '#0078D4' },
      { name: 'Docker', icon: 'devicon:docker', color: '#2496ED' },
      { name: 'Kubernetes', icon: 'devicon:kubernetes', color: '#326CE5' },
      { name: 'Terraform', icon: 'devicon:terraform', color: '#7B42BC' },
      { name: 'Jenkins', icon: 'devicon:jenkins', color: '#D24939' },
      { name: 'Firebase', icon: 'devicon:firebase', color: '#FFCA28' },
      { name: 'GitHub Actions', icon: 'devicon:githubactions', color: '#2088FF' },
    ],
  },
  {
    key: 'databases',
    labelKey: 'frameworks.databases',
    items: [
      { name: 'PostgreSQL', icon: 'devicon:postgresql', color: '#4169E1' },
      { name: 'MongoDB', icon: 'devicon:mongodb', color: '#47A248' },
      { name: 'SQL Server', icon: 'devicon:microsoftsqlserver', color: '#CC2927' },
      { name: 'Oracle', icon: 'devicon:oracle', color: '#F80000' },
      { name: 'Redis', icon: 'devicon:redis', color: '#DC382D' },
      { name: 'pgvector', monogram: 'pgv', color: '#336791' },
    ],
  },
  {
    key: 'tools',
    labelKey: 'frameworks.tools',
    items: [
      { name: 'Git', icon: 'devicon:git', color: '#F05032' },
      { name: 'VS Code', icon: 'devicon:vscode', color: '#007ACC' },
      { name: 'Jira', icon: 'devicon:jira', color: '#0052CC' },
      { name: 'SonarQube', icon: 'devicon:sonarqube', color: '#4E9BCD' },
      { name: 'Figma', icon: 'devicon:figma', color: '#F24E1E' },
      { name: 'Scrum', monogram: 'SCR', color: '#10B981' },
    ],
  },
];
