"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { GeminiGuide } from "./gemini-guide";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GeminiKeyInputProps {
  onSaved?: () => void;
}

export function GeminiKeyInput({ onSaved }: GeminiKeyInputProps) {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasSavedKey, setHasSavedKey] = useState(false);

  useEffect(() => {
    const checkKey = () => {
      const savedKey = localStorage.getItem("user_gemini_api_key") || "";
      setKey(savedKey);
      setHasSavedKey(!!savedKey);
    };

    checkKey();

    window.addEventListener("storage", checkKey);
    window.addEventListener("gemini-key-changed", checkKey);

    return () => {
      window.removeEventListener("storage", checkKey);
      window.removeEventListener("gemini-key-changed", checkKey);
    };
  }, []);

  const handleSave = () => {
    if (key.trim()) {
      localStorage.setItem("user_gemini_api_key", key.trim());
      setSaved(true);
      setHasSavedKey(true);
      setOpen(false);
      window.dispatchEvent(new Event("gemini-key-changed"));
      if (onSaved) {
        onSaved();
      }
    } else {
      localStorage.removeItem("user_gemini_api_key");
      setSaved(false);
      setHasSavedKey(false);
      window.dispatchEvent(new Event("gemini-key-changed"));
    }
  };

  if (hasSavedKey) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2 text-xs border-pink-200 text-pink-600 hover:bg-pink-50 h-8">
          Nhập API Key cá nhân
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-white rounded-lg p-6 border shadow-lg flex flex-col max-h-[90dvh]">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-zinc-800 dark:text-zinc-100 font-bold">Cấu hình API Key Gemini</DialogTitle>
          <DialogDescription className="text-zinc-500 text-xs">
            Sử dụng API Key cá nhân của bạn để tránh giới hạn tần suất.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 min-h-0">
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Nhập API Key Gemini..."
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setSaved(false);
              }}
              className="flex-1 text-sm bg-white dark:bg-zinc-950 border-zinc-200 focus-visible:ring-pink-500 text-pink-600"
            />
            <Button onClick={handleSave} className="bg-pink-600 hover:bg-pink-700 text-white border-none text-xs">
              {saved ? "Đã lưu" : "Lưu & Thử lại"}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs border-t pt-3">
            <p className="text-zinc-500">
              Key được lưu an toàn trong trình duyệt (localStorage).
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
            <div className="overflow-y-auto pr-1">
              <GeminiGuide />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
