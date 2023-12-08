"use client";
import UserAvatar from "../ui/UserAvatar";
import { Button } from "../ui";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../user";
import UserAvatarDropdown from "./UserAvatarDropdown";

const DesktopNavigation = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="w-full max-w-6xl mx-auto p-4 flex items-center justify-between">
        <a href="/list">
          <img
            src="/logo/wordmark.png"
            className="w-32"
            alt="breezi wordmark"
          />
        </a>

        {user && user._id ? (
          <UserAvatarDropdown
            user={{
              imageURL: user?.imageURL,
              username: user?.username,
              _id: user?._id,
            }}
          />
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default DesktopNavigation;
