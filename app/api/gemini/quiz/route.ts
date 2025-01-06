import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface GenerateQuizRequest {
  level: string;
  topic: string;
  numQuestions: number;
}

export async function POST(request: Request) {
  try {
    const { level, topic, numQuestions } = (await request.json()) as GenerateQuizRequest;

    if (!level || !topic || !numQuestions || numQuestions <= 0) {
      return NextResponse.json({ error: "Topic and a positive number of questions are required" }, { status: 400 });
    }

    const prompt = `Tạo "${numQuestions}" câu hỏi trắc nghiệm ở cấp độ "${level}" về "${topic}" trong tiếng Anh. Mỗi câu hỏi phải có 4 tùy chọn (A, B, C, D) và chỉ rõ câu trả lời đúng. CHỈ trả về một mảng JSON hợp lệ của các đối tượng. KHÔNG bao gồm bất kỳ định dạng Markdown, khối mã hoặc văn bản nào khác bên ngoài JSON. VALUE của KEY luôn luôn bắt buộc là tiếng Việt.
    BẮT BUỘC JSON phải có cấu trúc sau:
    [
      {
        "question": "The 'question' text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option (A, B, C, or D)",
        "explanation": "The 'explanation' text"
      },
      ...
    ]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    try {
      // Attempt to parse the response as JSON
      const questions: Question[] = JSON.parse(responseText);

      // Basic validation of the parsed JSON
      if (
        !Array.isArray(questions) ||
        questions.length !== numQuestions ||
        !questions.every(
          (q) =>
            q.question &&
            q.options &&
            q.options.length === 4 &&
            q.correctAnswer &&
            ["A", "B", "C", "D"].includes(q.correctAnswer.toUpperCase()) &&
            q.explanation
        )
      ) {
        console.error("Invalid JSON format from Gemini:", responseText);
        return NextResponse.json({ error: "Invalid quiz format from Gemini" }, { status: 500 });
      }

      return NextResponse.json({ questions });
    } catch (jsonError) {
      // If JSON parsing fails, return an error with the raw response for debugging
      console.error("JSON parsing error:", jsonError);
      console.error("Raw Gemini Response:", responseText);
      return NextResponse.json(
        { error: "Could not parse quiz from Gemini response. Check server logs for details." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
