"use client";

import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "./ui/input";
import AudioPlayer from "./reading";
import data from "../data.json";

export function Vocabulary() {
  const [searchTerm, setSearchTerm] = useState("");

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredData = data.filter(
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

  return (
    <>
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search verb..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 border border-gray-300 rounded"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-[18px] transform -translate-y-1/2 hover:opacity-70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <Table className="border">
        <TableCaption>Common irregular verbs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-gray-600 text-white font-bold">No.</TableHead>
            <TableHead className="bg-blue-600 text-white font-bold">Infinitive</TableHead>
            <TableHead className="bg-green-600 text-white font-bold">Past Simple</TableHead>
            <TableHead className="bg-pink-600 text-white font-bold">Past Participle</TableHead>
            <TableHead className="bg-gray-600 text-white font-bold">Meaning</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="bg-gray-100">{index + 1}</TableCell>
              <TableCell className="bg-blue-100">
                <AudioPlayer word={item.infinitive.form} verb={item.infinitive.form} />
                <span className="text-gray-700">{item.infinitive.pronunciation}</span>
              </TableCell>
              <TableCell className="bg-green-100">
                {Array.isArray(item.past_simple.form) ? (
                  item.past_simple.form.map((form, i) => (
                    <div key={i} className="flex items-center">
                      <AudioPlayer word={form} verb={form} />
                      <span className="text-gray-700">
                        {Array.isArray(item.past_simple.pronunciation)
                          ? item.past_simple.pronunciation[i]
                          : item.past_simple.pronunciation}
                      </span>
                    </div>
                  ))
                ) : (
                  <div>
                    <AudioPlayer word={item.past_simple.form} verb={item.past_simple.form} />
                    <span className="text-gray-700">{item.past_simple.pronunciation}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="bg-pink-100">
                {Array.isArray(item.past_participle.form) ? (
                  item.past_participle.form.map((form, i) => (
                    <div key={i} className="flex items-center">
                      <AudioPlayer word={form} verb={form} />
                      <span className="text-gray-700">
                        {Array.isArray(item.past_participle.pronunciation)
                          ? item.past_participle.pronunciation[i]
                          : item.past_participle.pronunciation}
                      </span>
                    </div>
                  ))
                ) : (
                  <div>
                    <AudioPlayer word={item.past_participle.form} verb={item.past_participle.form} />
                    <span className="text-gray-700">{item.past_participle.pronunciation}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="bg-gray-100">{item.meaning}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
