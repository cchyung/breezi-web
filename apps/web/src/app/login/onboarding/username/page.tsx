"use client";

import { Button, Input } from "@/app/components/ui";
import { UserContext } from "@/app/components/user/UserProvider";
import { UpdateUserMutation, UpdateUserMutationVariables } from "@/lib/api";
import { UPDATE_USER } from "@/lib/api/user/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";

const Username = () => {
  const router = useRouter();
  const { user, updateLocalUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER);

  const onSubmit = useCallback(
    async (username: string) => {
      try {
        setErrorMessage("");
        setLoading(true);
        if (!user) {
          console.error("No user logged in");
          return;
        }
        // validate username
        if (username.length === 0) {
          return;
        }

        // update user's username in backend and update local storage
        await updateUser({
          variables: {
            id: user._id as string,
            user: {
              username: username,
              registered: true,
            },
          },
          onError(error) {
            const graphQLError = error.graphQLErrors?.[0];
            if (graphQLError?.extensions?.code === "USERNAME_TAKEN") {
              setErrorMessage("Username taken, please select a new one");
            }
            throw error;
          },
        });

        updateLocalUser({
          ...user,
          username: username,
          registered: true,
        });

        // navigate to home
        router.push(`/login/onboarding/profile-image`);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [user]
  );

  return (
    <>
      <div className="h-screen w-screen grid items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <img src="/logo/logo.png" className="w-64" />
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
            className="w-full"
          />
          <Button
            loading={loading}
            disabled={username.length === 0}
            onClick={() => {
              onSubmit(username);
            }}
            className="w-full"
          >
            Continue
          </Button>

          {errorMessage?.length > 0 && (
            <span className="text-red-400">{errorMessage}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Username;
