export interface Project {
  id: string;
  tag: string;
  title: string;
  category: 'AI / ML' | 'Embedded / IoT' | 'Software Systems';
  description: string;
  technologies: string[];
  metrics: string[];
  status: 'Production' | 'Prototype' | 'Research';
  githubUrl?: string;
  demoUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  credentialUrl?: string;
  skills: string[];
  type: 'Course' | 'Certification' | 'Affiliation';
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  details: string;
  progress: number;
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  specialization: string;
  status: string;
  highlights: string[];
}
