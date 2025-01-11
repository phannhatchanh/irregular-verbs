import { cn } from "@/lib/utils";
import { BioDialogDrawer } from "@/components/bio-dialog-drawer";
import { QuestionAndAnswer } from "@/components/question-and-answer";
import PrintButton from "@/components/footer/print";
import HomeButton from "@/components/footer/home";
import BackToTop from "@/components/footer/back-to-top";
import PracticeMenu from "@/components/footer/practice";

export default function Footer() {
  return (
    <footer
      className={cn(
        "print:hidden bg-slate-100 border-t w-full fixed bottom-0 p-4 transition-all duration-300 z-50 group flex items-center justify-between"
      )}
    >
      <div className="flex items-center justify-between space-x-2 text-left">
        <PracticeMenu />
        <QuestionAndAnswer />
      </div>
      <div>
        <HomeButton />
      </div>
      <div className="flex items-center justify-between space-x-2 text-right">
        <BioDialogDrawer />
        <PrintButton />
        <BackToTop />
      </div>
    </footer>
  );
}
