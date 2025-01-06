"use client";

import Link from "next/link";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const HomeButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="size-8" variant="outline" size="icon">
            <Link href="../">
              <House />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Trang chủ</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HomeButton;
