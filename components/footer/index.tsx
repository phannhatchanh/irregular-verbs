import { cn } from "@/lib/utils";
import { BioDialogDrawer } from "@/components/footer/bio-dialog-drawer";
import { QuestionAndAnswer } from "@/components/footer/question-and-answer";
import PrintButton from "@/components/footer/print";
import HomeButton from "@/components/footer/home";
import BackToTop from "@/components/footer/back-to-top";
import PracticeMenu from "@/components/footer/practice";

export default function Footer() {
  return (
    <footer
      className={cn(
        "print:hidden bg-slate-100 border-t w-full fixed bottom-0 p-4 transition-all duration-300 z-50 group flex items-center justify-between space-x-2"
      )}
    >
      <div className="flex items-center justify-between text-left space-x-2">
        <PracticeMenu />
        <QuestionAndAnswer />
      </div>
      <div className="text-left">
        <HomeButton />
      </div>
      <div className="flex items-center justify-between text-right space-x-2">
        <BioDialogDrawer />
        <PrintButton />
        <BackToTop />
      </div>
    </footer>
  );
}
