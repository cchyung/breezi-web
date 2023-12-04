"use client";
import { CreateList } from "@/app/components/list";
import { UserContext } from "@/app/components/user";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const CreateListPage = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  return (
    <div className="h-screen w-screen bg-white py-4 px-2">
      <CreateList
        onCreation={() => {
          router.push(`/user/${user?._id}`);
        }}
        create={true}
      />
    </div>
  );
};

export default CreateListPage;
