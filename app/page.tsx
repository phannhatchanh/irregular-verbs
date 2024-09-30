import { Vocabulary } from "../components/vocabulary";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-pink-600 bg-transparent">
        Common irregular verbs
      </h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Vocabulary />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
