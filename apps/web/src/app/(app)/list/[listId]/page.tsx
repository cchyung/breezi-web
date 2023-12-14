import { ListCard } from "@/app/components/list";
import StatefulListCard from "@/app/components/list/listCard/StatefulListCard";
import { GetListQuery, GetListQueryVariables } from "@/lib/api";
import { getClient } from "@/lib/api/client";
import { GET_LIST } from "@/lib/api/list/queries";
import { useQuery } from "@apollo/client";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

const getList = async (listId: string) => {
  "use server";
  const client = getClient();
  const listQuery = await client.query<GetListQuery, GetListQueryVariables>({
    query: GET_LIST,
    variables: { id: listId },
  });
  return listQuery.data.list;
};

interface Props {
  params: {
    listId: string;
  };
  searchParams: URLSearchParams;
}
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const list = await getList(params.listId);
  return {
    title: `@${list?.author?.username} on Breezi: ${list?.title}`,
    description: list?.description || "View this list on Breezi",
    openGraph: {
      images: [
        ...(list?.coverImageURL
          ? [list?.coverImageURL]
          : ["https://getbreezi.com/logo/placeholder.jpeg"]),
      ],
    },
  };
};

const ListPage = async ({ params }: { params: { listId: string } }) => {
  let list = await getList(params.listId);

  if (!list) {
    // 404
    return notFound();
  }

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full md:w-[412px]">
        <StatefulListCard list={list} />
      </div>
    </div>
  );
};
export default ListPage;
