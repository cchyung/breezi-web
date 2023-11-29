"use client";
import { getUserFromLocalStorage } from "@/app/lib/auth";
import UserAvatar from "../ui/UserAvatar";
import { Button } from "../ui";
import { useRouter } from "next/navigation";

const DesktopNavigation = () => {
  const userData = getUserFromLocalStorage();
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="w-full max-w-6xl mx-auto p-4 flex items-center justify-between">
        <a href="/">
          <img
            src="/logo/wordmark.png"
            className="w-32"
            alt="breezi wordmark"
          />
        </a>

        {userData && userData._id ? (
          <UserAvatar
            user={{
              imageURL: userData?.imageURL,
              username: userData?.username,
              _id: userData?._id!,
            }}
            size="md"
          />
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default DesktopNavigation;
