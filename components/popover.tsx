import { FC, ReactNode, useState, createContext, useRef, useCallback } from "react";
import { cn, highlightSearchTerm } from "@/lib/utils";

import { Popover, PopoverContent, PopoverArrow, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import GenerateExplain from "@/components/(gemini)/generate-explain";
import { GeminiKeyInput } from "@/components/(gemini)/gemini-key-input";

interface RateLimitContextType {
  hasRateLimitError: boolean;
  setHasRateLimitError: (val: boolean) => void;
  registerRetry: (cb: () => void) => () => void;
}

export const RateLimitContext = createContext<RateLimitContextType | null>(null);

interface PopoverVerbProps {
  verb: string;
  children: ReactNode;
  colorVariant?: "blue" | "green" | "pink";
  searchTerm: string;
}

export const PopoverVerb: FC<PopoverVerbProps> = ({ verb, children, colorVariant, searchTerm }) => {
  const [showExplain, setShowExplain] = useState(false);
  const [hasRateLimitError, setHasRateLimitError] = useState(false);
  const retryCallbacks = useRef<(() => void)[]>([]);

  const registerRetry = useCallback((cb: () => void) => {
    retryCallbacks.current.push(cb);
    return () => {
      retryCallbacks.current = retryCallbacks.current.filter((c) => c !== cb);
    };
  }, []);

  const triggerRetry = useCallback(() => {
    setHasRateLimitError(false);
    retryCallbacks.current.forEach((cb) => cb());
  }, []);

  const handleClick = () => {
    setShowExplain(true);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className={cn(
            {
              "text-green-600": colorVariant === "green",
              "text-pink-600": colorVariant === "pink",
              "text-blue-600": colorVariant !== "green" && colorVariant !== "pink",
            },
            "font-bold m-0 px-2 gap-0 lowercase"
          )}
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: highlightSearchTerm(verb, searchTerm) }}
        />
      </PopoverTrigger>
      <PopoverContent className="mx-2">
        <RateLimitContext.Provider value={{ hasRateLimitError, setHasRateLimitError, registerRetry }}>
          {children}
          {showExplain && <GenerateExplain verb={verb} />}
          {hasRateLimitError && (
            <div className="mt-2 border-t pt-2 flex justify-center w-full">
              <GeminiKeyInput onSaved={triggerRetry} />
            </div>
          )}
          <PopoverArrow className="fill-white" />
        </RateLimitContext.Provider>
      </PopoverContent>
    </Popover>
  );
};
