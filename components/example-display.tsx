import React from "react";

const highlightVerb = (example: string, verb: string) => {
  return example.replace(new RegExp(`(${verb})`, "gi"), `<span style='font-weight: bold'>$1</span>`);
};

interface ExampleDisplayProps {
  example: string | string[];
  verb: string;
}

export const ExampleDisplay: React.FC<ExampleDisplayProps> = ({ example, verb }) => {
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
