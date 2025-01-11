"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListTodo, PenLine, UserPen } from "lucide-react";

const PracticeMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-8 sm:size-full sm:h-8">
          <UserPen className="size-8" /> <span className="hidden sm:block">Luyện tập</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4">
        <DropdownMenuGroup>
          <Link href="../practice/cau-hoi-trac-nghiem">
            <DropdownMenuItem>
              <DropdownMenuShortcut>
                <ListTodo size={20} />
              </DropdownMenuShortcut>
              Câu hỏi trắc nghiệm
            </DropdownMenuItem>
          </Link>
          <Link href="../practice/viet-cau-hoan-chinh">
            <DropdownMenuItem>
              <DropdownMenuShortcut>
                <PenLine size={20} />
              </DropdownMenuShortcut>
              Viết câu hoàn chỉnh
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PracticeMenu;
