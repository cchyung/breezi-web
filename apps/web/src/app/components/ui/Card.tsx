import { PropsWithChildren } from "react";

const Card = ({
  color,
  tight = false,
  children,
  className,
}: PropsWithChildren<{ color?: "white"; className?: string; tight?: boolean }>) => {
  const bgStyles = {
    white: "bg-white",
  };

  const paddingStyle =  tight ? "p-0" :"p-5"

  const bgStyle = color ? bgStyles[color] : bgStyles["white"];

  return (
    <div className={`flex flex-col rounded-2xl ${paddingStyle} ${bgStyle} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
