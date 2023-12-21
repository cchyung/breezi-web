"use client";
import { CreateListButton } from "@/app/components/list/create";
import UserAvatar from "@/app/components/ui/UserAvatar";
import {
  FollowButton,
  UserContext,
  UserProfileContent,
  UserProfileDetails,
  UserProfileImageUpload,
} from "@/app/components/user";
import {
  GetUserListsQuery,
  GetUserListsQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
  List,
  ListState,
  User,
} from "@/lib/api";
import { GET_USER_LISTS } from "@/lib/api/list/queries";
import { GET_USER } from "@/lib/api/user/queries";
import { useQuery } from "@apollo/client";
import { useCallback, useContext, useState } from "react";
import { ListGallery } from "../list";

const UserProfile = ({ initialUser }: { initialUser: User }) => {
  const [user, setUser] = useState<User>(initialUser);
  const { user: loggedInUser } = useContext(UserContext);

  const { loading, data, refetch } = useQuery<
    GetUserListsQuery,
    GetUserListsQueryVariables
  >(GET_USER_LISTS, {
    variables: {
      userId: user._id,
    },
    nextFetchPolicy: "network-only",
  });

  const { refetch: _refetchUser } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(GET_USER, {
    variables: { id: user._id },
    nextFetchPolicy: "network-only",
    skip: true,
  });

  const refetchUser = useCallback(async () => {
    const userRefetch = await _refetchUser({ id: user._id });
    if (userRefetch.data?.user) {
      setUser(userRefetch.data.user);
    }
  }, [user]);

  return (
    <div className="flex flex-col mt-10 gap-4 max-w-6xl mx-auto md:p-3 py-3">
      <div className="w-full flex flex-col items-center gap-4">
        <UserProfileDetails user={user} refetchUser={refetchUser} />

        {loggedInUser && loggedInUser?._id !== user._id && (
          <FollowButton user={user} refetchUser={refetchUser} />
        )}

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2 items-center px-4">
            <p className="font-bold text-[20px]">
              {data?.userLists?.filter((l) => l?.state !== ListState.Draft)
                .length ?? 0}
            </p>
            <p className="text-gray-400 caption">Lists</p>
          </div>
          <div className="flex flex-col gap-2 items-center px-4">
            <p className="font-bold text-[20px]">{user.followerCount ?? 0}</p>
            <p className="text-gray-400 caption">
              {user.followerCount && user.followerCount === 1
                ? "Follower"
                : "Followers"}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center px-4">
            <p className="font-bold text-[20px]">{user.likeCount}</p>
            <p className="text-gray-400 caption">Likes</p>
          </div>
        </div>

        {!loading && data && (
          <>
            {loggedInUser?._id === user._id ? (
              <UserProfileContent lists={data.userLists as List[]} />
            ) : (
              <div className="mx-auto max-w-6xl w-full p-3">
                <ListGallery initialLists={data.userLists as List[]} />
              </div>
            )}
          </>
        )}
      </div>

      <CreateListButton onCreation={refetch} />
    </div>
  );
};
export default UserProfile;
