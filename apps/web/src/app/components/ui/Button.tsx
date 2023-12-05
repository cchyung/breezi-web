import { MouseEventHandler } from "react";

const Button = ({
  children,
  onClick,
  onMouseOver,
  size = "md",
  color = "primary",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: MouseEventHandler<HTMLButtonElement>;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "gray" | "black";
  disabled?: boolean;
  className?: string;
}) => {
  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-md",
    lg: "py-4 px-8 text-lg",
  };

  const sizeStyle = sizeStyles[size];

  const colorStyles = {
    primary: "bg-primary text-white disabled:bg-gray-300 disabled:text-white",
    gray: "bg-gray-400 text-white disabled:bg-gray-300 disabled:text-white",
    black: "bg-black text-white disabled:bg-gray-300 disabled:text-white"
  };

  const colorStyle = colorStyles[color];
  return (
    <>
      <button
        className={`${className} ${sizeStyle} ${colorStyle} disabled:cursor-not-allowed rounded-2xl
        transition-colors`}
        onClick={onClick}
        onMouseOver={onMouseOver}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
