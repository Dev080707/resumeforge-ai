import { ResumeData } from "../types/resume";

export function validateResumeData(body: unknown): { valid: boolean; error?: string; data?: ResumeData } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object." };
  }
  const data = body as Partial<ResumeData>;

  if (!data.personal || typeof data.personal !== "object") {
    return { valid: false, error: "Missing 'personal' information." };
  }
  if (!data.personal.fullName || data.personal.fullName.trim().length === 0) {
    return { valid: false, error: "Full name is required." };
  }
  if (data.personal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email)) {
    return { valid: false, error: "Email address is invalid." };
  }

  const hasAnyContent =
    (data.education?.length ?? 0) > 0 ||
    (data.experience?.length ?? 0) > 0 ||
    (data.projects?.length ?? 0) > 0 ||
    (data.skills &&
      Object.values(data.skills).some((arr) => Array.isArray(arr) && arr.length > 0));

  if (!hasAnyContent) {
    return { valid: false, error: "Add at least one of: education, experience, projects, or skills before generating." };
  }

  return {
    valid: true,
    data: {
      personal: data.personal as ResumeData["personal"],
      education: data.education ?? [],
      experience: data.experience ?? [],
      projects: data.projects ?? [],
      skills:
        data.skills ??
        ({ programmingLanguages: [], frameworks: [], databases: [], tools: [], softSkills: [], other: [] } as ResumeData["skills"]),
      achievements: data.achievements ?? [],
      jobDescription: data.jobDescription?.trim() || undefined,
    },
  };
}
