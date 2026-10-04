export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'cicd' | 'iac' | 'k8s' | 'monitoring' | 'ansible';
  description: string;
  keyFeatures: string[];
  techStack: string[];
  architectureSummary: string;
  githubUrl: string;
  demoUrl?: string;
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
  metrics?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 0-100
    iconName?: string;
    isPrimary?: boolean;
    labEvidence?: string;
  }[];
}

export interface PipelineStage {
  id: string;
  name: string;
  icon: string;
  status: 'idle' | 'running' | 'success' | 'failed' | 'warning';
  duration: string;
  logs: string[];
}

export interface ArchitectureNode {
  id: string;
  title: string;
  category: 'cloud' | 'compute' | 'database' | 'ci-cd' | 'monitoring';
  description: string;
  tech: string;
  codeSnippet: string;
  snippetLanguage: string;
  connections: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  badgeUrl?: string;
  icon: string;
  skillsVerified: string[];
  credentialId?: string;
}

export interface ExperienceItem {
  id: string;
  type: 'education' | 'internship' | 'hackathon' | 'project';
  title: string;
  organization: string;
  period: string;
  description: string[];
  technologies: string[];
}
