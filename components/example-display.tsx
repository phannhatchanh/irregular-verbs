import { highlightSearchTerm } from "@/lib/utils";
import React from "react";

interface ExampleDisplayProps {
  example: string | string[];
  verb: string;
  searchTerm: string;
}

export const ExampleDisplay: React.FC<ExampleDisplayProps> = ({ example, verb, searchTerm }) => {
  const renderExample = (ex: string) => {
    return `<strong>Ví dụ:</strong> ${highlightSearchTerm(ex, searchTerm)}`;
  };

  if (Array.isArray(example)) {
    return (
      <>
        {example.map((ex, index) => (
          <div
            key={index}
            className="mb-2"
            dangerouslySetInnerHTML={{
              __html: renderExample(ex),
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
        __html: renderExample(example),
      }}
    />
  );
};
