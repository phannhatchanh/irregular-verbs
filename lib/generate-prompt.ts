export function generatePromptExample(verb: string) {
  return `
    Hãy tạo một câu ví dụ ngắn gọn, dễ hiểu, và phù hợp với trình độ học sinh trung học cơ sở sử dụng động từ bất quy tắc '${verb}' bằng tiếng Anh. Yêu cầu:
    - Kết quả gồm:
      + Ví dụ: Một câu tiếng Anh đúng ngữ pháp, không quá 20 từ, chỉ sử dụng động từ '${verb}'.
      + Ngữ nghĩa: Giải thích ý nghĩa câu ví dụ bằng tiếng Việt.
    - Không giải thích cấu trúc câu."
  `;
}

export function generatePromptExplain(values: string) {
  return `
  Hãy giải thích cách sử dụng động từ bất quy tắc ${values} trong tiếng Anh, đồng thời đưa ra một ví dụ minh họa đúng với ${values} trong thì phù hợp với từ ${values}. Sau đó, chỉ ra một câu sai sử dụng ${values} và giải thích cách sửa lại cho đúng, phù hợp với trình độ học sinh trung học cơ sở. Tất cả phải viết bằng tiếng Việt có dấu. 
`;
}
