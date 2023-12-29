import { CSSProperties, PropsWithChildren } from "react";

const Card = ({
  color,
  tight = false,
  children,
  className,
  overrideBgStyle = false,
  style,
}: PropsWithChildren<{
  color?: "white";
  className?: string;
  tight?: boolean;
  overrideBgStyle?: boolean;
  style?: CSSProperties;
}>) => {
  const bgStyles = {
    white: "bg-white",
  };

  const paddingStyle = tight ? "p-0" : "p-5";

  const bgStyle = !overrideBgStyle
    ? color
      ? bgStyles[color]
      : bgStyles["white"]
    : "";

  return (
    <div
      className={`flex flex-col rounded-2xl ${paddingStyle} ${bgStyle} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
