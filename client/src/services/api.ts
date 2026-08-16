import { AtsAnalysis, GeneratedResume, ResumeData } from "../types/resume";

export class ApiError extends Error {
  code?: string;
  status: number;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(body.error || "Something went wrong. Please try again.", res.status, body.code);
  }
  return body as T;
}

export async function checkHealth(): Promise<{ status: string; aiConfigured: boolean }> {
  const res = await fetch("/api/health");
  return handleResponse(res);
}

export async function generateResume(
  data: ResumeData,
  demoMode: boolean
): Promise<{ resume: GeneratedResume; demoMode: boolean }> {
  const res = await fetch("/api/resume/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, demoMode }),
  });
  return handleResponse(res);
}

export async function analyzeResume(
  data: ResumeData,
  generatedResume: GeneratedResume,
  demoMode: boolean
): Promise<{ analysis: AtsAnalysis; demoMode: boolean }> {
  const res = await fetch("/api/resume/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, generatedResume, demoMode }),
  });
  return handleResponse(res);
}
