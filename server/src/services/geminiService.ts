import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-3.6-flash";

function getClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new ApiKeyMissingError();
  }
  return new GoogleGenerativeAI(apiKey);
}

export class ApiKeyMissingError extends Error {
  constructor() {
    super("GEMINI_API_KEY is not configured on the server.");
    this.name = "ApiKeyMissingError";
  }
}

export class AiResponseParseError extends Error {
  constructor(raw: string) {
    super("The AI returned a response that could not be parsed as JSON.");
    this.name = "AiResponseParseError";
    this.raw = raw;
  }
  raw: string;
}

/**
 * Sends a prompt to Gemini and returns the parsed JSON object.
 * Throws ApiKeyMissingError if no key is configured, or AiResponseParseError
 * if the model's output isn't valid JSON.
 */
export async function generateStructuredJson<T>(prompt: string): Promise<T> {
  const client = getClient();
  const model = client.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.6,
    },
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "");

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new AiResponseParseError(cleaned);
  }
}
