interface InputProps {
  placeholder: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, type, onChange }: InputProps) => {
  return (
    <input
      className="bg-gray-secondary px-7 py-3 rounded-2xl w-full"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
export default Input;
