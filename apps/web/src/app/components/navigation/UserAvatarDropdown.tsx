"use client";
import { Menu } from "@headlessui/react";
import { UserAvatar } from "../ui";
import { User } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/app/components/user/UserProvider";

const UserAvatarDropdown = ({ user }: { user: User }) => {
  const router = useRouter();
  const { updateLocalUser } = useContext(UserContext);

  const logout = () => {
    updateLocalUser(null);
    router.push("/list");
  };

  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          <UserAvatar user={user} size="md" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-4 flex flex-col w-36 bg-white shadow-xl rounded-xl">
          <Menu.Item>
            <a
              href={`/user/${user._id}`}
              className="px-4 pb-2 pt-4 hover:bg-gray-100 transition-colors"
            >
              My Profile
            </a>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={logout}
              className="px-4 pt-2 pb-4 hover:bg-gray-100 transition-colors text-left"
            >
              Logout
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default UserAvatarDropdown;
