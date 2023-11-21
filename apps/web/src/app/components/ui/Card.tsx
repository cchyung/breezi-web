import { PropsWithChildren } from "react";

const Card = ({ color, children }: PropsWithChildren<{ color?: "white" }>) => {
  const bgStyles = {
    white: "bg-white",
  };

  const bgStyle = color ? bgStyles[color] : bgStyles["white"];

  return (
    <div className={`flex flex-col rounded-2xl p-5 ${bgStyle}`}>{children}</div>
  );
};

export default Card;
