export enum PromptType {
  Example = "example",
  Explain = "explain",
  SentenceCheck = "sentence_check",
  QnA = "qna",
}

/**
 * Unified prompt generator cho ứng dụng luyện động từ bất quy tắc.
 * Tất cả prompt bằng tiếng Việt, dành cho học sinh trung học cơ sở.
 */
export function generatePrompt(type: PromptType, value: string, extra?: string): string {
  switch (type) {
    case PromptType.Example:
      return `
Tạo một câu ví dụ ngắn gọn, dễ hiểu, phù hợp với trình độ học sinh trung học cơ sở sử dụng động từ bất quy tắc '${value}' bằng tiếng Anh.

Yêu cầu:
*   Kết quả gồm:
    *   Ví dụ: Một câu tiếng Anh đúng ngữ pháp, không quá 20 từ, chỉ sử dụng động từ '${value}'.
    *   Nghĩa: Giải thích ý nghĩa câu ví dụ bằng tiếng Việt.
*   Không cần phân tích ngữ pháp, các dạng khác của động từ, hay bất kỳ giải thích nào ngoài câu ví dụ và nghĩa của nó.
*   Định dạng kết quả mong muốn:
    - Ví dụ: <câu ví dụ tiếng Anh>
    - Nghĩa: <nghĩa tiếng Việt>

Ví dụ: Nếu '${value}' là "go", kết quả mong muốn sẽ là:
Ví dụ: I went to school yesterday.
Nghĩa: Tôi đã đi học ngày hôm qua.
      `.trim();

    case PromptType.Explain:
      return `
Hãy giải thích cách sử dụng động từ bất quy tắc ${value} trong tiếng Anh, đồng thời đưa ra một ví dụ minh họa đúng, chia động từ ${value} ở thì phù hợp với ngữ cảnh của ví dụ. Sau đó, chỉ ra một câu sai sử dụng ${value} (mắc lỗi chia sai thì hoặc dùng sai dạng của động từ) và giải thích cách sửa lại cho đúng, phù hợp với trình độ học sinh trung học cơ sở. Tất cả phải viết bằng tiếng Việt có dấu.

Yêu cầu:
*   Giải thích: Cách sử dụng động từ ${value} (nêu rõ các dạng V1, V2, V3 và cách dùng trong các thì phổ biến).
*   Trường hợp đúng: Một câu ví dụ đúng ngữ pháp, sử dụng động từ ${value} đã được chia ở thì phù hợp.
*   Trường hợp sai: Một câu ví dụ sai ngữ pháp do chia sai thì hoặc dùng sai dạng của động từ ${value}.
*   Giải thích sửa lỗi: Giải thích chi tiết lỗi sai trong ví dụ sai và cách sửa lại câu cho đúng.

Định dạng kết quả mong muốn:
Giải thích: <Giải thích cách dùng động từ ${value}>
Trường hợp đúng: <Câu ví dụ đúng>
Trường hợp sai: <Câu ví dụ sai>
Giải thích sửa lỗi: <Giải thích lỗi và cách sửa>

Ví dụ: Nếu "${value}" là "go", kết quả mong muốn sẽ là:
Giải thích: Động từ "go" có các dạng: V1 (go), V2 (went), V3 (gone). "Go" được dùng để diễn tả hành động di chuyển. Thì quá khứ đơn (went) dùng để diễn tả hành động đã xảy ra trong quá khứ.
Trường hợp đúng: Yesterday, I went to the cinema with my friends.
Trường hợp sai: I go to the cinema yesterday.
Giải thích sửa lỗi: Câu sai sử dụng dạng nguyên thể "go" trong khi ngữ cảnh "yesterday" (hôm qua) yêu cầu sử dụng thì quá khứ đơn. Câu đúng phải là "I went to the cinema yesterday."
      `.trim();

    case PromptType.SentenceCheck:
      // value = từ cần dùng, extra = câu người dùng nhập
      return `
Là một chuyên gia ngôn ngữ Anh. Vui lòng kiểm tra xem câu sau có đúng ngữ pháp khi sử dụng từ '${value}' hay không: '${extra ?? ""}'. Nếu không đúng, hãy giải thích lý do và đề xuất cách sửa câu cho phù hợp. Đồng thời cho điểm với câu '${extra ?? ""}' với thang điểm 0 đến 10 (Câu bạn đạt:.../10). CHẮC CHẮN phải theo cấu trúc sau:
- Bạn thử thách với từ: **${value}**
- Câu bạn viết là: **${extra ?? ""}**
- Kết quả: Đúng/Sai
- Tính tự nhiên: (Tốt/Khá/Trung bình/Kém) Đánh giá mức độ tự nhiên của câu trong tiếng Anh.
- Phong cách: (Phù hợp/Không phù hợp) Đánh giá xem câu có phù hợp với ngữ cảnh chung hay không.
- Lỗi gặp phải: Loại lỗi (nếu có)
- Giải thích: Giải thích chi tiết lỗi (nếu có)
- Giải thích cơ sở của việc sửa lỗi (nếu có)
- Đề xuất sửa lại: **Đề xuất sửa lỗi (nếu có)**
- Điểm: **Điểm/10** (Giải thích tổng quan về câu và điểm số)
      `.trim();

    case PromptType.QnA:
      // value = câu hỏi người dùng nhập
      return `
Bạn là một trợ lý dạy tiếng Anh cho học sinh trung học.

**Hướng dẫn:**
*   Bạn chỉ trả lời các câu hỏi liên quan đến tiếng Anh, bao gồm ngữ pháp, từ vựng, phát âm, kỹ năng (nghe, nói, đọc, viết), và văn hóa liên quan đến tiếng Anh.
*   Câu trả lời cần ngắn gọn, đầy đủ ý, và dễ hiểu đối với học sinh trung học.
*   Sử dụng tiếng Việt trong câu trả lời.
*   Chỉ trả về định dạng text không có enter xuống dòng quá 2 lần. Không sử dụng bất kỳ định dạng nào khác như code block, markdown, list, bảng, hình ảnh,...
*   Nếu câu hỏi không liên quan đến tiếng Anh, hãy từ chối trả lời một cách hài hước và lịch sự nhưng phải đa dạng cách từ chối làm cho người dùng thích thú. Ví dụ: "Câu hỏi này thú vị đấy, nhưng tiếc là tôi chỉ giỏi tiếng Anh thôi." Đồng gợi ý một vài câu hỏi liên quan đến tiếng Anh.

**Câu hỏi:** "${value}"
      `.trim();

    default:
      return "";
  }
}
