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
import { generatePrompt, PromptType } from "@/lib/generate-prompt";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: generatePrompt(PromptType.QnA, question),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Không thể tải phản hồi");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Đã xảy ra lỗi, vui lòng thử lại.";
      console.error("Error fetching Gemini response:", error);
      setResponse(`Lỗi: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="size-8 sm:size-full sm:h-8 hover:bg-pink-100" aria-label="Mở hộp thoại hỏi đáp">
            <CircleHelp className="size-8" /> <span className="hidden sm:block">Hỏi đáp</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-[90%] flex-col p-6 bg-white rounded-lg shadow-lg transition-transform duration-200 ease-out">
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-center text-lg font-bold tracking-tight text-pink-600">HỎI ĐÁP</DrawerTitle>
            <DrawerDescription className="mb-0">
              Bạn gặp vấn đề gì trong quá trình tự luyện tiếng Anh của mình?
              <Textarea
                placeholder="Đặt câu hỏi của bạn ở đây..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="my-2 w-full border rounded-md p-2 focus:border-primary focus:ring-2 focus:ring-primary"
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
              <div className="whitespace-pre-wrap rounded-md p-2">
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
        <Button variant="outline" className="size-8 sm:size-full sm:h-8 hover:bg-pink-100" aria-label="Mở hỏi đáp trên thiết bị di động">
          <CircleHelp className="size-8" /> <span className="hidden sm:block">Hỏi đáp</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex h-full flex-col p-6 bg-white rounded-lg shadow-md transition-transform duration-200 ease-out">
        <DrawerHeader className="-mx-4 text-left">
          <DrawerTitle className="text-center text-lg font-bold tracking-tight text-pink-600">HỎI ĐÁP</DrawerTitle>
          <DrawerDescription className="mb-0 px-[-124px]">
            Bạn muốn hỏi về vấn đề gì trong quá trình tự học tiếng Anh của mình?
            <Textarea
              placeholder="Mô tả câu hỏi của bạn ở đây..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="my-2 w-full border rounded-md p-2 focus:border-primary focus:ring-2 focus:ring-primary"
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
      </DrawerContent>
    </Drawer>
  );
}
