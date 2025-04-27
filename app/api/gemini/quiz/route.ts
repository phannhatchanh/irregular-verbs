import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
      return NextResponse.json(
        { error: "Vui lòng chọn đầy đủ Chủ đề và số lượng câu hỏi (lớn hơn 0) để tiếp tục." },
        { status: 400 }
      );
    }

    const prompt = `Tạo "${numQuestions}" câu hỏi trắc nghiệm ở cấp độ "${level}" về "${topic}" trong tiếng Anh. Mỗi câu hỏi phải có 4 tùy chọn (A, B, C, D) và chỉ rõ câu trả lời đúng. CHỈ trả về một mảng JSON hợp lệ của các đối tượng. KHÔNG bao gồm bất kỳ định dạng Markdown, khối mã hoặc văn bản nào khác bên ngoài JSON. VALUE của KEY luôn luôn bắt buộc là tiếng Việt. 
    Điểm nhấn trong các VALUE luôn luôn sử dụng dấu ** theo cấu trúc như: "Thể bị động của **know** ở thì tương lai đơn là **will be known**".
    **YÊU CẦU QUAN TRỌNG:** Trả về *DUY NHẤT VÀ CHÍNH XÁC* một chuỗi JSON hợp lệ. TUYỆT ĐỐI KHÔNG bao gồm bất kỳ văn bản, ký tự, dấu cách thừa, dấu backtick (\`\`\`) hoặc bất kỳ định dạng nào khác bên ngoài JSON. Chuỗi JSON này phải có thể được phân tích cú pháp trực tiếp bằng \`JSON.parse()\`.
    BẮT BUỘC JSON phải có cấu trúc sau:
    [
      {
        "question": "The **question** text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option (A, B, C, or D)",
        "explanation": "The **explanation** text"
      },
      ...
    ]
    **LƯU Ý:** Đảm bảo JSON được trả về là một mảng JavaScript hợp lệ, không có bất kỳ ký tự thừa nào.
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    responseText = responseText.trim(); // Loại bỏ khoảng trắng đầu và cuối
    if (responseText.startsWith("```json")) {
      responseText = responseText.substring(7); // Bỏ "```json"
    }
    if (responseText.endsWith("```")) {
      responseText = responseText.slice(0, -3); // Bỏ "```"
    }
    // Loại bỏ dấu nháy đơn hoặc kép thừa ở đầu và cuối chuỗi nếu có
    if (responseText.startsWith('"') || responseText.startsWith("'")) {
      responseText = responseText.substring(1);
    }
    if (responseText.endsWith('"') || responseText.endsWith("'")) {
      responseText = responseText.slice(0, -1);
    }
    responseText = responseText.replace(/\\"/g, "**");
    responseText = responseText.replace(/'/g, "**");
    responseText = responseText.replace(/\\'/g, "**");

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
        console.error("Định dạng JSON không hợp lệ:", responseText);
        return NextResponse.json(
          { error: "Định dạng dữ liệu trả về từ hệ thống bị lỗi. Vui lòng thử lại." },
          { status: 500 }
        );
      }

      return NextResponse.json({ questions });
    } catch (jsonError) {
      console.error("Lỗi phân tích cú pháp JSON:", jsonError);
      console.error("Phản hồi thô từ Gemini (Đã được định dạng):", JSON.stringify(responseText, null, 2));
      console.error("Phản hồi thô từ Gemini (Nguyên văn):", responseText);
      return NextResponse.json({ error: "Đã xảy ra lỗi khi xử lý dữ liệu. Vui lòng thử lại." }, { status: 500 });
    }
  } catch (error) {
    console.error("Lỗi:", error);
    return NextResponse.json({ error: "Đã có lỗi xảy ra. Vui lòng thử lại sau." }, { status: 500 });
  }
}
