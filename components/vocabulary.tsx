"use client";

import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "./ui/input";
import AudioPlayer from "./audio";
import data from "../data.json";

export function Vocabulary() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.past_simple.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.past_participle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pronunciation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Input
        type="text"
        placeholder="Search verb..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <Table>
        <TableCaption>Common irregular verb.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] bg-blue-600 text-white">Infinitive</TableHead>
            <TableHead className="bg-green-600 text-white">Past Simple</TableHead>
            <TableHead className="bg-pink-600 text-white">Past Participle</TableHead>
            <TableHead>Pronunciation</TableHead>
            <TableHead>Meaning</TableHead>
            <TableHead className="text-right">Reading</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium bg-blue-200">{item.infinitive}</TableCell>
              <TableCell className="bg-green-200">{item.past_simple}</TableCell>
              <TableCell className="bg-pink-200">{item.past_participle}</TableCell>
              <TableCell>{item.pronunciation}</TableCell>
              <TableCell>{item.meaning}</TableCell>
              <TableCell className="text-right">
                <AudioPlayer word={item.infinitive} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
