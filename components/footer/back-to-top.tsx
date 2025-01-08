"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setShowButton(window.scrollY > 1000);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() =>
                window.scrollTo({
                  top: showButton ? 0 : document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
              aria-label="Back to top"
              variant="outline"
              size="icon"
            >
              <ChevronUp
                className={cn("duration-500", {
                  "rotate-0": showButton,
                  "rotate-180": !showButton,
                })}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{`${showButton ? "Quay lại đầu trang" : "Di chuyển xuống"}`}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default BackToTop;
