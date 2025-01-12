import React from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  clearSearch: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm, clearSearch }) => (
  <div className="relative w-full print:hidden">
    <Input
      type="text"
      placeholder="Nhập động từ cần tìm..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {searchTerm && (
      <button onClick={clearSearch} className="absolute right-2 top-[18px] -translate-y-1/2 hover:opacity-70">
        <X />
      </button>
    )}
  </div>
);
