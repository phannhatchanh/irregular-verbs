import { Vocabulary } from "@/components/vocabulary";

export default async function Home() {
  return (
    <div className="max-w-2xl m-auto my-10 px-4 gap-6">
      <h1 className="mb-4 text-center font-bold text-lg sm:text-xl text-pink-600">TRA ĐỘNG TỪ BẤT QUY TẮC</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Vocabulary />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
