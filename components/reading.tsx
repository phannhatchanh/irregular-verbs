"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  word: string;
  verb: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ word, verb }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playAudio = () => {
    if (isPlaying) return;

    const url = `https://dict.youdao.com/dictvoice?audio=${word}&type=2`;
    const audio = new Audio(url);
    audio.play();

    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div>
      <button onClick={playAudio} disabled={isPlaying}>
        <span className="font-bold">{verb}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline ml-0.5 size-5 text-gray-600 hover:text-slate-900"
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
      </button>
    </div>
  );
};

export default AudioPlayer;
