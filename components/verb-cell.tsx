import React from "react";
import { VerbForm } from "@/types/vocabulary";
import { PopoverVerb } from "@/components/popover";
import AudioPlayer from "@/components/reading";
import { ExampleDisplay } from "@/components/example-display";
import GenerateExample from "@/components/(gemini)/generate-example";
// import { GenerateExample } from "@/components/(chatgpt)/generate-example";

interface VerbCellProps {
  colorVariant?: "blue" | "green" | "pink";
  verbForm: VerbForm;
  searchTerm: string;
}

export const VerbCell: React.FC<VerbCellProps> = ({ colorVariant, verbForm, searchTerm }) => {
  const { form, pronunciation, example } = verbForm;

  if (Array.isArray(form)) {
    return (
      <div className="flex items-center">
        {form.map((word, index) => (
          <VerbCell
            key={index}
            colorVariant={colorVariant}
            verbForm={{
              form: word,
              pronunciation: Array.isArray(pronunciation) ? pronunciation[index] : pronunciation,
              example: example && Array.isArray(example) ? example[index] : example,
            }}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    );
  }

  return (
    <PopoverVerb colorVariant={colorVariant} verb={form} searchTerm={searchTerm}>
      <AudioPlayer word={form} verb={form} pronunciation={pronunciation as string} />
      <hr className="my-2" />
      {example && <ExampleDisplay example={example} verb={form} searchTerm={searchTerm} />}
      <GenerateExample verb={form} />
      <hr className="my-2" />
    </PopoverVerb>
  );
};
