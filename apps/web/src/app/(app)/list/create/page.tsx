"use client";
import { CreateList } from "@/app/components/list";
import { Card } from "@/app/components/ui";
import { UserContext } from "@/app/components/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

const CreateListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useContext(UserContext);

  return (
    <div className="absolute top-0 h-screen w-screen py-4 px-2 flex flex-col gap-8 items-center justify-center bg-gray-100">
      {searchParams.get("firstList") === "true" && (
        <h1 className="text-[48px] max-w-xl text-center">
          Let's create your first list on Breezi
        </h1>
      )}

      <Card className="shadow-xl max-w-md" tight={true}>
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
