import { FC, ReactNode, useState } from "react";
import { cn, highlightSearchTerm } from "@/lib/utils";

import { Popover, PopoverContent, PopoverArrow, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import GenerateExplain from "@/components/(gemini)/generate-explain";

interface PopoverVerbProps {
  verb: string;
  children: ReactNode;
  colorVariant?: "blue" | "green" | "pink";
  searchTerm: string;
}

export const PopoverVerb: FC<PopoverVerbProps> = ({ verb, children, colorVariant, searchTerm }) => {
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
            "font-bold m-0 px-2 gap-0 lowercase"
          )}
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: highlightSearchTerm(verb, searchTerm) }}
        />
      </PopoverTrigger>
      <PopoverContent className="mx-2">
        {children}
        {showExplain && <GenerateExplain verb={verb} />}
        <PopoverArrow className="fill-white" />
      </PopoverContent>
    </Popover>
  );
};
