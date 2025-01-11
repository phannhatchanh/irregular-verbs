import { Metadata } from "next";
import ChoiceQuestion from "@/components/(practice)/cau-hoi-trac-nghiem";

export const metadata: Metadata = {
  title: "Luyện tập trắc nghiệm",
  description:
    "Tự kiểm tra kiếm thức của bạn bằng cách lựa chọn một chủ đề với những câu hỏi trắc nghiệm được tạo ra bằng AI",
};

const ChoiceQuestionPage = () => {
  return (
    <div className="m-auto mb-24 mt-10 max-w-2xl gap-6 px-4">
      <ChoiceQuestion />
    </div>
  );
};

export default ChoiceQuestionPage;
