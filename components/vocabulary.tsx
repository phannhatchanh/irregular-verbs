"use client";

import { useState } from "react";
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
        <div className="sticky top-2 z-20 grid grid-cols-4 gap-2 text-center text-sm font-medium md:text-base print:top-auto">
          <div className="rounded bg-blue-600 p-2 text-white">
            <span className="hidden sm:block">INFINITIVE</span>
            <span className="block sm:hidden">V1</span>
          </div>
          <div className="rounded bg-green-600 p-2 text-white">
            <span className="hidden sm:block">PAST SIMPLE</span>
            <span className="block sm:hidden">V2</span>
          </div>
          <div className="rounded bg-pink-600 p-2 text-white">
            <span className="hidden sm:block">PAST PARTICIPLE</span>
            <span className="block sm:hidden">V3</span>
          </div>
          <div className="rounded bg-gray-600 p-2 text-white">MEANING</div>
        </div>

        {Object.entries(groupedData).map(([letter, items]) => (
          <div key={letter} className="space-y-2">
            <div className="sticky top-[56px] z-10 rounded bg-gray-100 p-2 text-center text-lg font-semibold print:top-auto">
              {letter}
            </div>
            {items.map((item: VerbItem, index: number) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-2 rounded border p-2 text-sm hover:bg-gray-100 md:text-base"
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
