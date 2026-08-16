import { ResumeData } from "../types/resume";

export function buildGenerationPrompt(data: ResumeData): string {
  const { personal, education, experience, projects, skills, achievements, jobDescription } = data;

  return `You are an expert professional resume writer and ATS optimization specialist.

Transform the user's provided information into concise, professional resume content.

RULES (follow strictly):
1. Never invent facts.
2. Never add technologies, skills, or tools the user did not provide.
3. Never fabricate achievements, companies, titles, or dates.
4. Preserve all dates and factual information exactly as given.
5. Use strong action verbs.
6. Only mention measurable results if the user's data already contains numbers/metrics.
7. Keep content concise and scannable.
8. Optimize wording for ATS (Applicant Tracking Systems) using relevant terminology already present in the user's data or job description.
9. Avoid keyword stuffing.
10. Maintain a professional tone throughout.
11. Return VALID JSON ONLY. No markdown fences, no commentary, no explanation text outside the JSON.

USER DATA (JSON):
${JSON.stringify({ personal, education, experience, projects, skills, achievements }, null, 2)}

${jobDescription ? `TARGET JOB DESCRIPTION (use to prioritize relevant existing skills/experience wording, do NOT invent matches):\n${jobDescription}` : ""}

Return JSON matching exactly this shape:
{
  "summary": "string - 2-4 sentence professional summary",
  "experience": [
    { "id": "string - reuse the id from input", "position": "string", "company": "string", "bullets": ["string", "..."] }
  ],
  "projects": [
    { "id": "string - reuse the id from input", "name": "string", "description": "string", "technologies": ["string"] }
  ],
  "education": [ /* pass through input education entries unchanged, same shape as input */ ],
  "skills": { "programmingLanguages": [], "frameworks": [], "databases": [], "tools": [], "softSkills": [], "other": [] },
  "achievements": [ { "title": "string", "description": "string" } ]
}`;
}

export function buildAnalysisPrompt(data: ResumeData, generated: unknown): string {
  return `You are an ATS (Applicant Tracking System) compatibility analyst.

Analyze the following resume content and produce an "AI Resume Compatibility Score" (NOT a claim of an official/certified ATS score).

RESUME CONTENT (JSON):
${JSON.stringify(generated, null, 2)}

${data.jobDescription ? `TARGET JOB DESCRIPTION:\n${data.jobDescription}\n\nAlso compute a job match analysis: which of the resume's existing skills match the job description, and which relevant skills mentioned in the job description are missing from the resume. Do NOT suggest the user add skills they don't have - only report the gap factually.` : ""}

Evaluate: keyword relevance, skills match, formatting/completeness of sections, readability, and (if a job description was given) alignment with it.

Return VALID JSON ONLY, no markdown fences, matching exactly this shape:
{
  "score": number (0-100),
  "strengths": ["string", "..."],
  "improvements": ["string", "..."]${data.jobDescription ? `,
  "jobMatch": {
    "matchScore": number (0-100),
    "matchingSkills": ["string"],
    "missingSkills": ["string"]
  }` : ""}
}`;
}
