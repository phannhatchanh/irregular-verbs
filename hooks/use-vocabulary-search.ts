import { useState, useMemo } from "react";
import data from "../data.json";
import { VerbItem, GroupedData } from "../types/vocabulary";

const groupByFirstLetter = (data: VerbItem[]): GroupedData => {
  return data.reduce((acc: GroupedData, item: VerbItem) => {
    const firstLetter = item.word.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});
};

export const useVocabularySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const groupedData = useMemo(() => {
    const filtered = (data as VerbItem[]).filter(
      (item) =>
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.infinitive.form.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.past_simple.form.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.past_participle.form.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return groupByFirstLetter(filtered);
  }, [searchTerm]);

  const clearSearch = () => setSearchTerm("");

  return { searchTerm, setSearchTerm, clearSearch, groupedData };
};
