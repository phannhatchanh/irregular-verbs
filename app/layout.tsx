import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bảng động từ bất quy tắc",
  description:
    "Hướng dẫn toàn diện về các động từ bất quy tắc phổ biến trong tiếng Anh để học tập và nắm vững hiệu quả.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
        <Footer />
      </body>
    </html>
  );
}
