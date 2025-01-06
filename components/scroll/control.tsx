import { BioDialogDrawer } from "@/components/scroll/bio-dialog-drawer";
import PrintButton from "@/components/scroll/print";
import BackToTop from "@/components/scroll/back-to-top";
import PracticeMenu from "@/components/scroll/practice";

export default function ScrollControl() {
  return (
    <>
      <div className="print:hidden fixed left-6 bottom-4 text-left transition-all duration-300 z-50 group flex items-center justify-between space-x-2">
        <PracticeMenu />
      </div>
      <div className="print:hidden fixed right-6 bottom-4 text-right transition-all duration-300 z-50 group flex items-center justify-between space-x-2">
        <BioDialogDrawer />
        <PrintButton />
        <BackToTop />
      </div>
    </>
  );
}
