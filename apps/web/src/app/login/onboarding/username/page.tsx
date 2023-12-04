"use client";

import { Button, Input } from "@/app/components/ui";
import { getUserFromLocalStorage } from "@/app/lib/auth";
import { UpdateUserMutation, UpdateUserMutationVariables } from "@/lib/api";
import { UPDATE_USER } from "@/lib/api/user/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Username = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER);

  const onSubmit = async (username: string) => {
    // validate username
    // update user's username in backend and update local storage
    await updateUser({
      variables: {
        id: getUserFromLocalStorage()?._id as string,
        user: {
          username: username,
        },
      },
    });

    // navigate to home
    router.push(`/user/${getUserFromLocalStorage()?._id}`);
  };

  return (
    <>
      <div className="h-screen w-screen grid items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo/star3.png" alt="star" className="w-48" />
          <h1>Add your name</h1>
          <p className="mb-4">
            Add your display name so that friends can find you
          </p>
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              onSubmit(username);
            }}
          >
            Almost There!
          </Button>
        </div>
      </div>
    </>
  );
};

export default Username;
