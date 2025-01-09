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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
          *   Nếu câu hỏi không liên quan đến tiếng Anh, hãy từ chối trả lời một cách hài hước và lịch sự. Ví dụ: "Câu hỏi này thú vị đấy, nhưng tiếc là tôi chỉ giỏi tiếng Anh thôi."
          
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
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="h-8" asChild>
                  <p>
                    <CircleHelp className="size-8" /> <span className="hidden sm:block">Hỏi đáp</span>
                  </p>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hỏi đáp với AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent className="flex flex-col h-[90%] p-4 sm:max-w-[full]">
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-pink-600 text-lg font-bold text-center tracking-tight">HỎI ĐÁP</DrawerTitle>
            <DrawerDescription className="mb-0">
              Bạn gặp vấn để gì trong quá trình tự luyện tiếng Anh của mình?
              <div className="text-center mt-2 space-y-2">
                <Textarea
                  placeholder="Đặt câu hỏi của bạn ở đây..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="text-pink-600"
                />
                <Button variant="outline" onClick={handleSubmit} disabled={loading} className="w-auto">
                  <GeminiLogo animate={loading ? true : false} className="!size-5" />
                  {loading ? "Đang xử lý câu hỏi..." : "Trả lời"}
                </Button>
              </div>
            </DrawerDescription>
          </DrawerHeader>

          {response && (
            <ScrollArea>
              <div className="border rounded-md p-2 bg-gray-100 whitespace-pre-wrap">
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
      <DrawerTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="size-8 sm:size-0 p-1.5" variant="outline" asChild>
                <p>
                  <CircleHelp className="size-8" /> <span className="hidden sm:block">Hỏi đáp</span>
                </p>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hỏi đáp với AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col h-full px-4 pb-4">
        <DrawerHeader className="-mx-4 text-left">
          <DrawerTitle className="text-pink-600 text-lg font-bold text-center tracking-tight">HỎI ĐÁP</DrawerTitle>
          <DrawerDescription className="mb-0 px-[-124px]">
            Bạn muốn hỏi về vấn để gì trong quá trình tự học tiếng Anh của mình?
            <div className="text-center mt-2 space-y-2">
              <Textarea
                placeholder="Mô tả câu hỏi của bạn ở đây..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="text-pink-600"
              />
              <Button variant="outline" onClick={handleSubmit} disabled={loading}>
                <GeminiLogo animate={loading ? true : false} className="!size-5" />
                {loading ? "Đang xử lý câu hỏi..." : "Trả lời"}
              </Button>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        {response && (
          <ScrollArea>
            <div className="border rounded-md p-2 bg-gray-100 whitespace-pre-wrap">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
            </div>
          </ScrollArea>
        )}
      </DrawerContent>
    </Drawer>
  );
}
