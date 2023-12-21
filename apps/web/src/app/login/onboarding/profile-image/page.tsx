"use client";

import { Button } from "@/app/components/ui";
import { UserContext, UserProfileImageUpload } from "@/app/components/user";
import {
  GetUploadProfileImageUrlQuery,
  GetUploadProfileImageUrlQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from "@/lib/api";
import { GET_UPLOAD_PROFILE_IMAGE_URL } from "@/lib/api/upload/queries";
import { UPDATE_USER } from "@/lib/api/user/queries";
import { getObjectURL, uploadFileToSignedURL } from "@/lib/upload";
import { useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";

const ProfileImage = () => {
  const router = useRouter();
  const { user, updateLocalUser } = useContext(UserContext);
  const client = useApolloClient();

  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER);
  const [imageFile, setImageFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (imageFile?: File) => {
      try {
        setLoading(true);

        if (!user) {
          console.error("No user logged in");
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
                id: user._id as string,
                user: {
                  imageURL: profileImageURL,
                },
              },
            });

            updateLocalUser({
              ...user,
              imageURL: profileImageURL,
            });
          } else {
            console.error(new Error("Failed to get upload url"));
          }
        }
        // navigate to home
        router.push(`/list/create?firstList=true`);
      } catch (error) {
        console.error(error);
      } finally {
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
          <h1>Add a profile photo</h1>
          <UserProfileImageUpload
            user={user}
            onFileDrop={(file) => setImageFile(file)}
          />
          <Button
            onClick={() => {
              onSubmit(imageFile);
            }}
            className="w-full"
            loading={loading}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileImage;
