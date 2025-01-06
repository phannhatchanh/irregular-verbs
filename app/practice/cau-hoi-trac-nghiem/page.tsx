import { Metadata } from "next";
import ChoiceQuestion from "@/components/(practice)/cau-hoi-trac-nghiem";

export const metadata: Metadata = {
  title: "Luyện tập trắc nghiệm",
  description:
    "Tự kiểm tra kiếm thức của bạn bằng cách lựa chọn một chủ đề với những câu hỏi trắc nghiệm được tạo ra bằng AI",
};

const ChoiceQuestionPage = () => {
  return (
    <div className="max-w-2xl m-auto mt-10 mb-24 px-4 gap-6">
      <ChoiceQuestion />
    </div>
  );
};

export default ChoiceQuestionPage;
