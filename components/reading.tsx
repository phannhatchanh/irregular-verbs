"use client";

import React, { useState } from "react";
import { PlayIcon } from "@/components/icon";

interface AudioPlayerProps {
  word: string;
  verb: string;
  pronunciation: any;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ word, verb, pronunciation }) => {
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-2xl">
        <span className="text-2xl font-bold lowercase">{verb}</span>
        <button onClick={playAudio} disabled={isPlaying} className="flex items-center gap-2">
          <PlayIcon isPlaying={isPlaying} />
          <span>{pronunciation}</span>
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
