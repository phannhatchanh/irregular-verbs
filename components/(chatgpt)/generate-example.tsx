"use client";

import { useState, useEffect } from "react";

import { generateCorrection } from "@/lib/generate-correction";
import { generatePromptExample } from "@/lib/generate-prompt";
import { GeminiLogo } from "@/components/icon";
import { Button } from "@/components/ui/button";

export function GenerateExample({ verb }: { verb?: string }) {
  const [generatedCorrection, setGeneratedCorrection] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateExample = async () => {
    setLoading(true);
    setError(null);
    setGeneratedCorrection("");

    const prompt = generatePromptExample(`${verb}`);

    try {
      const response = await generateCorrection(prompt);

      if (!response.ok) {
        throw new Error("Failed to fetch correction.");
      }

      const data = response.body;
      if (!data) {
        setError("No response from the server.");
        setLoading(false);
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setGeneratedCorrection((prev) => prev + chunkValue);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (verb) {
      setGeneratedCorrection("");
      setError(null);
    }
  }, [verb]);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      <Button variant="outline" onClick={generateExample} disabled={loading || !verb}>
        <GeminiLogo className="mt-2 !size-6" />
        {loading ? "Chờ xíu, đang lấy ví dụ..." : "Tạo ví dụ mới"}
      </Button>

      {error && <div className="text-red-500">{error}</div>}

      {generatedCorrection && (
        <div className="my-4 rounded-md border p-4">
          <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: generatedCorrection }} />
        </div>
      )}
    </div>
  );
}
