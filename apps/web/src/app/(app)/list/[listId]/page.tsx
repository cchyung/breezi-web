import StatefulListCard from "@/app/components/list/listCard/StatefulListCard";
import { Amplitude, AmplitudeEventType } from "@/app/lib/analytics";
import { GetListQuery, GetListQueryVariables } from "@/lib/api";
import { getClient } from "@/lib/api/client";
import { GET_LIST } from "@/lib/api/list/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { URLSearchParams } from "url";

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

const ListPage = async ({
  params,
  searchParams,
}: {
  params: { listId: string };
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  let list = await getList(params.listId);

  if (!list) {
    // 404
    return notFound();
  }

  if (Boolean(searchParams["shared"])) {
    console.log("tracking shared list view event")
    Amplitude.trackEvent(AmplitudeEventType.SHARED_LIST_VIEW, {
      listId: list._id,
    });
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
