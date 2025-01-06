import React from "react";
import type { Metadata } from "next";
import SentenceChallenge from "@/components/(practice)/thach-thuc-viet-cau-hoan-chinh";

export const metadata: Metadata = {
  title: "Thách Thức Viết Câu Hoàn Chỉnh (Sentence Challenge)",
  description:
    "Thử thách viết câu hoàn chỉnh với các động từ bất quy tắc. Cải thiện kỹ năng ngữ pháp tiếng Anh và kiểm tra sự chính xác của câu viết một cách nhanh chóng và dễ dàng.",
};

const SentenceChallengePage: React.FC = () => {
  return (
    <div className="max-w-2xl m-auto my-10 px-4 gap-6">
      <h1 className="text-pink-600 text-lg font-bold text-center">THÁCH THỨC VIẾT CÂU HOÀN CHỈNH</h1>
      <p className="text-base text-muted-foreground">
        Cải thiện kỹ năng ngữ pháp tiếng Anh và kiểm tra sự chính xác của câu viết một cách nhanh chóng và dễ dàng nhờ
        công nghệ AI.
      </p>
      <SentenceChallenge />
    </div>
  );
};

export default SentenceChallengePage;
