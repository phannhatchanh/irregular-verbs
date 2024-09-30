"use client";

import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "./ui/input";
import AudioPlayer from "./reading";
import data from "../data.json";

export function Vocabulary() {
  const [searchTerm, setSearchTerm] = useState("");

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
      <Input
        type="text"
        placeholder="Search verb..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <Table className="border">
        <TableCaption>Common irregular verbs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-gray-600 text-white">No.</TableHead>
            <TableHead className="w-[100px] bg-blue-600 text-white">Infinitive</TableHead>
            <TableHead className="bg-green-600 text-white">Past Simple</TableHead>
            <TableHead className="bg-pink-600 text-white">Past Participle</TableHead>
            <TableHead className="bg-gray-600 text-white">Meaning</TableHead>
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
                    <div key={i}>
                      <AudioPlayer word={form} verb={form} />
                    </div>
                  ))
                ) : (
                  <AudioPlayer word={item.past_simple.form} verb={item.past_simple.form} />
                )}
                <span className="text-gray-700">
                  {Array.isArray(item.past_simple.pronunciation)
                    ? item.past_simple.pronunciation.join(", ")
                    : item.past_simple.pronunciation}
                </span>
              </TableCell>
              <TableCell className="bg-pink-100">
                {Array.isArray(item.past_participle.form) ? (
                  item.past_participle.form.map((form, i) => (
                    <div key={i}>
                      <AudioPlayer word={form} verb={form} />
                    </div>
                  ))
                ) : (
                  <AudioPlayer word={item.past_participle.form} verb={item.past_participle.form} />
                )}
                <span className="text-gray-700">
                  {Array.isArray(item.past_participle.pronunciation)
                    ? item.past_participle.pronunciation.join(", ")
                    : item.past_participle.pronunciation}
                </span>
              </TableCell>
              <TableCell className="bg-gray-100">{item.meaning}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
