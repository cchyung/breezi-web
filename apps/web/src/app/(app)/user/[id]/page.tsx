import UserProfile from "@/app/components/user/UserProfile";
import { GetUserQuery, GetUserQueryVariables } from "@/lib/api";
import { getClient } from "@/lib/api/client";
import { GET_USER } from "@/lib/api/user/queries";
import { notFound } from "next/navigation";

const getUser = async (userId: string) => {
  const client = getClient();
  const userQuery = await client.query<GetUserQuery, GetUserQueryVariables>({
    query: GET_USER,
    variables: { id: userId },
  });
  return userQuery.data.user;
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const client = getClient();
  const userQuery = await client.query<GetUserQuery, GetUserQueryVariables>({
    query: GET_USER,
    variables: { id: params.id },
  });

  return {
    title: `@${userQuery.data.user?.username} on Breezi`,
    description: `View ${params.id}'s lists on Breezi`,
    openGraph: {
      images: [
        ...(userQuery.data.user?.imageURL
          ? [userQuery.data.user?.imageURL]
          : []),
      ],
    },
  };
};

const UserPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);

  if (!user) {
    return notFound();
  } else {
    return (
      <>
        <UserProfile initialUser={user} />
      </>
    );
  }
};

export default UserPage;
