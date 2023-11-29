import { User } from "@/lib/api";

const UserAvatar = ({
  user,
  size = "md",
}: {
  user: User;
  size: "sm" | "md" | "lg";
}) => {
  const sizeStyles = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-32 h-32",
  };

  const sizeStyle = sizeStyles[size];

  return (
    <>
      {user.imageURL ? (
        <img
          className={`rounded-full ${sizeStyle}`}
          src={user.imageURL}
          alt="user profile"
        ></img>
      ) : (
        <div className={`bg-blue-400 rounded-full ${sizeStyle}`} />
      )}
    </>
  );
};

export default UserAvatar;
