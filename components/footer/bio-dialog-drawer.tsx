"use client";

import { useState } from "react";
import { Users } from "lucide-react";
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

const DescriptionContent = () => {
  return (
    <>
      Chào mừng đến với ứng dụng học tập thông minh! Đây là một trong những công cụ đặc biệt giúp bạn dễ dàng{" "}
      <span className="text-pink-600 font-bold">TRA ĐỘNG TỪ BẤT QUY TẮC</span> trong tiếng Anh. Với giao diện thân thiện
      và các tính năng hiện đại, ứng dụng sẽ là người bạn đồng hành đắc lực trên hành trình chinh phục ngôn ngữ của bạn.
    </>
  );
};

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
                <span className="underline underline-offset-4">Ví dụ minh họa</span>: Không chỉ đơn thuần đưa ra định
                nghĩa, công cụ tự động cung cấp các ví dụ sinh động và thực tế, được tạo ra bởi công nghệ AI hiện đại.
                Điều này giúp người học hiểu rõ hơn cách sử dụng từ vựng và cấu trúc ngữ pháp trong ngữ cảnh cụ thể.
              </li>
              <li className="ml-5 font-normal">
                <span className="underline underline-offset-4">Giải thích chi tiết về từ và ngữ pháp</span>: Công cụ
                không chỉ đơn thuần dịch nghĩa mà còn phân tích sâu về cấu trúc câu, cách sử dụng từ và các sắc thái ý
                nghĩa khác nhau. Điều này giúp người học hiểu bản chất của ngôn ngữ, từ đó ghi nhớ kiến thức một cách
                sâu sắc và lâu dài hơn.
              </li>
              <li className="ml-5 font-normal">
                <span className="underline underline-offset-4">Luyện tập trắc nghiệm đa dạng</span>: Công cụ đưa ra một
                loạt các câu hỏi trắc nghiệm được thiết kế khoa học, bao gồm nhiều chủ đề. Sau mỗi câu trả lời, người
                học sẽ nhận được phản hồi ngay lập tức về kết quả và giải thích chi tiết cho từng câu hỏi, giúp họ hiểu
                rõ lỗi sai và củng cố kiến thức.
              </li>
              <li className="ml-5 font-normal">
                <span className="underline underline-offset-4">Luyện viết câu hoàn chỉnh</span>: Tính năng này hỗ trợ
                người học luyện viết câu hoàn chỉnh với động từ cho trước. Hệ thống sẽ tự động kiểm tra ngữ pháp, phát
                hiện và chỉnh sửa lỗi sai, đồng thời đưa ra gợi ý để câu văn trở nên tối ưu hơn. Đặc biệt, hệ thống còn
                đánh giá và chấm điểm dựa trên nhiều tiêu chí, giúp người học theo dõi sự tiến bộ của mình.
              </li>
              <li className="ml-5 font-normal">
                <span className="underline underline-offset-4">Hỏi đáp (Q&A) không giới hạn</span>: Đây là một tính năng
                mạnh mẽ cho phép người học đặt bất kỳ câu hỏi nào liên quan đến tiếng Anh, từ ngữ pháp, từ vựng, phát âm
                và các khía cạnh khác của ngôn ngữ. Công cụ sẽ tận dụng khả năng của Gemini để cung cấp câu trả lời
                chính xác, đầy đủ và dễ hiểu.
              </li>
            </ul>
          </li>
          <li className="ml-5 font-normal">
            <span className="text-blue-600">Hỗ trợ In ấn:</span> Dễ dàng có được một phiên bản trên giấy chỉ với một cú
            nhấp chuột, giúp lưu trữ và tiện lợi khi sử dụng.
          </li>
        </ul>
        <div>Nhóm xin gửi lời cảm ơn chân thành đến các bạn đã đánh giá và góp ý cho dự án này! 😊</div>
      </div>
    </ScrollArea>
  );
};

export function BioDialogDrawer() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="size-8 p-1.5" variant="outline" asChild>
                  <Users size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Giới thiệu</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent className="max-w-2xl h-[90%] p-4 sm:max-w-[full]">
          <DrawerHeader className="flex flex-col gap-0 p-0">
            <DrawerTitle className="text-pink-600 text-lg font-bold text-center tracking-tight">GIỚI THIỆU</DrawerTitle>
            <DrawerDescription className="mb-0">
              <DescriptionContent />
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
                <Users size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Giới thiệu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DrawerTrigger>
      <DrawerContent className="h-full px-4 pb-4">
        <DrawerHeader className="flex flex-col gap-0 -mx-4 text-left">
          <DrawerTitle className="text-pink-600 text-lg font-bold text-center tracking-tight">GIỚI THIỆU</DrawerTitle>
          <DrawerDescription className="mb-0 px-[-124px]">
            <DescriptionContent />
          </DrawerDescription>
        </DrawerHeader>
        <Content />
      </DrawerContent>
    </Drawer>
  );
}
