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
    console.error("Gemini chat error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
