"use client";
import {
  GetUploadProfileImageUrlQuery,
  GetUploadProfileImageUrlQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from "@/lib/api";
import { UserContext, UserProfileImageUpload } from ".";
import { useCallback, useContext, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { GET_UPLOAD_PROFILE_IMAGE_URL } from "@/lib/api/upload/queries";
import { getObjectURL, uploadFileToSignedURL } from "@/lib/upload";
import { UPDATE_USER } from "@/lib/api/user/queries";
import { UserAvatar } from "../ui";
import { CheckIcon, CrossIcon, PencilIcon } from "../icon";

const UserProfileDetails = ({
  user,
  refetchUser,
}: {
  user: User;
  refetchUser: () => Promise<void>;
}) => {
  const client = useApolloClient();
  const { updateLocalUser, user: loggedInUser } = useContext(UserContext);
  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER);

  const [username, setUsername] = useState(user.username ?? "");
  const [editUsername, setEditUsername] = useState(false);

  const onProfileImageChange = useCallback(
    async (imageFile: File) => {
      if (!loggedInUser) {
        return;
      }

      if (imageFile) {
        const uploadImageURLQuery = await client.query<
          GetUploadProfileImageUrlQuery,
          GetUploadProfileImageUrlQueryVariables
        >({
          query: GET_UPLOAD_PROFILE_IMAGE_URL,
        });

        if (uploadImageURLQuery.data.uploadUserProfileImageURL) {
          const { url, key } =
            uploadImageURLQuery.data.uploadUserProfileImageURL;

          await uploadFileToSignedURL(url, imageFile);
          const profileImageURL = getObjectURL(key);

          // update user
          await updateUser({
            variables: {
              id: loggedInUser._id as string,
              user: {
                imageURL: profileImageURL,
              },
            },
          });

          await refetchUser();

          updateLocalUser({
            ...loggedInUser,
            imageURL: profileImageURL,
          });
        } else {
          console.error(new Error("Failed to get upload url"));
        }
      }
    },
    [user, loggedInUser]
  );

  const onUpdateUsername = useCallback(
    async (newUsername: string) => {
      if (!loggedInUser) {
        return;
      }

      if (newUsername === user.username) {
        return;
      }

      if (newUsername.length > 25) {
        alert("Username must be shorter than 25 characters");
        return;
      }

      try {
        await updateUser({
          variables: {
            id: loggedInUser._id as string,
            user: {
              username: newUsername,
            },
          },
          onError(error) {
            const graphQLError = error.graphQLErrors?.[0];
            if (graphQLError?.extensions?.code === "USERNAME_TAKEN") {
              alert("Username taken. Please select a different one");
            }
            throw error;
          },
        });

        updateLocalUser({
          ...loggedInUser,
          username: newUsername,
        });

        await refetchUser();
      } catch (error) {
        console.error(error);
      } finally {
        setEditUsername(false);
      }
    },
    [user, loggedInUser]
  );

  return (
    <>
      {loggedInUser?._id === user._id ? (
        <>
          <UserProfileImageUpload
            user={user}
            onFileDrop={(file) => onProfileImageChange(file)}
            isOnUserProfile={true}
          />

          {editUsername ? (
            <div className="relative flex items-center md:flex-row flex-col gap-2">
              <input
                className="username-lg text-center bg-white rounded-lg"
                value={username ?? ""}
                onChange={({ target: { value } }) => {
                  setUsername(value);
                }}
              ></input>
              <div className="h-full relative md:absolute md:left-full md:ml-4 flex items-center gap-3 text-sm">
                <button onClick={() => onUpdateUsername(username)}>
                  <CheckIcon className="w-5 h-5 text-green-600" />
                </button>

                <button
                  onClick={() => {
                    setEditUsername(false);
                  }}
                >
                  <CrossIcon className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setEditUsername((_editUsernane) => !_editUsernane);
              }}
              className="relative flex items-center gap-2 group"
            >
              <h3 className="username-lg">{user.username}</h3>
              <PencilIcon className="w-5 h-5 invisible group-hover:visible text-gray-400 absolute left-full ml-2" />
            </button>
          )}

          {user.about && <p className="caption">{user.about}</p>}
        </>
      ) : (
        <>
          <UserAvatar user={user} size="lg" />

          <h3 className="username-lg">{user.username}</h3>

          {user.about && <p className="caption">{user.about}</p>}
        </>
      )}
    </>
  );
};

export default UserProfileDetails;
