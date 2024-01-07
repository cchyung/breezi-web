"use client";
import { CrossIcon } from "@/app/components/icon";
import { CreateList } from "@/app/components/list";
import { Card } from "@/app/components/ui";
import { UserContext } from "@/app/components/user/UserProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

const CreateListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useContext(UserContext);

  return (
    <div className="absolute top-0 pt-safe  h-screen w-screen md:py-4 md:px-2 flex flex-col gap-8 items-center justify-center bg-gray-100">
      {searchParams.get("firstList") === "true" && (
        <h1 className="text-[32px] md:text-[48px] max-w-xl px-12 pt-8">
          Let's create your first list on Breezi!
        </h1>
      )}

      <Card
        className="shadow-xl md:max-w-md md:h-auto w-full h-full relative"
        tight={true}
      >
        <CreateList
          onCreation={() => {
            router.push(`/user/${user?._id}`);
          }}
          create={true}
        />

        <button className="absolute top-7 left-6" onClick={router.back}>
          <CrossIcon className="w-4 h-4" />
        </button>
      </Card>
    </div>
  );
};

export default CreateListPage;
