"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SearchInput } from "@/components/search-input";
import { VerbCell } from "@/components/verb-cell";
import { useVocabularySearch } from "@/hooks/use-vocabulary-search";
import { VerbItem } from "@/types/vocabulary";

export function Vocabulary() {
  const { searchTerm, setSearchTerm, clearSearch, groupedData } = useVocabularySearch();

  return (
    <>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} clearSearch={clearSearch} />
      <Table className="visible overflow-hidden rounded-md border">
        <TableCaption>Common irregular verbs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-blue-600 font-bold text-white">INFINITIVE</TableHead>
            <TableHead className="bg-green-600 font-bold text-white">PAST SIMPLE</TableHead>
            <TableHead className="bg-pink-600 font-bold text-white">PAST PARTICIPLE</TableHead>
            <TableHead className="bg-gray-600 font-bold text-white">MEANING</TableHead>
          </TableRow>
        </TableHeader>
        {Object.entries(groupedData).map(([letter, items]) => (
          <TableBody key={letter}>
            <TableRow id={`group-${letter}`} className="border-t bg-slate-100">
              <TableCell colSpan={4} className="text-center text-2xl font-bold">
                {letter}
              </TableCell>
            </TableRow>
            {items.map((item: VerbItem, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <VerbCell colorVariant="blue" verbForm={item.infinitive} />
                </TableCell>
                <TableCell>
                  <VerbCell colorVariant="green" verbForm={item.past_simple} />
                </TableCell>
                <TableCell>
                  <VerbCell colorVariant="pink" verbForm={item.past_participle} />
                </TableCell>
                <TableCell className="font-semibold">{item.meaning}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ))}
      </Table>
    </>
  );
}
