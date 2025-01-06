"use client";

import ReactMarkdown from "react-markdown";
import { generatePromptExplain } from "@/lib/generate-prompt";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GeminiLogo } from "@/components/icon";
import remarkGfm from "remark-gfm";

export default function GenerateExplain({ verb }: { verb: string }) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const formattedPrompt = generatePromptExplain(verb);

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: formattedPrompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      <div className="mt-4 flex space-x-2">
        <Button variant="outline" onClick={handleSubmit} disabled={loading}>
          <GeminiLogo className="!size-5" animate={loading ? true : false} />
          {loading ? "Đợi tí, đang xử lý..." : "Tìm hiểu thêm"}
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}

      {response && (
        <div className="my-4 rounded-md border p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
