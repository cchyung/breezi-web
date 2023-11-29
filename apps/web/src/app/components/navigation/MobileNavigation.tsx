"use client";

import { usePathname, useRouter } from "next/navigation";
import AddIcon from "../icon/AddIcon";
import HomeIcon from "../icon/HomeIcon";
import ProfileIcon from "../icon/ProfileIcon";
import { getUserFromLocalStorage } from "@/app/lib/auth";

const MobileNavigation = () => {
  const router = useRouter();
  const userData = getUserFromLocalStorage();
  const pathname = usePathname();

  if (pathname.includes("/login")) return null;

  return (
    <>
      <div className="h-[52px]"></div>
      <div className="fixed bottom-0 w-full bg-white md:hidden flex items-center justify-around">
        <button className="py-2 hover:text-primary transition-colors">
          <HomeIcon className="w-6 h-6" />
        </button>

        <button
          className="bg-black rounded-full h-full p-2 border-2 border-white shadow-md hover:bg-primary hover:-translate-y-2 transition-all"
          onClick={() => {
            router.push("/list/create");
          }}
        >
          <AddIcon className="text-white" />
        </button>

        <button
          className="py-2 hover:text-primary transition-colors"
          onClick={() => {
            if (!userData?._id) {
              router.push("/login");
            } else {
              router.push("/user/" + userData?._id);
            }
          }}
        >
          <ProfileIcon className="w-8 h-8" />
        </button>
      </div>
    </>
  );
};

export default MobileNavigation;
