"use client";

import { useEffect, useRef, useState } from "react";

interface CodeInputProps {
  onSubmit: (code: string) => void | Promise<void>;
}

const codeLength = 6;

const CodeInput = ({ onSubmit }: CodeInputProps) => {
  const [code, setCode] = useState<string>("");
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeydown = async (e: KeyboardEvent) => {
      if (code.length === codeLength) return;

      let _code = code;
      // if key is a number key
      if (e.key.match(/[0-9]/)) {
        _code = code.concat(e.key);
      }

      // if key is backspace
      if (e.key === "Backspace") {
        _code = code.slice(0, -1);
      }
      setCode(_code);

      if (_code.length === codeLength) {
        try {
          await onSubmit(_code);
        } catch (error) {
          console.error(error);
          setCode("");
        }
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
    <button
      onClick={() => {
        hiddenInputRef.current?.focus();
      }}
    >
      <div className="flex flex-row items-center gap-2">
        {[...Array(codeLength)].map((_, i) => {
          return (
            <div
              key={i}
              className={`w-10 h-14 md:w-12 md:h-16 rounded-xl bg-gray-secondary text-center flex items-center justify-center text-[22px] font-bold border-2 border-gray-secondary ${
                i === code.length ? "border-black" : ""
              }`}
            >
              {code.length > i ? code[i] : " "}
            </div>
          );
        })}

        <input
          className="w-0 overflow-hidden"
          autoComplete="one-time-code"
          ref={hiddenInputRef}
          type="number"
          onChange={(e) => {
            if (e.target.value.length === 6) {
              setCode(e.target.value);
              onSubmit(e.target.value);
              e.target.value = "";
            }
          }}
        ></input>
      </div>
    </button>
  );
};

export default CodeInput;
