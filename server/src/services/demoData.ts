import { AtsAnalysis, GeneratedResume, ResumeData } from "../types/resume";

/**
 * Demo Mode fallback. Used ONLY when the request explicitly sets demoMode: true,
 * so judges can test the UI without a Gemini API key. This is clearly labeled
 * to the user in the UI and is never used silently in place of a real API failure.
 */
export function buildDemoGeneratedResume(data: ResumeData): GeneratedResume {
  return {
    summary: `${data.personal.title || "Motivated professional"} with hands-on experience across ${
      data.projects.length
    } project${data.projects.length === 1 ? "" : "s"} and a solid foundation in ${
      [...data.skills.programmingLanguages, ...data.skills.frameworks].slice(0, 3).join(", ") || "core technologies"
    }. Known for clear communication, reliable execution, and a strong drive to learn.`,
    experience: data.experience.map((e) => ({
      id: e.id,
      position: e.position,
      company: e.company,
      bullets:
        e.responsibilities.length > 0
          ? e.responsibilities.map((r) => (r.trim().length > 0 ? r : "Contributed to team objectives and deliverables."))
          : ["Contributed to team objectives and deliverables."],
    })),
    projects: data.projects.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description || "Built and shipped a working project applying the listed technologies.",
      technologies: p.technologies,
    })),
    education: data.education,
    skills: data.skills,
    achievements: data.achievements.map((a) => ({ title: a.title, description: a.description })),
  };
}

export function buildDemoAtsAnalysis(data: ResumeData): AtsAnalysis {
  const base: AtsAnalysis = {
    score: 78,
    strengths: [
      "Clear, well-organized skills section",
      "Education section is complete",
      "Resume includes concrete project work",
    ],
    improvements: [
      "Add more measurable outcomes where possible",
      "Consider expanding on responsibilities in recent roles",
    ],
  };
  if (data.jobDescription) {
    base.jobMatch = {
      matchScore: 68,
      matchingSkills: data.skills.programmingLanguages.slice(0, 3),
      missingSkills: ["Docker", "SQL"].filter(
        (s) => !data.skills.tools.map((t) => t.toLowerCase()).includes(s.toLowerCase())
      ),
    };
  }
  return base;
}
