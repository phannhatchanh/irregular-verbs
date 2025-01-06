import ChoiceQuestion from "@/components/(practice)/cau-hoi-trac-nghiem";

const ChoiceQuestionPage = () => {
  return (
    <div className="max-w-2xl m-auto my-10 px-4 gap-6">
      <h1 className="text-pink-600 text-lg font-bold text-center">CÂU HỎI TRẮC NGHIỆM</h1>
      <p className="text-base text-muted-foreground">
        Tự kiểm tra kiếm thức của bạn bằng cách lựa chọn một đáp án đúng với hình thức trắc nghiệm từ một bộ các câu hỏi
        được tạo bởi AI liên quan đến một chủ đề dưới đây:
      </p>
      <ChoiceQuestion />
    </div>
  );
};

export default ChoiceQuestionPage;
