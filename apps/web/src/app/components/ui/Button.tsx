import { MouseEventHandler } from "react";
import { Spinner } from ".";

const Button = ({
  children,
  onClick,
  onMouseOver,
  size = "md",
  color = "primary",
  disabled = false,
  className = "",
  loading = false,
}: {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: MouseEventHandler<HTMLButtonElement>;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "gray" | "black" | "white";
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}) => {
  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-md",
    lg: "py-4 px-8 text-lg",
  };

  const sizeStyle = sizeStyles[size];

  const colorStyles = {
    primary: "bg-primary text-white",
    gray: "bg-gray-200 text-black",
    black: "bg-black text-white",
    white: "bg-white text-black",
  };

  const disabledStyle = "bg-gray-300 text-white";

  const colorStyle = colorStyles[color];
  return (
    <>
      <button
        className={`font-uxum-grotesque font-normal ${className} ${colorStyle} ${
          disabled && disabledStyle
        } relative disabled:cursor-not-allowed rounded-2xl
        transition-colors shadow-md`}
        onClick={onClick}
        onMouseOver={onMouseOver}
        disabled={loading || disabled}
      >
        <>
          <div
            className={`${sizeStyle} ${loading ? "opacity-0" : "opacity-1"}`}
          >
            {children}
          </div>

          <div className="absolute top-0 h-full w-full flex items-center justify-center">
            {loading && <Spinner className="h-[70%] aspect-square mx-auto" />}
          </div>
        </>
      </button>
    </>
  );
};

export default Button;
