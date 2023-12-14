"use client";
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
    <div className="absolute top-0 h-screen w-screen md:py-4 md:px-2 flex flex-col gap-8 items-center justify-center bg-gray-100 pb-10">
      {searchParams.get("firstList") === "true" && (
        <h1 className="text-[48px] max-w-xl text-center">
          Let's create your first list on Breezi
        </h1>
      )}

      <Card
        className="shadow-xl md:max-w-md md:h-auto w-full h-full"
        tight={true}
      >
        <CreateList
          onCreation={() => {
            router.push(`/user/${user?._id}`);
          }}
          create={true}
        />
      </Card>
    </div>
  );
};

export default CreateListPage;
