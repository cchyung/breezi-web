import { PropsWithChildren } from "react";

interface InputProps {
  placeholder: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
}

const Input = ({
  placeholder,
  type,
  onChange,
  children,
  value,
}: PropsWithChildren<InputProps>) => {
  return (
    <div className="relative">
      <input
        className="bg-gray-200 px-4 py-3 rounded-2xl w-full"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      ></input>
      {children}
    </div>
  );
};
export default Input;
