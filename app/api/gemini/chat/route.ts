import { NextResponse } from "next/server";
import { generateGeminiText } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { prompt?: string };
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await generateGeminiText(prompt);

    return NextResponse.json({ response });
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : "Unknown Gemini error";
    const normalizedMessage = rawMessage.toLowerCase();

    console.error("Gemini chat error:", rawMessage);

    if (normalizedMessage.includes("missing gemini_api_key")) {
      return NextResponse.json({ error: "Server chưa cấu hình GEMINI_API_KEY trên production." }, { status: 500 });
    }

    if (normalizedMessage.includes("429") || normalizedMessage.includes("quota")) {
      return NextResponse.json({ error: "Gemini đang quá tải hoặc đã hết quota. Vui lòng thử lại sau." }, { status: 429 });
    }

    if (normalizedMessage.includes("timeout") || normalizedMessage.includes("deadline")) {
      return NextResponse.json({ error: "Yêu cầu xử lý quá lâu. Vui lòng thử lại." }, { status: 504 });
    }

    return NextResponse.json({ error: "Gemini xử lý thất bại. Vui lòng thử lại." }, { status: 500 });
  }
}
