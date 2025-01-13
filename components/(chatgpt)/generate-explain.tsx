"use client";

import { useState } from "react";

import { generateCorrection } from "@/lib/generate-correction";
import { generatePromptExplain } from "@/lib/generate-prompt";
import { Button } from "@/components/ui/button";
import { GeminiLogo } from "@/components/icon";

export function GenerateExplain({ verb }: { verb?: string }) {
  const [generatedCorrection, setGeneratedCorrection] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setGeneratedCorrection("");

    const prompt = generatePromptExplain(`${verb}`);

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

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      <div className="flex space-x-2">
        <Button variant="outline" onClick={handleClick} disabled={loading}>
          <GeminiLogo className="!size-5" /> {loading ? "Đợi tí, đang xử lý..." : "Tìm hiểu thêm"}
        </Button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {generatedCorrection && (
        <div className="rounded-md border p-2">
          <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: generatedCorrection }} />
        </div>
      )}
    </div>
  );
}
