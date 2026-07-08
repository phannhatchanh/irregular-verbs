"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generatePrompt, PromptType } from "@/lib/generate-prompt";
import { useState, useContext, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { GeminiLogo } from "@/components/icon";
import { GeminiKeyInput } from "./gemini-key-input";
import { RateLimitContext } from "@/components/popover";

export default function GenerateExample({ verb }: { verb: string }) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rateLimitContext = useContext(RateLimitContext);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const formattedPrompt = generatePrompt(PromptType.Example, verb);
      const userApiKey = typeof window !== "undefined" ? localStorage.getItem("user_gemini_api_key") || "" : "";
      const userModel = typeof window !== "undefined" ? localStorage.getItem("user_gemini_model") || "gemini-2.5-flash-lite" : "gemini-2.5-flash-lite";

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-api-key": userApiKey,
          "x-gemini-model": userModel
        },
        body: JSON.stringify({ prompt: formattedPrompt }),
      });

      if (!res.ok) {
        const errorData = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error || "Không thể tải phản hồi");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi, vui lòng thử lại.";
      setError(msg);
      if (rateLimitContext && (msg.toLowerCase().includes("lượt sử dụng") || msg.toLowerCase().includes("api key") || msg.toLowerCase().includes("rate limit") || msg.toLowerCase().includes("quota"))) {
        rateLimitContext.setHasRateLimitError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [verb, rateLimitContext]);

  useEffect(() => {
    if (rateLimitContext) {
      const unregister = rateLimitContext.registerRetry(handleSubmit);
      return unregister;
    }
  }, [rateLimitContext, handleSubmit]);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-2">
      <Button variant="outline" onClick={handleSubmit} disabled={loading}>
        <GeminiLogo className="!size-5" animate={loading ? true : false} />
        {loading ? "Chờ xíu, đang lấy ví dụ..." : "Tạo ví dụ mới"}
      </Button>

      {error && (
        <div className="space-y-2">
          <div className="text-red-500">{error}</div>
          {!rateLimitContext && (error.toLowerCase().includes("lượt sử dụng") || error.toLowerCase().includes("api key") || error.toLowerCase().includes("rate limit") || error.toLowerCase().includes("quota")) && (
            <GeminiKeyInput onSaved={handleSubmit} />
          )}
        </div>
      )}

      {response && (
        <div className="my-4 rounded-md border p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
