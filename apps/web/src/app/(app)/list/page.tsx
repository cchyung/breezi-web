"use client";
import { useQuery } from "@apollo/client";
import { CreateListButton, ListGallery } from "@/app/components/list";
import { GetListFeedQuery, GetListFeedQueryVariables, List } from "@/lib/api";
import { GET_LIST_FEED } from "@/lib/api/list/queries";

export default function Home() {
  const { loading, data, refetch } = useQuery<
    GetListFeedQuery,
    GetListFeedQueryVariables
  >(GET_LIST_FEED, {
    variables: {
      cursor: 0,
      pageSize: 10,
    },
    nextFetchPolicy: "cache-and-network",
  });

  return (
    <>
      <div className="flex flex-col gap-4 max-w-6xl mx-auto p-3">
        {loading ? (
          <></>
        ) : (
          <ListGallery initialLists={data?.listFeed as List[]} />
        )}
      </div>
      <CreateListButton onCreation={refetch} />
    </>
  );
}
