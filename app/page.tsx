import { Vocabulary } from "@/components/vocabulary";

export default async function Home() {
  return (
    <div className="m-auto mb-24 mt-10 max-w-2xl gap-6 px-4">
      <h1 className="mb-4 text-center text-lg font-bold text-pink-600 sm:text-xl">TRA ĐỘNG TỪ BẤT QUY TẮC</h1>
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Vocabulary />
      </main>
    </div>
  );
}
