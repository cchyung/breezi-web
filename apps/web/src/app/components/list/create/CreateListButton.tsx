"use client";
import { useContext } from "react";
import { CreateListModalContext } from "./CreateListModalProvider";
import { AddIcon } from "@/app/components/icon";
import { UserContext } from "../../user/UserProvider";
import { useRouter } from "next/navigation";

const CreateListButton = ({ onCreation }: { onCreation: () => void }) => {
  const { openModal } = useContext(CreateListModalContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <button
      className="md:fixed bottom-12 right-12 w-12 h-12 border-4 border-white bg-primary rounded-xl hidden md:flex items-center justify-center shadow-xl"
      onClick={() => {
        if (!user) {
          router.push("/login");
        } else {
          openModal({ create: true, onCreation });
        }
      }}
    >
      <AddIcon className="w-6 h-6 text-white" />
    </button>
  );
};
export default CreateListButton;
