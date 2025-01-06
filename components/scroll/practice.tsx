"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListTodo, PenLine, SquarePen, UserPen } from "lucide-react";
import Link from "next/link";

const PracticeMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <UserPen /> Luyện tập
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-2">
        <DropdownMenuGroup>
          <Link href="../practice/cau-hoi-trac-nghiem">
            <DropdownMenuItem>
              Lựa chọn đáp án đúng
              <DropdownMenuShortcut>
                <ListTodo size={20} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="../practice/thach-thuc-viet-cau-hoan-chinh">
            <DropdownMenuItem>
              Viết câu hoàn chỉnh
              <DropdownMenuShortcut>
                <PenLine size={20} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PracticeMenu;
