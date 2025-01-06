"use client";

import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AudioPlayer from "@/components/reading";
import { Input } from "@/components//ui/input";
import { PopoverVerb } from "@/components/popover";
import { X } from "lucide-react";
// import { GenerateExample } from "@/components/generate-example";
import GenerateExample from "./(gemini)/generate-example";

import data from "../data.json";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  clearSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm, clearSearch }) => (
  <div className="relative w-full print:hidden">
    <Input
      type="text"
      placeholder="Nhập động từ cần tìm..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {searchTerm && (
      <button onClick={clearSearch} className="absolute right-2 top-[18px] transform -translate-y-1/2 hover:opacity-70">
        <X />
      </button>
    )}
  </div>
);

const highlightVerb = (example: string, verb: string) => {
  return example.replace(new RegExp(`(${verb})`, "gi"), `<span style='font-weight: bold'>$1</span>`);
};

const ExampleDisplay = ({ example, verb }: { example: string | string[]; verb: string }) => {
  if (Array.isArray(example)) {
    return (
      <>
        {example.map((ex, index) => (
          <div
            key={index}
            className="mb-2"
            dangerouslySetInnerHTML={{
              __html: `<strong>Ví dụ:</strong> ${highlightVerb(ex, verb)}`,
            }}
          />
        ))}
      </>
    );
  }

  return (
    <div
      className="mb-2"
      dangerouslySetInnerHTML={{
        __html: `<strong>Ví dụ:</strong> ${highlightVerb(example, verb)}`,
      }}
    />
  );
};

const groupByFirstLetter = (data: any) => {
  return data.reduce((acc: any, item: any) => {
    const firstLetter = item.word.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});
};

export function Vocabulary() {
  const [searchTerm, setSearchTerm] = useState("");

  const clearSearch = () => {
    setSearchTerm("");
  };

  const groupedData = useMemo(() => {
    const filtered = data.filter(
      (item) =>
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.infinitive.form.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(item.past_simple.form)
          ? item.past_simple.form.some((form) => form.toLowerCase().includes(searchTerm.toLowerCase()))
          : item.past_simple.form.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(item.past_participle.form)
          ? item.past_participle.form.some((form) => form.toLowerCase().includes(searchTerm.toLowerCase()))
          : item.past_participle.form.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return groupByFirstLetter(filtered);
  }, [searchTerm]);

  return (
    <>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} clearSearch={clearSearch} />
      <Table className=" overflow-hidden visible rounded-lg border">
        <TableCaption>Common irregular verbs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-blue-600 text-white font-bold">INFINITIVE</TableHead>
            <TableHead className="bg-green-600 text-white font-bold">PAST SIMPLE</TableHead>
            <TableHead className="bg-pink-600 text-white font-bold">PAST PARTICIPLE</TableHead>
            <TableHead className="bg-gray-600 text-white font-bold">MEANING</TableHead>
          </TableRow>
        </TableHeader>
        {Object.keys(groupedData).map((letter) => (
          <TableBody key={letter}>
            <TableRow id={`group-${letter}`} className="bg-slate-100 border-t">
              <TableCell colSpan={4} className="text-2xl text-center font-bold">
                {letter}
              </TableCell>
            </TableRow>
            {groupedData[letter].map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>
                  <PopoverVerb
                    colorVariant="blue"
                    verb={item.word}
                    children={
                      <>
                        <AudioPlayer
                          word={item.word}
                          verb={item.infinitive.form}
                          pronunciation={item.infinitive.pronunciation}
                        />
                        <hr className="my-2" />
                        {item.infinitive.example && (
                          <ExampleDisplay example={item.infinitive.example} verb={item.infinitive.form} />
                        )}
                        <GenerateExample verb={item.word} />
                        <hr className="my-2" />
                      </>
                    }
                  />
                </TableCell>
                <TableCell>
                  {Array.isArray(item.past_simple.form) ? (
                    <div className="flex items-center">
                      {item.past_simple.form.map((word: any, index: any) => (
                        <div key={index}>
                          <PopoverVerb colorVariant="green" verb={word}>
                            <AudioPlayer
                              word={word}
                              verb={word}
                              pronunciation={item.past_simple.pronunciation[index]}
                            />
                            <hr className="my-2" />
                            {item.past_simple.example && item.past_simple.example[index] && (
                              <ExampleDisplay example={item.past_simple.example[index]} verb={word} />
                            )}
                            <GenerateExample verb={item.word} />
                            <hr className="my-2" />
                          </PopoverVerb>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <PopoverVerb
                      colorVariant="green"
                      verb={item.past_simple.form}
                      children={
                        <>
                          <AudioPlayer
                            word={item.past_simple.form}
                            verb={item.past_simple.form}
                            pronunciation={item.past_simple.pronunciation}
                          />
                          <hr className="my-2" />
                          {item.past_simple.example && (
                            <ExampleDisplay example={item.past_simple.example} verb={item.past_simple.form} />
                          )}
                          <GenerateExample verb={item.word} />
                          <hr className="my-2" />
                        </>
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  {Array.isArray(item.past_participle.form) ? (
                    <div className="flex items-center">
                      {item.past_participle.form.map((word: any, index: any) => (
                        <div key={index}>
                          <PopoverVerb verb={word} colorVariant="pink">
                            <AudioPlayer
                              word={word}
                              verb={word}
                              pronunciation={item.past_participle.pronunciation[index]}
                            />
                            <hr className="my-2" />
                            {item.past_participle.example && item.past_participle.example[index] && (
                              <ExampleDisplay example={item.past_participle.example[index]} verb={word} />
                            )}
                            <GenerateExample verb={word} />
                            <hr className="my-2" />
                          </PopoverVerb>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <PopoverVerb
                      colorVariant="pink"
                      verb={item.past_participle.form}
                      children={
                        <>
                          <AudioPlayer
                            word={item.past_participle.form}
                            verb={item.past_participle.form}
                            pronunciation={item.past_participle.pronunciation}
                          />
                          <hr className="my-2" />
                          {item.past_participle.example && (
                            <ExampleDisplay example={item.past_participle.example} verb={item.past_participle.form} />
                          )}
                          <GenerateExample verb={item.past_participle.form} />
                          <hr className="my-2" />
                        </>
                      }
                    />
                  )}
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
