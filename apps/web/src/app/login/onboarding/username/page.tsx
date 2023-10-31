"use client";

import { Button, Input } from "@/app/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Username = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const onSubmit = (username: string) => {
    // validate username
    // update user's username in backend and update local storage
    // navigate to home
    router.push(`/`);
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
