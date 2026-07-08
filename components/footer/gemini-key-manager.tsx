"use client";

import React, { useState, useEffect } from "react";
import { Key, HelpCircle, ChevronDown, ChevronUp, Trash2, CheckCircle2, Sparkles, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GeminiGuide } from "@/components/(gemini)/gemini-guide";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function GeminiKeyManager() {
  const [key, setKey] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash-lite");
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkSettings = () => {
      const savedKey = localStorage.getItem("user_gemini_api_key") || "";
      setKey(savedKey);
      setHasSavedKey(!!savedKey);

      const savedModel = localStorage.getItem("user_gemini_model") || "gemini-2.5-flash-lite";
      setModel(savedModel);
    };

    checkSettings();

    window.addEventListener("storage", checkSettings);
    window.addEventListener("gemini-key-changed", checkSettings);
    window.addEventListener("gemini-model-changed", checkSettings);

    return () => {
      window.removeEventListener("storage", checkSettings);
      window.removeEventListener("gemini-key-changed", checkSettings);
      window.removeEventListener("gemini-model-changed", checkSettings);
    };
  }, []);

  const handleSave = () => {
    if (key.trim()) {
      localStorage.setItem("user_gemini_api_key", key.trim());
      setSaved(true);
      setHasSavedKey(true);
      window.dispatchEvent(new Event("gemini-key-changed"));
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleDelete = () => {
    localStorage.removeItem("user_gemini_api_key");
    setKey("");
    setHasSavedKey(false);
    window.dispatchEvent(new Event("gemini-key-changed"));
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    localStorage.setItem("user_gemini_model", value);
    window.dispatchEvent(new Event("gemini-model-changed"));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="size-8 p-0 flex items-center justify-center relative"
                aria-label="Cấu hình Gemini AI"
              >
                <Key className="size-4" />
                {hasSavedKey && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                )}
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cấu hình Gemini AI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-prose bg-white rounded-lg p-6 border shadow-lg flex flex-col max-h-[90dvh]">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-zinc-800 dark:text-zinc-100 font-bold flex items-center gap-2">
            <Sparkles className="size-5 text-pink-600 animate-pulse" />
            Cấu hình Gemini AI
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-xs">
            Chọn mô hình AI phù hợp và cấu hình API Key cá nhân để tối ưu hóa trải nghiệm sử dụng AI.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 min-h-0">
          {/* Model Selection */}
          <div className="flex flex-col gap-2 border-b pb-4">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-pink-500" />
              Chọn Mô hình AI (Gemini Model)
            </label>
            <Select value={model} onValueChange={handleModelChange}>
              <SelectTrigger className="w-full text-sm bg-white dark:bg-zinc-950 border-zinc-200 focus:ring-pink-500 text-zinc-800">
                <SelectValue placeholder="Chọn mô hình..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="antigravity">
                  🚀 Antigravity (Siêu cấp)
                </SelectItem>
                <SelectItem value="gemini-3.1-flash-lite">
                  Gemini 3.1 Flash Lite (Cực nhanh)
                </SelectItem>
                <SelectItem value="gemini-3-flash">
                  Gemini 3 Flash
                </SelectItem>
                <SelectItem value="gemini-3-flash-lite">
                  Gemini 3 Flash Lite
                </SelectItem>
                <SelectItem value="gemini-2.5-flash-lite">
                  Gemini 2.5 Flash Lite (Mặc định)
                </SelectItem>
                <SelectItem value="gemini-2.5-flash">
                  Gemini 2.5 Flash (Khuyên dùng - Cân bằng)
                </SelectItem>
                <SelectItem value="gemini-2.0-flash-lite-preview-02-05">
                  Gemini 2.0 Flash Lite
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* API Key management */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Key className="size-3.5 text-pink-500" />
              API Key Gemini Cá Nhân (<Link href="/gemini-keys" className="text-pink-600 hover:text-pink-700 font-semibold" onClick={() => setOpen(false)}>CÓ SẴN</Link>)
            </label>
            
            {hasSavedKey && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                <span>
                  <strong>Đã lưu API Key:</strong> Hệ thống đang sử dụng API Key cá nhân của bạn.
                </span>
              </div>
            )}

            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Nhập API Key Gemini..."
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                  setSaved(false);
                }}
                className="flex-1 text-sm bg-white dark:bg-zinc-950 border-zinc-200 focus-visible:ring-pink-500 text-pink-600 font-mono"
              />
              <Button
                onClick={handleSave}
                disabled={!key.trim()}
                className="bg-pink-600 hover:bg-pink-700 text-white border-none text-xs"
              >
                {saved ? <Loader2Icon className="size-4 animate-spin" /> : "Lưu"}
              </Button>
              {hasSavedKey && (
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="text-xs p-2 size-9 flex items-center justify-center hover:bg-red-600 hover:text-white"
                  title="Xóa API Key"
                >
                  <Trash2 className="size-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs border-t pt-3">
            <p className="text-zinc-500">
              Cấu hình được lưu an toàn trong trình duyệt (localStorage).
            </p>
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="text-pink-600 dark:text-pink-400 font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto focus:outline-none"
            >
              <HelpCircle className="size-3.5" />
              {showGuide ? "Ẩn hướng dẫn" : "Hướng dẫn lấy Key"}
              {showGuide ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </button>
          </div>

          {showGuide && (
            <div className="overflow-y-auto pr-1 max-h-[250px]">
              <GeminiGuide />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
