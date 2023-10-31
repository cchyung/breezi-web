"use client";

import { useEffect, useState } from "react";

interface CodeInputProps {
  onSubmit: (code: string) => void;
}

const codeLength = 6;

const CodeInput = ({ onSubmit }: CodeInputProps) => {
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (code.length === codeLength) return;
      // if key is a number key
      if (e.key.match(/[0-9]/)) {
        setCode(code.concat(e.key));
      }

      // if key is backspace
      if (e.key === "Backspace") {
        setCode(code.slice(0, -1));
      }

      if (code.length + 1 === codeLength) {
        onSubmit(code);
      }
    };

    // listen to keydown event
    window.addEventListener("keydown", handleKeydown);

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [code]);

  return (
    <div className="flex flex-row items-center gap-2">
      {[...Array(codeLength)].map((_, i) => {
        return (
          <div
            key={i}
            className={`w-12 h-16 rounded-xl bg-gray-secondary text-center flex items-center justify-center text-[22px] font-bold border-2 border-gray-secondary ${
              i === code.length ? "border-black" : ""
            }`}
          >
            {code.length > i ? code[i] : " "}
          </div>
        );
      })}
    </div>
  );
};

export default CodeInput;
