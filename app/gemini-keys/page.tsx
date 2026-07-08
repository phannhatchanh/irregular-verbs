"use client";

import { useState } from "react";
import { Key, Copy, Check, Eye, EyeOff, Lock, Unlock, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ==============================================================
//  Cấu hình: Thay đổi mật khẩu và danh sách key tại đây
// ==============================================================
const ACCESS_PASSWORD = "dtntcanglong";

const GEMINI_KEYS: { label: string; key: string; note?: string }[] = [
  {
    label: "Key 1",
    key: process.env.NEXT_PUBLIC_GEMINI_API_KEY_1 as string,
    note: "Dùng chung",
  },
  {
    label: "Key 2",
    key: process.env.NEXT_PUBLIC_GEMINI_API_KEY_2 as string,
    note: "Khi Key 1 hết hạn mức",
  },
  {
    label: "Key 3",
    key: process.env.NEXT_PUBLIC_GEMINI_API_KEY_3 as string,
    note: "Khi Key 1 & 2 hết hạn mức",
  },
];
// ==============================================================

function KeyCard({ item }: { item: (typeof GEMINI_KEYS)[0] }) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = item.key;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const maskedKey = item.key.slice(0, 8) + "•".repeat(Math.max(0, item.key.length - 12)) + item.key.slice(-4);

  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-pink-200">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 ring-1 ring-pink-100">
            <Key className="h-4 w-4 text-pink-500" />
          </div>
          <span className="font-semibold text-zinc-800">{item.label}</span>
        </div>
        {item.note && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-100">
            {item.note}
          </span>
        )}
      </div>

      {/* Key value */}
      <div className="flex items-center gap-2 rounded-lg bg-zinc-50 border border-zinc-100 px-3 py-2.5">
        <code className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-zinc-700 select-all">
          {visible ? item.key : maskedKey}
        </code>
        <button
          onClick={() => setVisible((v) => !v)}
          className="shrink-0 text-zinc-400 hover:text-zinc-600 transition-colors"
          title={visible ? "Ẩn key" : "Hiện key"}
          aria-label={visible ? "Ẩn key" : "Hiện key"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {/* Copy button */}
      <Button
        onClick={handleCopy}
        className={`w-full gap-2 text-sm transition-all duration-200 ${
          copied
            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
            : "bg-pink-600 hover:bg-pink-700 text-white"
        }`}
        id={`copy-btn-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Đã sao chép!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Sao chép Key
          </>
        )}
      </Button>
    </div>
  );
}

export default function GeminiKeysPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleUnlock = () => {
    if (password === ACCESS_PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (!unlocked) {
    return (
      <div className="flex min-h-[calc(100dvh-80px)] items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-200">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-800">Khu vực bảo mật</h1>
            <p className="mt-1.5 text-sm text-zinc-500">Nhập mật khẩu để xem danh sách API Key</p>
          </div>

          {/* Password form */}
          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <label className="text-xs font-semibold text-zinc-600 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Mật khẩu truy cập
            </label>
            <div className="relative">
              <Input
                id="access-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                placeholder="Nhập mật khẩu..."
                className={`pr-10 font-mono ${error ? "border-red-400 focus-visible:ring-red-400" : "focus-visible:ring-pink-400"}`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                aria-label={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                ⚠ Mật khẩu không đúng. Vui lòng thử lại.
              </p>
            )}
            <Button
              id="unlock-btn"
              onClick={handleUnlock}
              className="mt-1 w-full bg-pink-600 hover:bg-pink-700 text-white gap-2"
            >
              <Unlock className="h-4 w-4" />
              Mở khóa
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-auto mb-24 mt-10 max-w-2xl gap-6 px-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-200">
          <Sparkles className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-xl font-bold text-pink-600 sm:text-2xl">GEMINI API KEYS</h1>
        <p className="mt-1.5 text-sm text-zinc-500">
          Chọn và sao chép key bên dưới, sau đó dán vào phần{" "}
          <strong className="text-zinc-700">Cấu hình Gemini AI</strong> ở thanh công cụ.
        </p>
      </div>

      {/* How to use */}
      <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">📋 Hướng dẫn sử dụng:</p>
        <ol className="list-decimal ml-4 space-y-1 text-blue-700">
          <li>Nhấn nút <strong>Sao chép Key</strong> trên một trong các key bên dưới.</li>
          <li>Quay lại trang chủ, nhấn biểu tượng <strong>🔑</strong> ở thanh footer.</li>
          <li>Dán key vào ô <em>API Key Gemini Cá Nhân</em> và nhấn <strong>Lưu</strong>.</li>
        </ol>
      </div>

      {/* Key cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {GEMINI_KEYS.map((item) => (
          <KeyCard key={item.label} item={item} />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-zinc-400">
        🔒 Trang này được bảo vệ bằng mật khẩu. Vui lòng không chia sẻ key công khai.
      </p>
    </div>
  );
}
