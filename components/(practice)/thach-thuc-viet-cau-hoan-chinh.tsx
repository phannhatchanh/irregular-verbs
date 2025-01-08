"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GeminiLogo } from "@/components/icon";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import irregularVerbsData from "../../data.json";
import { Label } from "../ui/label";

const SentenceChallenge = () => {
  const [randomWord, setRandomWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * irregularVerbsData.length);
    return irregularVerbsData[randomIndex].word;
  };

  useEffect(() => {
    setRandomWord(getRandomWord());
  }, []);

  const handleGetRandomWord = () => {
    setLoading(true);
    setApiResponse("");
    setUserInput("");
    setTimeout(() => {
      setRandomWord(getRandomWord());
      setLoading(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleCheck = async () => {
    setChecking(true);
    setError("");
    setApiResponse("");

    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Vui lòng kiểm tra xem câu sau có đúng ngữ pháp khi sử dụng từ '${randomWord}' hay không: '${userInput}'. Nếu không đúng, hãy giải thích lý do và đề xuất cách sửa câu cho phù hợp. Đồng thời cho điểm với câu '${userInput}' với thang điểm 0 đến 10 (Câu bạn đạt:.../10).`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from API");
      }

      const data = await res.json();
      setApiResponse(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-pink-600 text-lg font-bold text-center">VIẾT CÂU HOÀN CHỈNH</h1>
          </CardTitle>
          <CardDescription>
            Cải thiện kỹ năng ngữ pháp tiếng Anh và kiểm tra sự chính xác của câu viết một cách nhanh chóng và dễ dàng
            nhờ công nghệ AI
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="topics">
                Thử sức với động từ <span className="font-bold bg-yellow-200 p-1 rounded">{randomWord}</span>
              </Label>
              <Button
                variant="link"
                className="text-blue-600 m-0 p-0 ml-2"
                onClick={handleGetRandomWord}
                disabled={loading}
              >
                Đổi từ khác
              </Button>
            </div>
            <div className="w-full">
              <Input
                type="text"
                placeholder={`Viết một câu có sử dụng từ: '${randomWord}'`}
                value={userInput}
                onChange={handleInputChange}
                disabled={loading || checking}
                className="text-pink-600"
              />
            </div>
          </div>
          {error && (
            <CardDescription>
              <Label htmlFor="error" className="text-red-500">
                Lỗi: {error}
              </Label>
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="justify-between space-x-2">
          <Button variant="outline" onClick={handleCheck} disabled={checking || !userInput.trim()} className="m-auto">
            <GeminiLogo animate={checking ? true : false} className="!size-5" />
            {checking ? "Đang kiểm tra..." : "Kiểm tra"}
          </Button>
        </CardFooter>
      </Card>

      {apiResponse && (
        <div className="whitespace-pre-line mt-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{apiResponse}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default SentenceChallenge;
