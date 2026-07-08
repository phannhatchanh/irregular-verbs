"use client";

import React from "react";
import { ExternalLink, Key } from "lucide-react";

export function GeminiGuide() {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm space-y-4">
      <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
        <Key className="size-4 text-pink-500" />
        Hướng dẫn lấy API Key Gemini miễn phí
      </h3>
      <ol className="space-y-3 relative border-l border-zinc-200 dark:border-zinc-800 ml-2.5 pl-4 text-zinc-600 dark:text-zinc-400">
        <li className="relative">
          <div className="absolute -left-[27px] mt-0.5 flex items-center justify-center size-5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold border-2 border-white dark:border-zinc-900">
            1
          </div>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Truy cập Google AI Studio:</span>
          <p className="mt-0.5">
            Mở trang{" "}
            <a
              href="https://aistudio.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              Google AI Studio
              <ExternalLink className="size-3" />
            </a>{" "}
            và đăng nhập bằng tài khoản Google của bạn.
          </p>
        </li>
        <li className="relative">
          <div className="absolute -left-[27px] mt-0.5 flex items-center justify-center size-5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold border-2 border-white dark:border-zinc-900">
            2
          </div>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Tạo API Key mới:</span>
          <p className="mt-0.5">
            Nhấp vào nút <span className="font-semibold text-pink-600 dark:text-pink-400">"Get API key"</span> hoặc{" "}
            <span className="font-semibold text-pink-600 dark:text-pink-400">"Create API key"</span> (thường ở góc trái màn hình).
          </p>
        </li>
        <li className="relative">
          <div className="absolute -left-[27px] mt-0.5 flex items-center justify-center size-5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold border-2 border-white dark:border-zinc-900">
            3
          </div>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Xác nhận tạo key:</span>
          <p className="mt-0.5">
            Chọn dự án của bạn (hoặc chọn dự án mặc định của Google Cloud) và nhấn nút tạo key.
          </p>
        </li>
        <li className="relative">
          <div className="absolute -left-[27px] mt-0.5 flex items-center justify-center size-5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold border-2 border-white dark:border-zinc-900">
            4
          </div>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Sao chép API Key:</span>
          <p className="mt-0.5">
            Sao chép chuỗi ký tự bắt đầu bằng <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-pink-600 font-mono">AQ.Ab8R...</code> và dán vào ô nhập liệu ở trên, sau đó nhấn <span className="font-semibold">Lưu & Thử lại</span>.
          </p>
        </li>
      </ol>
      <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-2 rounded border border-zinc-100 dark:border-zinc-900">
        💡 <strong>Lưu ý:</strong> API Key cá nhân của bạn hoàn toàn miễn phí và tuân thủ giới hạn Rate Limit riêng của tài khoản cá nhân (thường là 15 yêu cầu/phút, rất thoải mái cho mục đích tự học).
      </div>
    </div>
  );
}
