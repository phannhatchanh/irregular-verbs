export function generatePromptExample(verb: string) {
  return `
    Tạo một câu ví dụ ngắn gọn, dễ hiểu, phù hợp với trình độ học sinh trung học cơ sở sử dụng động từ bất quy tắc '${verb}' bằng tiếng Anh.

    Yêu cầu:

    *   Kết quả gồm:
        *   Ví dụ: Một câu tiếng Anh đúng ngữ pháp, không quá 20 từ, chỉ sử dụng động từ '${verb}'.
        *   Nghĩa: Giải thích ý nghĩa câu ví dụ bằng tiếng Việt.
    *   Không cần phân tích ngữ pháp, các dạng khác của động từ, hay bất kỳ giải thích nào ngoài câu ví dụ và nghĩa của nó.
    *   Định dạng kết quả mong muốn:

        - Ví dụ: <câu ví dụ tiếng Anh>
        - Nghĩa: <nghĩa tiếng Việt>


    Ví dụ:
    Nếu '${verb}' là "go", kết quả mong muốn sẽ là:
    Ví dụ: I went to school yesterday.
    Nghĩa: Tôi đã đi học ngày hôm qua.
  `;
}

export function generatePromptExplain(values: string) {
  return `
    Hãy giải thích cách sử dụng động từ bất quy tắc ${values} trong tiếng Anh, đồng thời đưa ra một ví dụ minh họa đúng, chia động từ ${values} ở thì phù hợp với ngữ cảnh của ví dụ. Sau đó, chỉ ra một câu sai sử dụng ${values} (mắc lỗi chia sai thì hoặc dùng sai dạng của động từ) và giải thích cách sửa lại cho đúng, phù hợp với trình độ học sinh trung học cơ sở. Tất cả phải viết bằng tiếng Việt có dấu.

    Yêu cầu:

    *   Giải thích: Cách sử dụng động từ ${values} (nêu rõ các dạng V1, V2, V3 và cách dùng trong các thì phổ biến).
    *   Trường hợp đúng: Một câu ví dụ đúng ngữ pháp, sử dụng động từ ${values} đã được chia ở thì phù hợp.
    *   Trường hợp sai: Một câu ví dụ sai ngữ pháp do chia sai thì hoặc dùng sai dạng của động từ ${values}.
    *   Giải thích sửa lỗi: Giải thích chi tiết lỗi sai trong ví dụ sai và cách sửa lại câu cho đúng.

    Định dạng kết quả mong muốn:
    Giải thích: <Giải thích cách dùng động từ ${values}>
    Trường hợp đúng: <Câu ví dụ đúng>
   Trường hợp sai: <Câu ví dụ sai>
    Giải thích sửa lỗi: <Giải thích lỗi và cách sửa>

    Ví dụ:

    Nếu "${values}" là "go", kết quả mong muốn sẽ là:

    Giải thích: Động từ "go" có các dạng: V1 (go), V2 (went), V3 (gone). "Go" được dùng để diễn tả hành động di chuyển. Thì quá khứ đơn (went) dùng để diễn tả hành động đã xảy ra trong quá khứ.
    Trương hợp đúng: Yesterday, I went to the cinema with my friends.
    Trương hợp sai: I go to the cinema yesterday.
    Giải thích sửa lỗi: Câu sai sử dụng dạng nguyên thể "go" trong khi ngữ cảnh "yesterday" (hôm qua) yêu cầu sử dụng thì quá khứ đơn. Câu đúng phải là "I went to the cinema yesterday."
`;
}
