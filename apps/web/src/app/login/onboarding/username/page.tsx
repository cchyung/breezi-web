"use client";

import { Button, Input } from "@/app/components/ui";
import { UserContext } from "@/app/components/user";
import { UpdateUserMutation, UpdateUserMutationVariables } from "@/lib/api";
import { UPDATE_USER } from "@/lib/api/user/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";

const Username = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER);

  const onSubmit = useCallback(
    async (username: string) => {

      console.log(user)
      console.log(username)
      if (!user) {
        console.error("No user logged in");
        return;
      }
      // validate username
      // update user's username in backend and update local storage
      await updateUser({
        variables: {
          id: user._id as string,
          user: {
            username: username,
          },
        },
      });

      // navigate to home
      router.push(`/user/${user._id}`);
    },
    [user]
  );

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
