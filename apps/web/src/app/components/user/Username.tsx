"use client";
import { User } from "@/lib/api";

const Username = ({
  className,
  user,
  size = "sm",
}: {
  className?: string;
  user: User;
  size?: "sm" | "lg";
}) => {
  let sizeStyles = {
    sm: "username-sm",
    lg: "username-lg",
  };

  return (
    <a href={`/user/${user._id}`} className={className}>
      <span className={sizeStyles[size]}>{user.username}</span>
    </a>
  );
};

export default Username;
