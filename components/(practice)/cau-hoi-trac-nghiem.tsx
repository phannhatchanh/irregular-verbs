"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GeminiLogo } from "@/components/icon";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCheck, Frown, Laugh } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Question {
  question: string;
  level: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function QuizGenerator() {
  const [topic, setTopic] = useState("Động từ bất quy tắt (Irregular Verbs)");
  const [level, setLevel] = useState("Medium (Trung bình)");
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    setError(null);
    setQuestions(null);
    setUserAnswers(Array(numQuestions).fill("")); // Reset user answers
    setScore(0);
    setShowResult(false);

    try {
      const response = await fetch("/api/gemini/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, topic, numQuestions }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate quiz");
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });
  };

  const calculateScore = () => {
    if (!questions) return;

    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        correctCount++;
      }
    }
    setScore(correctCount);
    setShowResult(true);
  };

  const questionOptions = [3, 5, 7, 10];
  const handleNumQuestionsChange = (value: string) => {
    setNumQuestions(parseInt(value, 10));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-pink-600 text-lg font-bold text-center">CÂU HỎI TRẮC NGHIỆM</h1>
          </CardTitle>
          <CardDescription>
            Tự kiểm tra kiếm thức của bạn bằng cách lựa chọn một đáp án đúng với hình thức trắc nghiệm từ một bộ các câu
            hỏi liên quan đến một chủ đề dưới đây:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="topics">Chủ đề</Label>
            <Select onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue placeholder={topic} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="Chọn dạng đúng của động từ (Verb Forms)">
                  Chọn dạng đúng của động từ (Verb Forms)
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Động từ nguyên thể và V-ing (Gerunds and Infinitives)">
                  Động từ nguyên thể và V-ing (Gerunds and Infinitives)
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Động từ khuyết thiếu (Modal Verbs)">
                  Động từ khuyết thiếu (Modal Verbs)
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Động từ bất quy tắt (Irregular Verbs)">
                  Động từ bất quy tắt (Irregular Verbs)
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Chia động từ trong ngoặc (Verb Tense)">
                  Chia động từ trong ngoặc (Verb Tense)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="number-questions">Số câu</Label>
              <Select onValueChange={handleNumQuestionsChange} defaultValue={numQuestions.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder={numQuestions} />
                </SelectTrigger>
                <SelectContent>
                  {questionOptions.map((option) => (
                    <SelectItem className="cursor-pointer" key={option} value={option.toString()}>
                      {option} Câu hỏi
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="questions-level">Cấp độ</Label>
              <Select onValueChange={setLevel} defaultValue={level}>
                <SelectTrigger>
                  <SelectValue placeholder={level} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="Easy (Dễ)">
                    Dễ (Easy)
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Medium (Trung bình)">
                    Trung bình (Medium)
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Hard (Khó)">
                    Khó (Hard)
                  </SelectItem>
                </SelectContent>
              </Select>
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
          <Button variant="outline" onClick={generateQuiz} disabled={loading} className="m-auto">
            <GeminiLogo animate={loading ? true : false} className="!size-5" />
            {loading ? "Đang tạo bộ câu hỏi mới..." : "Tạo bộ câu hỏi mới"}
          </Button>
        </CardFooter>
      </Card>
      {questions && (
        <div>
          <ul>
            {questions.map((q, index) => (
              <li id={`question-${index + 1}`} key={index} className="mt-4">
                <h2 className="flex items-center space-x-2">
                  <span className="inline-flex justify-center items-center rounded px-1 py-0.5 bg-pink-600 text-white font-medium text-sm">
                    Câu {index + 1}
                  </span>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.question}</ReactMarkdown>
                </h2>
                <RadioGroup value={userAnswers[index]} onValueChange={(value) => handleAnswerChange(index, value)}>
                  {q.options.map((option, optionIndex) => (
                    <div className="flex space-x-2" key={optionIndex}>
                      <div className="flex items-center space-x-2 my-1">
                        <RadioGroupItem
                          value={String.fromCharCode(65 + optionIndex)}
                          id={`question-${index + 1}-option-${optionIndex + 1}`}
                        />
                        <Label className="cursor-pointer" htmlFor={`question-${index + 1}-option-${optionIndex + 1}`}>
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </Label>
                      </div>
                    </div>
                  ))}
                  {showResult && (
                    <div className="border p-2 rounded-sm">
                      <p className="space-x-1">
                        {userAnswers[index] === q.correctAnswer ? (
                          <span className="text-green-600">
                            Đúng rồi <Laugh size={22} className="inline-flex stroke-green-600" />
                          </span>
                        ) : (
                          <span className="text-red-600">
                            Sai rồi <Frown size={22} className="inline-flex stroke-red-600" /> (Đáp án là:{" "}
                            {q.correctAnswer})
                          </span>
                        )}
                      </p>
                      <p>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.explanation}</ReactMarkdown>
                      </p>
                    </div>
                  )}
                </RadioGroup>
              </li>
            ))}
          </ul>
          {showResult ? (
            <div className="flex items-center justify-center text-black font-semibold border rounded-md h-9 px-4 py-2 my-4 m-auto">
              Bạn đạt được: {score} / {questions.length} câu hỏi
            </div>
          ) : (
            <Button variant="outline" onClick={calculateScore} className="flex justify-center my-4 m-auto">
              <CheckCheck />
              Kiểm tra kết quả
            </Button>
          )}
        </div>
      )}
    </>
  );
}
