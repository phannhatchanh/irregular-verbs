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
      return NextResponse.json(
        { error: "Vui lòng chọn đầy đủ Chủ đề và số lượng câu hỏi (lớn hơn 0) để tiếp tục." },
        { status: 400 }
      );
    }

    const prompt = `Tạo ${numQuestions} câu hỏi trắc nghiệm ở cấp độ ${level} về ${topic} bằng tiếng Anh. Mỗi câu hỏi phải có 4 lựa chọn (A, B, C, D) và chỉ rõ đáp án đúng.

    **YÊU CẦU QUAN TRỌNG:** Trả về *DUY NHẤT VÀ CHÍNH XÁC* một chuỗi JSON hợp lệ. TUYỆT ĐỐI KHÔNG bao gồm bất kỳ văn bản, ký tự, dấu cách thừa, dấu backtick (\`\`\`) hoặc bất kỳ định dạng nào khác bên ngoài JSON. Chuỗi JSON này phải có thể được phân tích cú pháp trực tiếp bằng \`JSON.parse()\`.

    VALUE của KEY luôn luôn bắt buộc là tiếng Việt. Điểm nhấn trong các VALUE luôn luôn sử dụng dấu ** theo cấu trúc như: "Thể bị động của **know** ở thì tương lai đơn là **will be known**".

    **ĐỊNH DẠNG JSON BẮT BUỘC:**

    \`\`\`json
    [
      {
        "question": "Văn bản **câu hỏi** (Tiếng Việt)",
        "options": ["Lựa chọn A (Tiếng Việt)", "Lựa chọn B (Tiếng Việt)", "Lựa chọn C (Tiếng Việt)", "Lựa chọn D (Tiếng Việt)"],
        "correctAnswer": "Đáp án đúng (A, B, C, hoặc D)",
        "explanation": "Văn bản **giải thích** (Tiếng Việt)"
      },
      {
          "question": "Ví dụ câu hỏi 2 **rất hay**",
          "options": ["Đáp án A **tuyệt vời**", "Đáp án B **khá tốt**", "Đáp án C **tạm ổn**", "Đáp án D **không tốt**"],
          "correctAnswer": "A",
          "explanation": "Đây là **giải thích** cho câu hỏi thứ 2"
      },
      ... (tổng cộng ${numQuestions} đối tượng)
    ]
    \`\`\`

    **LƯU Ý:** Đảm bảo JSON được trả về là một mảng JavaScript hợp lệ, không có bất kỳ ký tự thừa nào.
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    responseText = responseText.trim();
    if (responseText.startsWith("```json")) {
      responseText = responseText.substring(7);
    }
    if (responseText.endsWith("```")) {
      responseText = responseText.slice(0, -3);
    }
    // Bước 1: Loại bỏ backtick và khoảng trắng thừa ở đầu và cuối chuỗi
    responseText = responseText.trim();
    responseText = responseText.replace(/^`json/, ""); // Loại bỏ `json ở đầu
    responseText = responseText.replace(/`$/, ""); // Loại bỏ ` ở cuối

    // Bước 2: Giải mã các ký tự HTML entities (nếu có)
    responseText = responseText.replace(/&quot;/g, '"');
    responseText = responseText.replace(/&#39;/g, "'");
    // Có thể thêm các entity khác nếu cần, ví dụ: &amp; &lt; &gt;

    // Bước 3: Loại bỏ các ký tự \ không cần thiết (chú ý xử lý \\)
    responseText = responseText.replace(/\\\\/g, "\\"); // Chuyển \\ thành \
    responseText = responseText.replace(/\\"/g, '"'); // Chuyển \" thành "
    responseText = responseText.replace(/\\'/g, "'"); // Chuyển \' thành '
    responseText = responseText.replace(/\\/g, ""); // Loại bỏ các \ còn lại

    // Bước 4: Kiểm tra và xử lý dấu nháy kép ở đầu và cuối (nếu cần)
    if (responseText.startsWith('"') && responseText.endsWith('"')) {
      responseText = responseText.slice(1, -1);
    }
    // hoặc nếu có thể bắt đầu bằng ' và kết thúc bằng '
    if (responseText.startsWith("'") && responseText.endsWith("'")) {
      responseText = responseText.slice(1, -1);
    }

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
        console.error("Định dạng JSON không hợp lệ từ Gemini:", responseText);
        return NextResponse.json(
          { error: "Định dạng dữ liệu trả về từ hệ thống bị lỗi. Vui lòng thử lại." },
          { status: 500 }
        );
      }

      return NextResponse.json({ questions });
    } catch (jsonError) {
      // If JSON parsing fails, return an error with the raw response for debugging
      console.error("Lỗi phân tích cú pháp JSON:", jsonError);
      console.error("Phản hồi thô từ Gemini (Đã được định dạng):", JSON.stringify(responseText, null, 2)); // In ra JSON đã được định dạng nếu có thể
      console.error("Phản hồi thô từ Gemini (Nguyên văn):", responseText); // Vẫn giữ nguyên bản để so sánh
      return NextResponse.json({ error: "Đã xảy ra lỗi khi xử lý dữ liệu. Vui lòng thử lại." }, { status: 500 });
    }
  } catch (error) {
    console.error("Lỗi:", error);
    return NextResponse.json({ error: "Đã có lỗi xảy ra. Vui lòng thử lại sau." }, { status: 500 });
  }
}
