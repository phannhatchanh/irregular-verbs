"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PrintButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="size-8" variant="outline" size="icon" onClick={() => window.print()}>
            <Printer />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tạo một bản IN</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PrintButton;
