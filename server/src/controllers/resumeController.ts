import { Request, Response } from "express";
import { buildAnalysisPrompt, buildGenerationPrompt } from "../services/promptBuilder";
import { ApiKeyMissingError, AiResponseParseError, generateStructuredJson } from "../services/geminiService";
import { buildDemoAtsAnalysis, buildDemoGeneratedResume } from "../services/demoData";
import { validateResumeData } from "../utils/validate";
import { AtsAnalysis, GeneratedResume } from "../types/resume";

export async function generateResume(req: Request, res: Response) {
  const { valid, error, data } = validateResumeData(req.body);
  if (!valid || !data) {
    return res.status(400).json({ error });
  }

  const demoMode = req.body?.demoMode === true;

  if (demoMode) {
    // Simulate a short delay so the loading UI feels real, without calling the AI API.
    await new Promise((r) => setTimeout(r, 900));
    return res.json({ resume: buildDemoGeneratedResume(data), demoMode: true });
  }

  try {
    const prompt = buildGenerationPrompt(data);
    const resume = await generateStructuredJson<GeneratedResume>(prompt);
    return res.json({ resume, demoMode: false });
  } catch (err) {
    return handleAiError(err, res);
  }
}

export async function analyzeResume(req: Request, res: Response) {
  const { valid, error, data } = validateResumeData(req.body);
  const generated = req.body?.generatedResume;

  if (!valid || !data) {
    return res.status(400).json({ error });
  }
  if (!generated) {
    return res.status(400).json({ error: "Missing 'generatedResume' to analyze." });
  }

  const demoMode = req.body?.demoMode === true;

  if (demoMode) {
    await new Promise((r) => setTimeout(r, 700));
    return res.json({ analysis: buildDemoAtsAnalysis(data), demoMode: true });
  }

  try {
    const prompt = buildAnalysisPrompt(data, generated);
    const analysis = await generateStructuredJson<AtsAnalysis>(prompt);
    return res.json({ analysis, demoMode: false });
  } catch (err) {
    return handleAiError(err, res);
  }
}

function handleAiError(err: unknown, res: Response) {
  if (err instanceof ApiKeyMissingError) {
    return res.status(503).json({
      error: "AI is not configured on this server. Set GEMINI_API_KEY in server/.env, or use Demo Mode.",
      code: "API_KEY_MISSING",
    });
  }
  if (err instanceof AiResponseParseError) {
    return res.status(502).json({
      error: "The AI returned an unexpected response. Please try again.",
      code: "AI_PARSE_ERROR",
    });
  }
  console.error("AI generation error:", err);
  return res.status(502).json({
    error: "The AI service is temporarily unavailable. Please try again in a moment.",
    code: "AI_UNAVAILABLE",
  });
}
