import { MouseEventHandler } from "react";

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <button
        className="border-2 border-white text-white rounded-2xl py-3 px-6 bg-primary w-full"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
