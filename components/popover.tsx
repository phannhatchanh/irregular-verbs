import { FC, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverArrow, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
// import { GenerateExplain } from "@/components/(chatgpt)/generate-explain";
import GenerateExplain from "@/components/(gemini)/generate-explain";

interface PopoverProps {
  verb: string;
  children: ReactNode;
  colorVariant?: "blue" | "green" | "pink";
}

export const PopoverVerb: FC<PopoverProps> = ({ verb, children, colorVariant }) => {
  const [showExplain, setShowExplain] = useState(false);

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
            "font-bold m-0 px-2 lowercase"
          )}
          onClick={handleClick}
        >
          {verb}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-2 w-auto">
        {children}
        {showExplain && <GenerateExplain verb={verb} />}
        <PopoverArrow className="fill-white" />
      </PopoverContent>
    </Popover>
  );
};
