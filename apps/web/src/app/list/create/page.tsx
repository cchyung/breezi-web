"use client";
import { CreateList } from "@/app/components/list";
import { getUserFromLocalStorage } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

const CreateListPage = () => {
  const router = useRouter();
  const userData = getUserFromLocalStorage();

  return (
    <div className="h-screen w-screen bg-white py-4 px-2">
      <CreateList
        onCreation={() => {
          router.push(`/user/${userData?._id}`);
        }}
        create={true}
      />
    </div>
  );
};

export default CreateListPage;
