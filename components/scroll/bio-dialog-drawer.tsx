"use client";

import { useState } from "react";
import { CircleHelp } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Content = () => {
  return (
    <ScrollArea className="h-full">
      <div className="grid gap-4 px-0">
        <ul className="list-disc">
          <span className="font-bold text-blue-600">Nhóm tác giả:</span>
          <li className="ml-5 text-pink-600">Huỳnh Thị Diễm Như</li>
          <li className="ml-5 text-pink-600">Huỳnh Ngọc Khánh Vy</li>
        </ul>
        <ul className="font-bold list-decimal">
          <span className="text-blue-600">Các tính năng chính:</span>
          <li className="ml-5 font-normal">
            <span className="text-blue-600">Tra cứu:</span> Với giao diện đẹp mắt, thân thiện với người sử dụng bên cạnh
            các động từ được nhóm theo chữ cái, bạn có thể dễ dàng tìm kiếm các từ vựng thông qua công cụ lọc dữ liệu
            được tích hợp sẵn, giúp việc tra cứu trở nên nhanh chóng, dễ dàng và hiệu quả hơn.
          </li>
          <li className="ml-5 font-normal">
            <span className="text-blue-600">Luyện phát âm:</span> Hệ thống hỗ trợ nghe và luyện phát âm chuẩn xác, giúp
            bạn tự tin hơn trong giao tiếp hàng ngày.
          </li>
          <li className="ml-5 font-normal">
            <ul className="list-disc">
              <span className="text-blue-600">Trợ lý AI thông minh:</span>
              <li className="ml-5 font-normal">
                <span className="underline">Ví dụ minh họa:</span> Tự động cung cấp các ví dụ, được hỗ trợ bởi công nghệ
                AI hiện đại.
              </li>
              <li className="ml-5 font-normal">
                <span className="underline">Giải thích từ:</span> Tìm hiểu và phân tích thêm cấu trúc câu, cách sử dụng
                từ và ý nghĩa một cách rõ ràng, giúp bạn hiểu sâu và ghi nhớ lâu hơn.
              </li>
              <li className="ml-5 font-normal">
                <span className="underline">Luyện tập trắc nghiệm:</span> Đưa ra bộ câu hỏi trắc nghiệm phù hợp với
                nhiều dạng khác nhau nhằm kiểm tra và củng cố khả năng sử dụng động từ. Sau mỗi câu hỏi, bạn sẽ được xem
                phản hồi về kết quả và giải thích chi tiết ở từng câu hỏi.
              </li>
              <li className="ml-5 font-normal">
                <span className="underline">Viết câu hoàn chỉnh:</span> Hỗ trợ luyện viết câu hoàn chỉnh với động từ cho
                trước. Hệ thống sẽ kiểm tra ngữ pháp, chỉnh sửa lỗi sai và gợi ý cách viết tối ưu, đồng thời đánh giá số
                điểm mà bạn đạt được qua câu trả lời của mình.
              </li>
            </ul>
          </li>
          <li className="ml-5 font-normal">
            <span className="text-blue-600">Hỗ trợ In ấn:</span> Dễ dàng có được một phiên bản trên giấy chỉ với một cú
            nhấp chuột, giúp lưu trữ và tiện lợi khi sử dụng.
          </li>
        </ul>
        <div>
          Nhóm chúng em xin gửi lời cảm ơn chân thành đến quý Ban giám khảo đã dành thời gian đánh giá và góp ý cho dự
          án của chúng em! 😊
        </div>
      </div>
    </ScrollArea>
  );
};

export function BioDialogDrawer() {
  const [open, setOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="size-8 p-1.5" variant="outline" asChild>
                  <CircleHelp className="size-8" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Giới thiệu</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent className="h-[90%] p-4 sm:max-w-[full]">
          <DrawerHeader className="flex flex-col gap-0 p-0">
            <DrawerTitle className="text-pink-600 text-lg font-bold text-center tracking-tight">GIỚI THIỆU</DrawerTitle>
            <DrawerDescription className="mb-0">
              Chào mừng đến với ứng dụng học tập thông minh! Đây là một trong những công cụ đặc biệt giúp các bạn học
              sinh dễ dàng <span className="text-pink-600 font-bold">TRA ĐỘNG TỪ BẤT QUY TẮC</span> trong tiếng Anh. Với
              giao diện thân thiện và các tính năng hiện đại, ứng dụng sẽ là người bạn đồng hành đắc lực trên hành trình
              chinh phục ngôn ngữ của bạn.
            </DrawerDescription>
          </DrawerHeader>
          <Content />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="size-8 p-1.5" variant="outline" asChild>
                <CircleHelp className="size-8" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Giới thiệu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DrawerTrigger>
      <DrawerContent className="h-[90%] px-4 pb-4">
        <DrawerHeader className="flex flex-col gap-0 -mx-4 text-left">
          <DrawerTitle className="text-pink-600 text-lg font-bold text-center tracking-tight">
            BẢNG TRA ĐỘNG TỪ BẤT QUY TẮC
          </DrawerTitle>
          <DrawerDescription className="mb-0 px-[-124px]">
            Chào mừng bạn đến với ứng dụng học tập thông minh! Đây là một trong những công cụ đặc biệt giúp các bạn học
            sinh dễ dàng tra cứu và học tập động từ bất quy tắc trong tiếng Anh. Với giao diện thân thiện và các tính
            năng hiện đại, ứng dụng sẽ là người bạn đồng hành đắc lực trên hành trình chinh phục tiếng Anh của bạn.
          </DrawerDescription>
        </DrawerHeader>
        <Content />
      </DrawerContent>
    </Drawer>
  );
}
