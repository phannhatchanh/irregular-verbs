"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generatePrompt, PromptType } from "@/lib/generate-prompt";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GeminiLogo } from "@/components/icon";

export default function GenerateExample({ verb }: { verb: string }) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const formattedPrompt = generatePrompt(PromptType.Example, verb);

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: formattedPrompt }),
      });

      if (!res.ok) {
        const errorData = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error || "Không thể tải phản hồi");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-2">
      <Button variant="outline" onClick={handleSubmit} disabled={loading}>
        <GeminiLogo className="!size-5" animate={loading ? true : false} />
        {loading ? "Chờ xíu, đang lấy ví dụ..." : "Tạo ví dụ mới"}
      </Button>

      {error && <div className="text-red-500">{error}</div>}

      {response && (
        <div className="my-4 rounded-md border p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
