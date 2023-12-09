import { User } from "@/lib/api";

const UserAvatar = ({
  user,
  size = "md",
}: {
  user: Pick<User, "imageURL">;
  size: "sm" | "md" | "lg";
}) => {
  const sizeStyles = {
    sm: "w-9 h-9 border-2",
    md: "w-16 h-16 border-4",
    lg: "w-32 h-32 border-4",
  };

  const sizeStyle = sizeStyles[size];

  return (
    <>
      {user.imageURL ? (
        <img
          className={`rounded-full border-white shadow-lg object-cover ${sizeStyle}`}
          src={user.imageURL}
          alt="user profile"
        ></img>
      ) : (
        <div
          className={`bg-blue-400 rounded-full border-white shadow-lg ${sizeStyle}`}
        />
      )}
    </>
  );
};

export default UserAvatar;
