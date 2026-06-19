import { GoogleGenerativeAI, type GenerativeModel } from "@google/generative-ai";
import { GeminiCache } from "./cache";

/** Lỗi tùy chỉnh – hiển thị thông điệp thân thiện cho người dùng. */
export class GeminiError extends Error {
  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    this.name = "GeminiError";
  }
}

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
  if (cachedModel) return cachedModel;
  const genAI = new GoogleGenerativeAI(getGeminiApiKey());
  cachedModel = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });
  return cachedModel;
}

/**
 * Tạo văn bản từ Gemini với caching, retry và xử lý lỗi thân thiện.
 * Tất cả prompt bằng tiếng Việt.
 */
export async function generateGeminiText(prompt: string): Promise<string> {
  // Kiểm tra cache trước
  const cached = GeminiCache.get(prompt);
  if (cached) return cached;

  const maxAttempts = 3;
  let attempt = 0;

  while (true) {
    try {
      const result = await getGeminiModel().generateContent(prompt);
      const text = result.response.text();
      GeminiCache.set(prompt, text);
      return text;
    } catch (err) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw new GeminiError(
          "Không thể lấy phản hồi từ Gemini. Vui lòng thử lại sau.",
          err
        );
      }
      // Exponential back‑off trước khi retry
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 100));
    }
  }
}
