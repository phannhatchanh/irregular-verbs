"use client";

import { useState } from "react";
import { CircleHelp } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { GeminiLogo } from "@/components/icon";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function QuestionAndAnswer() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Bạn là một trợ lý dạy tiếng Anh cho học sinh trung học.
      
          **Hướng dẫn:**
          
          *   Bạn chỉ trả lời các câu hỏi liên quan đến tiếng Anh, bao gồm ngữ pháp, từ vựng, phát âm, kỹ năng (nghe, nói, đọc, viết), và văn hóa liên quan đến tiếng Anh.
          *   Câu trả lời cần ngắn gọn, đầy đủ ý, và dễ hiểu đối với học sinh trung học.
          *   Sử dụng tiếng Việt trong câu trả lời.
          *   Chỉ trả về định dạng text không có enter xuống dòng quá 2 lần. Không sử dụng bất kỳ định dạng nào khác như code block, markdown, list, bảng, hình ảnh,...
          *   Nếu câu hỏi không liên quan đến tiếng Anh, hãy từ chối trả lời một cách hài hước và lịch sự nhưng phải đa dạng cách từ chối làm cho người dùng thích thú. Ví dụ: "Câu hỏi này thú vị đấy, nhưng tiếc là tôi chỉ giỏi tiếng Anh thôi." Đồng gợi ý một vài câu hỏi liên quan đến tiếng Anh.
          
          **Câu hỏi:** "${question}"`,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error: any) {
      console.error("Error fetching Gemini response:", error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="size-8 sm:size-full sm:h-8">
            <CircleHelp className="size-8" /> <span className="hidden sm:block">Hỏi đáp</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-[90%] flex-col p-4 sm:max-w-[full]">
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-center text-lg font-bold tracking-tight text-pink-600">HỎI ĐÁP</DrawerTitle>
            <DrawerDescription className="mb-0">
              Bạn gặp vấn để gì trong quá trình tự luyện tiếng Anh của mình?
              <Textarea
                placeholder="Đặt câu hỏi của bạn ở đây..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="my-2 text-pink-600"
              />
              <span className="flex justify-center">
                <Button variant="outline" onClick={handleSubmit} disabled={loading} className="m-auto w-auto">
                  <GeminiLogo animate={loading ? true : false} className="!size-5" />
                  {loading ? "Đang xử lý câu hỏi..." : "Trả lời"}
                </Button>
              </span>
            </DrawerDescription>
          </DrawerHeader>

          {response && (
            <ScrollArea>
              <div className="whitespace-pre-wrap rounded-md border bg-gray-100 p-2">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="size-8 sm:size-full sm:h-8">
          <CircleHelp className="size-8" /> <span className="hidden sm:block">Hỏi đáp</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex h-full flex-col px-4 pb-4">
        <DrawerHeader className="-mx-4 text-left">
          <DrawerTitle className="text-center text-lg font-bold tracking-tight text-pink-600">HỎI ĐÁP</DrawerTitle>
          <DrawerDescription className="mb-0 px-[-124px]">
            Bạn muốn hỏi về vấn để gì trong quá trình tự học tiếng Anh của mình?
            <Textarea
              placeholder="Mô tả câu hỏi của bạn ở đây..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="my-2 text-pink-600"
            />
            <span className="flex justify-center">
              <Button variant="outline" onClick={handleSubmit} disabled={loading}>
                <GeminiLogo animate={loading ? true : false} className="!size-5" />
                {loading ? "Đang xử lý câu hỏi..." : "Trả lời"}
              </Button>
            </span>
          </DrawerDescription>
        </DrawerHeader>
        {response && (
          <ScrollArea>
            <div className="whitespace-pre-wrap rounded-md border bg-gray-100 p-2">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
            </div>
          </ScrollArea>
        )}
      </DrawerContent>
    </Drawer>
  );
}
