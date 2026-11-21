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
// 4 coherent groups of the full stack (ES/EN friendly names)
// ----------------------------------------------------------------------

export const TECH_CATEGORIES: TechCategory[] = [
  // 1. Languages, frameworks and ways of working
  {
    key: 'development',
    labelKey: 'home.techDevelopment',
    items: [
      { name: 'C#', icon: 'devicon:csharp', color: '#239120' },
      { name: 'Python', icon: 'devicon:python', color: '#3776AB' },
      { name: 'Go', icon: 'devicon:go', color: '#00ADD8' },
      { name: 'Java', icon: 'devicon:java', color: '#007396' },
      { name: 'TypeScript', icon: 'devicon:typescript', color: '#3178C6' },
      { name: 'JavaScript', icon: 'devicon:javascript', color: '#F7DF1E' },
      { name: 'SQL', icon: 'devicon:postgresql', color: '#4169E1' },
      { name: 'PL/SQL', icon: 'devicon:oracle', color: '#F80000' },
      { name: 'C', icon: 'devicon:c', color: '#5C6BC0' },
      { name: 'C++', icon: 'devicon:cplusplus', color: '#00599C' },
      { name: '.NET Core', icon: 'devicon:dotnetcore', color: '#512BD4' },
      { name: 'FastAPI', icon: 'devicon:fastapi', color: '#009688' },
      { name: 'Django', icon: 'devicon:djangorest', color: '#092E20' },
      { name: 'Flask', icon: 'devicon:flask', color: '#000000' },
      { name: 'Spring Boot', icon: 'devicon:spring', color: '#6DB33F' },
      { name: 'React', icon: 'devicon:react', color: '#61DAFB' },
      { name: 'Next.js', icon: 'devicon:nextjs', color: '#000000' },
      { name: 'Angular', icon: 'devicon:angular', color: '#DD0031' },
      { name: 'React Native', icon: 'devicon:react', color: '#61DAFB' },
      { name: 'Razor', monogram: 'Rz', color: '#512BD4' },
      { name: 'Material UI', icon: 'devicon:materialui', color: '#0081CB' },
      { name: 'UI/UX', monogram: 'UX', color: '#EC4899' },
      { name: 'Figma', icon: 'devicon:figma', color: '#F24E1E' },
      { name: 'Scrum', monogram: 'SCR', color: '#10B981' },
      { name: 'Kanban', monogram: 'KAN', color: '#0EA5E9' },
      { name: 'XP', monogram: 'XP', color: '#F59E0B' },
      { name: 'Jira', icon: 'devicon:jira', color: '#0052CC' },
      { name: 'Trello', icon: 'devicon:trello', color: '#0079BF' },
    ],
  },

  // 2. Architecture, messaging, security and software quality
  {
    key: 'architecture',
    labelKey: 'home.techArchitectureSecurity',
    items: [
      { name: 'Microservices', monogram: 'µS', color: '#10B981' },
      { name: 'DDD', monogram: 'DDD', color: '#EC4899' },
      { name: 'Clean Architecture', monogram: 'CA', color: '#2970FF' },
      { name: 'Hexagonal', monogram: 'HEX', color: '#7C3AED' },
      { name: 'Event-Driven', monogram: 'EDA', color: '#EF4444' },
      { name: 'Distributed Systems', monogram: 'DS', color: '#0EA5E9' },
      { name: 'REST APIs', monogram: 'API', color: '#2970FF' },
      { name: 'WebSockets', monogram: 'WS', color: '#F59E0B' },
      { name: 'Webhooks', monogram: 'WH', color: '#14B8A6' },
      { name: 'API Integration', monogram: 'INT', color: '#6366F1' },
      { name: 'Banking Integrations', icon: 'mdi:bank-outline', color: '#0F766E' },
      { name: 'SOLID', monogram: 'SOLID', color: '#8B5CF6' },
      { name: 'Design Patterns', monogram: 'DP', color: '#D946EF' },
      { name: 'Apache Kafka', icon: 'devicon:apachekafka', color: '#231F20' },
      { name: 'AWS SQS', monogram: 'SQS', color: '#FF9900' },
      { name: 'Event Streaming', monogram: 'ES', color: '#EF4444' },
      { name: 'Async Processing', monogram: 'ASY', color: '#06B6D4' },
      { name: 'JWT', monogram: 'JWT', color: '#D63AFF' },
      { name: 'OAuth 2.0', monogram: 'OA2', color: '#EB5424' },
      { name: 'Keycloak', monogram: 'KC', color: '#4D4D4D' },
      { name: 'AWS Cognito', monogram: 'CG', color: '#DD344C' },
      { name: 'Roles & Permissions', icon: 'mdi:shield-account-outline', color: '#16A34A' },
      { name: 'SonarQube', icon: 'devicon:sonarqube', color: '#4E9BCD' },
      { name: 'Static Analysis', monogram: 'SA', color: '#64748B' },
      { name: 'Error Catalogs', monogram: 'ERR', color: '#DC2626' },
      { name: 'API Contracts', monogram: 'OAS', color: '#85EA2D' },
      { name: 'API Versioning', monogram: 'v2', color: '#0891B2' },
    ],
  },

  // 3. Cloud, DevOps and data
  {
    key: 'cloud',
    labelKey: 'home.techCloudData',
    items: [
      { name: 'AWS', icon: 'devicon:amazonwebservices-wordmark', color: '#FF9900' },
      { name: 'EC2', monogram: 'EC2', color: '#FF9900' },
      { name: 'S3', monogram: 'S3', color: '#3F8624' },
      { name: 'IAM', monogram: 'IAM', color: '#DD344C' },
      { name: 'Azure', icon: 'devicon:azure', color: '#0078D4' },
      { name: 'Docker', icon: 'devicon:docker', color: '#2496ED' },
      { name: 'Docker Compose', monogram: 'DC', color: '#2496ED' },
      { name: 'Kubernetes', icon: 'devicon:kubernetes', color: '#326CE5' },
      { name: 'Terraform', icon: 'devicon:terraform', color: '#7B42BC' },
      { name: 'IaC', monogram: 'IaC', color: '#7B42BC' },
      { name: 'CI/CD', monogram: 'CI', color: '#10B981' },
      { name: 'GitHub Actions', icon: 'devicon:githubactions', color: '#2088FF' },
      { name: 'Azure DevOps', icon: 'devicon:azuredevops', color: '#0078D7' },
      { name: 'Jenkins', icon: 'devicon:jenkins', color: '#D24939' },
      { name: 'Consul', monogram: 'CON', color: '#CA2171' },
      { name: 'Firebase', icon: 'devicon:firebase', color: '#FFCA28' },
      { name: 'PostgreSQL', icon: 'devicon:postgresql', color: '#4169E1' },
      { name: 'MongoDB', icon: 'devicon:mongodb', color: '#47A248' },
      { name: 'SQL Server', icon: 'devicon:microsoftsqlserver', color: '#CC2927' },
      { name: 'Oracle', icon: 'devicon:oracle', color: '#F80000' },
      { name: 'MariaDB', icon: 'devicon:mariadb', color: '#003545' },
      { name: 'Firestore', monogram: 'FS', color: '#FFA000' },
      { name: 'Supabase', icon: 'devicon:supabase', color: '#3ECF8E' },
      { name: 'Redis', icon: 'devicon:redis', color: '#DC382D' },
      { name: 'Data Modeling', monogram: 'ERD', color: '#0EA5E9' },
      { name: 'Query Optimization', monogram: 'QO', color: '#F59E0B' },
      { name: 'Stored Procedures', monogram: 'SP', color: '#8B5CF6' },
    ],
  },

  // 4. Artificial intelligence
  {
    key: 'ai',
    labelKey: 'frameworks.ai',
    items: [
      { name: 'Python', icon: 'devicon:python', color: '#3776AB' },
      { name: 'Machine Learning', icon: 'mdi:brain', color: '#F97316' },
      { name: 'LLM Engineering', monogram: 'LLM', color: '#7C3AED' },
      { name: 'OpenAI API', icon: 'mdi:creation', color: '#412991' },
      { name: 'Azure OpenAI', monogram: 'AOI', color: '#0078D4' },
      { name: 'RAG', monogram: 'RAG', color: '#0EA5E9' },
      { name: 'Embeddings', monogram: 'EMB', color: '#EC4899' },
      { name: 'AI Agents', icon: 'mdi:robot-outline', color: '#F59E0B' },
      { name: 'LangChain', icon: 'mdi:link-variant', color: '#1C8C6E' },
      { name: 'LangGraph', monogram: 'LG', color: '#1C3C3C' },
      { name: 'LlamaIndex', monogram: 'LI', color: '#8B5CF6' },
      { name: 'MCP', monogram: 'MCP', color: '#D97757' },
      { name: 'PyTorch', icon: 'devicon:pytorch', color: '#EE4C2C' },
      { name: 'Scikit-learn', icon: 'devicon:scikitlearn', color: '#F7931E' },
      { name: 'MLOps', monogram: 'MLO', color: '#10B981' },
      { name: 'LLMOps', monogram: 'LLO', color: '#14B8A6' },
      { name: 'GitHub Copilot', icon: 'mdi:github', color: '#000000' },
      { name: 'Windsurf', monogram: 'WS', color: '#0B7285' },
    ],
  },
];
