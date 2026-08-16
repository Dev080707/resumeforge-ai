export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  score?: string;
  description?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillsData {
  programmingLanguages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
  softSkills: string[];
  other: string[];
}

export interface AchievementEntry {
  id: string;
  title: string;
  date?: string;
  description?: string;
  category: "achievement" | "certification" | "award" | "hackathon";
}

export interface ResumeData {
  personal: PersonalInfo;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillsData;
  achievements: AchievementEntry[];
  jobDescription?: string;
}

export interface GeneratedResume {
  summary: string;
  experience: { id: string; position: string; company: string; bullets: string[] }[];
  projects: { id: string; name: string; description: string; technologies: string[] }[];
  education: EducationEntry[];
  skills: SkillsData;
  achievements: { title: string; description?: string }[];
}

export interface AtsAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  jobMatch?: {
    matchScore: number;
    matchingSkills: string[];
    missingSkills: string[];
  };
}
