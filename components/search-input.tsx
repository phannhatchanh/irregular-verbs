import React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  clearSearch: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm, clearSearch }) => (
  <div className="relative flex w-full flex-1 shrink-0 print:hidden">
    <label htmlFor="search" className="sr-only">
      Search
    </label>
    <SearchIcon className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2" />
    <Input
      type="text"
      placeholder="Nhập động từ cần tìm..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="px-10 text-pink-600"
    />
    {searchTerm && (
      <button onClick={clearSearch} className="absolute right-2 top-[18px] -translate-y-1/2 hover:opacity-70">
        <X size="20" />
      </button>
    )}
  </div>
);
