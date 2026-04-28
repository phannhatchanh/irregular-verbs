import { GoogleGenerativeAI, type GenerativeModel } from "@google/generative-ai";

const GEMINI_MODEL_NAME = "gemini-2.5-flash-lite";

let cachedModel: GenerativeModel | null = null;

function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  return apiKey;
}

export function getGeminiModel(): GenerativeModel {
  if (cachedModel) {
    return cachedModel;
  }

  const genAI = new GoogleGenerativeAI(getGeminiApiKey());
  cachedModel = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

  return cachedModel;
}

export async function generateGeminiText(prompt: string): Promise<string> {
  const result = await getGeminiModel().generateContent(prompt);
  return result.response.text();
}
