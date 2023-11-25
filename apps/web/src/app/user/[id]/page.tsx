import { ListCard } from "@/app/components/list";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { UserProfileContent } from "@/app/components/user";
import {
  GetUserListsQuery,
  GetUserListsQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
  List,
} from "@/lib/api";
import { getClient } from "@/lib/api/client";
import { GET_USER_LISTS } from "@/lib/api/list/queries";
import { GET_USER } from "@/lib/api/user/queries";

const getUser = async (userId: string) => {
  const client = getClient();

  const query = await client.query<GetUserQuery, GetUserQueryVariables>({
    query: GET_USER,
    variables: {
      id: userId,
    },
  });
  return query.data.user;
};

const getUserLists = async (userId: string) => {
  const client = getClient();

  const query = await client.query<
    GetUserListsQuery,
    GetUserListsQueryVariables
  >({
    query: GET_USER_LISTS,
    variables: {
      userId,
    },
  });

  return query.data.userLists;
};

const UserPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);

  const lists = await getUserLists(params.id);

  if (!user) {
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
            <UserAvatar user={user} size="lg" />

            <h3 className="username-lg">@{user.username}</h3>

            {user.about && <p className="caption">{user.about}</p>}

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-2 items-center px-4">
                <p className="font-bold text-[20px]">16</p>
                <p className="text-gray-400 caption">Lists</p>
              </div>
              <div className="flex flex-col gap-2 items-center px-4">
                <p className="font-bold text-[20px]">12k</p>
                <p className="text-gray-400 caption">Followers</p>
              </div>
              <div className="flex flex-col gap-2 items-center px-4">
                <p className="font-bold text-[20px]">129k</p>
                <p className="text-gray-400 caption">Likes</p>
              </div>
            </div>

            <UserProfileContent lists={lists as List[]} />
          </div>
        </div>
      </>
    );
  }
};

export default UserPage;
