import React from "react";
import type { Metadata } from "next";
import SentenceChallenge from "@/components/(practice)/viet-cau-hoan-chinh";

export const metadata: Metadata = {
  title: "Viết Câu Hoàn Chỉnh (Sentence Challenge)",
  description:
    "Thử thách viết câu hoàn chỉnh với các động từ bất quy tắc. Cải thiện kỹ năng ngữ pháp tiếng Anh và kiểm tra sự chính xác của câu viết một cách nhanh chóng và dễ dàng.",
};

const SentenceChallengePage: React.FC = () => {
  return (
    <div className="m-auto mb-24 mt-10 max-w-2xl gap-6 px-4">
      <SentenceChallenge />
    </div>
  );
};

export default SentenceChallengePage;
