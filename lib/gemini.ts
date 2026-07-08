import { GoogleGenerativeAI, type GenerativeModel } from "@google/generative-ai";
import { GeminiCache } from "./cache";

/** Lỗi tùy chỉnh – hiển thị thông điệp thân thiện cho người dùng. */
export class GeminiError extends Error {
  constructor(
    message: string,
    public readonly originalError?: unknown,
    public readonly status?: number
  ) {
    super(message);
    this.name = "GeminiError";
  }
}

const GEMINI_MODEL_NAME = "gemini-2.5-flash-lite";

const modelCache = new Map<string, GenerativeModel>();

function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }
  return apiKey;
}

export function getGeminiModel(customApiKey?: string, customModel?: string): GenerativeModel {
  const apiKey = customApiKey || getGeminiApiKey();
  let modelName = customModel || GEMINI_MODEL_NAME;
  if (modelName === "antigravity") {
    modelName = "gemini-2.5-flash";
  }
  const cacheKey = `${apiKey}:${modelName}`;

  let model = modelCache.get(cacheKey);
  if (!model) {
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: modelName });
    modelCache.set(cacheKey, model);
  }
  return model;
}

function isRateLimitError(err: any): boolean {
  if (!err) return false;
  if (err.status === 429 || err.statusCode === 429) return true;
  const message = err.message?.toLowerCase() || "";
  return (
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("exhausted") ||
    message.includes("rate limit")
  );
}

/**
 * Tạo văn bản từ Gemini với caching, retry và xử lý lỗi thân thiện.
 * Tất cả prompt bằng tiếng Việt.
 */
export async function generateGeminiText(prompt: string, customApiKey?: string, customModel?: string): Promise<string> {
  // Kiểm tra cache trước
  const cached = GeminiCache.get(prompt, customModel);
  if (cached) return cached;

  const maxAttempts = 3;
  let attempt = 0;

  while (true) {
    try {
      const result = await getGeminiModel(customApiKey, customModel).generateContent(prompt);
      const text = result.response.text();
      GeminiCache.set(prompt, text, customModel);
      return text;
    } catch (err) {
      attempt++;
      if (attempt >= maxAttempts) {
        if (isRateLimitError(err)) {
          throw new GeminiError(
            "Đã đạt đến giới hạn sử dụng mô hình Gemini AI. Vui lòng thử lại sau hoặc sử dụng API Key cá nhân để tiếp tục nhé!",
            err,
            429
          );
        }
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
