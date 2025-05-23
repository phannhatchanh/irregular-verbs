import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GeminiLogo({ className, animate = false }: { className?: string; animate?: boolean }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      className={cn("w-[52px] h-[52px]", className)}
      initial={animate ? { rotate: 0 } : undefined}
      animate={animate ? { rotate: 360 } : undefined}
      transition={
        animate
          ? {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }
          : undefined
      }
    >
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.554 41.2204C24.92 44.3354 25.603 47.6638 25.603 51.2055C25.603 47.6638 26.264 44.3354 27.587 41.2204C28.952 38.1054 30.787 35.3958 33.091 33.0916C35.396 30.7873 38.105 28.9738 41.22 27.651C44.335 26.2855 47.664 25.6028 51.205 25.6028C47.664 25.6028 44.335 24.9414 41.22 23.6185C38.105 22.2531 35.396 20.4182 33.091 18.114C30.787 15.8097 28.952 13.1001 27.587 9.98507C26.264 6.87007 25.603 3.54171 25.603 0C25.603 3.54171 24.92 6.87007 23.554 9.98507C22.232 13.1001 20.418 15.8097 18.114 18.114C15.81 20.4182 13.1 22.2531 9.985 23.6185C6.87 24.9414 3.542 25.6028 0 25.6028C3.542 25.6028 6.87 26.2855 9.985 27.651C13.1 28.9738 15.81 30.7873 18.114 33.0916C20.418 35.3958 22.232 38.1054 23.554 41.2204Z"
        fill="url(#paint0_linear_39_18)"
        initial={!animate ? { scale: 0.8, opacity: 0 } : undefined}
        animate={!animate ? { scale: 1, opacity: 1 } : undefined}
        transition={
          !animate
            ? {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }
            : undefined
        }
      />
      <defs>
        <motion.linearGradient
          id="paint0_linear_39_18"
          gradientUnits="userSpaceOnUse"
          initial={!animate ? { x1: "6", y1: "44", x2: "42", y2: "38" } : undefined}
          animate={
            !animate
              ? {
                  x1: ["6", "12", "6"],
                  y1: ["44", "50", "44"],
                  x2: ["42", "48", "42"],
                  y2: ["38", "44", "38"],
                }
              : undefined
          }
          transition={
            !animate
              ? {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : undefined
          }
        >
          {animate ? (
            <>
              <stop offset="0" stopColor="#439DDF" />
              <stop offset="0.524208" stopColor="#4F87ED" />
              <stop offset="0.781452" stopColor="#9476C5" />
              <stop offset="0.888252" stopColor="#BC688E" />
              <stop offset="1" stopColor="#D6645D" />
            </>
          ) : (
            <>
              <motion.stop
                animate={{
                  stopColor: ["#439DDF", "#4F87ED", "#439DDF"],
                }}
                offset="0"
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.stop
                animate={{
                  stopColor: ["#4F87ED", "#9476C5", "#4F87ED"],
                }}
                offset="0.5"
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.stop
                animate={{
                  stopColor: ["#9476C5", "#BC688E", "#9476C5"],
                }}
                offset="0.8"
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.stop
                animate={{
                  stopColor: ["#BC688E", "#D6645D", "#BC688E"],
                }}
                offset="1"
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
}

export const PlayIcon: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline size-8 text-gray-600 hover:text-slate-900"
    >
      <motion.polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <motion.path
        d="M15.54 8.46a5 5 0 0 1 0 7.07"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: isPlaying ? 0.4 : 0.7 }}
      />
      <motion.path
        d="M19.07 4.93a10 10 0 0 1 0 14.14"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: isPlaying ? 0.7 : 0.4 }}
      />
    </svg>
  );
};
