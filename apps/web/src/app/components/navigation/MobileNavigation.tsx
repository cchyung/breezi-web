"use client";

import { usePathname, useRouter } from "next/navigation";
import { AddIcon, HomeIcon, ProfileIcon } from "../icon";

import { UserContext } from "../user/UserProvider";
import { useContext } from "react";

function iOS() {
  // if navigator is not present, we are probably in SSR
  if (typeof navigator === "undefined") return false;
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

const MobileNavigation = () => {
  const router = useRouter();
  const { user: userData } = useContext(UserContext);
  const pathname = usePathname();

  if (pathname.includes("/login")) return null;
  if (pathname.includes("/create")) return null;

  return (
    <>
      <div className={`h-[52px] pb-safe`}></div>
      <div
        className={`fixed bottom-0 w-full bg-white md:hidden flex items-center justify-around pb-safe`}
      >
        <button
          className="py-2 hover:text-primary transition-colors"
          onClick={() => {
            router.push("/");
          }}
        >
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
