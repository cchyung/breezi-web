"use client";

import { CreateListButton } from "@/app/components/list";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { FollowButton, UserProfileContent } from "@/app/components/user";
import {
  GetUserListsQuery,
  GetUserListsQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
  List,
} from "@/lib/api";
import { GET_USER_LISTS } from "@/lib/api/list/queries";
import { GET_USER } from "@/lib/api/user/queries";
import { useQuery } from "@apollo/client";

const UserPage = ({ params }: { params: { id: string } }) => {
  const { loading, data, refetch } = useQuery<
    GetUserListsQuery,
    GetUserListsQueryVariables
  >(GET_USER_LISTS, {
    variables: {
      userId: params.id,
    },
    nextFetchPolicy: "network-only",
  });

  const {
    loading: userLoading,
    data: userData,
    refetch: refetchUser,
  } = useQuery<GetUserQuery, GetUserQueryVariables>(GET_USER, {
    variables: {
      id: params.id,
    },
    nextFetchPolicy: "cache-and-network",
  });

  if (userLoading) return <p>Loading...</p>;
  else if (!userData?.user) {
    return (
      <>
        <p>User not found</p>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col mt-10 gap-4">
          <div className="w-full flex flex-col items-center gap-4">
            <UserAvatar user={userData.user} size="lg" />

            <h3 className="username-lg">@{userData.user.username}</h3>

            {userData.user.about && (
              <p className="caption">{userData.user.about}</p>
            )}

            <FollowButton user={userData.user} refetchUser={refetchUser} />

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-2 items-center px-4">
                <p className="font-bold text-[20px]">16</p>
                <p className="text-gray-400 caption">Lists</p>
              </div>
              <div className="flex flex-col gap-2 items-center px-4">
                <p className="font-bold text-[20px]">
                  {userData.user.followerCount ?? 0}
                </p>
                <p className="text-gray-400 caption">
                  {userData.user.followerCount &&
                  userData.user.followerCount === 1
                    ? "Follower"
                    : "Followers"}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-center px-4">
                <p className="font-bold text-[20px]">129k</p>
                <p className="text-gray-400 caption">Likes</p>
              </div>
            </div>
            {!loading && data && (
              <UserProfileContent lists={data?.userLists as List[]} />
            )}
          </div>

          <CreateListButton onCreation={refetch} />
        </div>
      </>
    );
  }
};

export default UserPage;
