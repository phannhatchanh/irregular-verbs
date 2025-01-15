"use client";

import { SearchInput } from "@/components/search-input";
import { VerbCell } from "@/components/verb-cell";
import { useVocabularySearch } from "@/hooks/use-vocabulary-search";
import { VerbItem } from "@/types/vocabulary";
import { highlightSearchTerm } from "@/lib/utils";

export function Vocabulary() {
  const { searchTerm, setSearchTerm, clearSearch, groupedData } = useVocabularySearch();

  return (
    <>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} clearSearch={clearSearch} />
      <div className="relative grid grid-cols-1 gap-2">
        <div className="print:top-auto sticky top-2 z-20 grid grid-cols-4 text-center gap-2 text-sm md:text-base font-medium">
          <div className="bg-blue-600 text-white p-2 rounded">
            <span className="sm:block hidden">INFINITIVE</span>
            <span className="sm:hidden block">V1</span>
          </div>
          <div className="bg-green-600 text-white p-2 rounded">
            <span className="sm:block hidden">PAST SIMPLE</span>
            <span className="sm:hidden block">V2</span>
          </div>
          <div className="bg-pink-600 text-white p-2 rounded">
            <span className="sm:block hidden">PAST PARTICIPLE</span>
            <span className="sm:hidden block">V3</span>
          </div>
          <div className="bg-gray-600 text-white p-2 rounded">MEANING</div>
        </div>

        {Object.entries(groupedData).map(([letter, items]) => (
          <div key={letter} className="space-y-2">
            <div className="print:top-auto sticky top-[56px] z-10 bg-gray-100 p-2 text-center font-semibold text-lg rounded">
              {letter}
            </div>
            {items.map((item: VerbItem, index: number) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-2 p-2 hover:bg-gray-100 rounded border text-sm md:text-base"
              >
                <div className="text-blue-600">
                  <VerbCell colorVariant="blue" verbForm={item.infinitive} searchTerm={searchTerm} />
                </div>
                <div className="text-green-600">
                  <VerbCell colorVariant="green" verbForm={item.past_simple} searchTerm={searchTerm} />
                </div>
                <div className="text-pink-600">
                  <VerbCell colorVariant="pink" verbForm={item.past_participle} searchTerm={searchTerm} />
                </div>
                <div
                  className="flex items-center lowercase"
                  dangerouslySetInnerHTML={{ __html: highlightSearchTerm(item.meaning, searchTerm) }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="m-auto text-slate-500">Common irregular verbs.</div>
    </>
  );
}
