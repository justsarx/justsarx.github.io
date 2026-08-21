export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  period: string;
  description: string;
  technicalDetails: string[];
  deliverables: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics: { label: string; value: string }[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  details?: string;
}

export interface SkillGroup {
  group: string;
  skills: string[];
}

export interface AospSystemSpec {
  filename: string;
  category: string;
  description: string;
  snippet: string;
}
