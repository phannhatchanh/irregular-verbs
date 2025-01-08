"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PrintButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={() => window.print()}>
            <Printer />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>In ra giấy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PrintButton;
