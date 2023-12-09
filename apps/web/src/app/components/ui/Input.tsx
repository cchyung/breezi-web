import { HTMLInputTypeAttribute, PropsWithChildren } from "react";

interface InputProps {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: any;
  className?: string;
  inputClassName?: string;
}

const Input = ({
  placeholder,
  type,
  onChange,
  onKeyDown,
  children,
  value,
  className,
  inputClassName
}: PropsWithChildren<InputProps>) => {
  return (
    <div className={`relative ${className}`}>
      <input
        className={`bg-gray-200 px-4 py-3 rounded-2xl w-full ${inputClassName}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
      ></input>
      {children}
    </div>
  );
};
export default Input;
