"use client";
import { useQuery } from "@apollo/client";
import { CreateListButton, ListGallery } from "@/app/components/list";
import {
  GetListsQuery,
  GetListsQueryVariables,
  List,
  ListState,
} from "@/lib/api";
import { GET_LISTS } from "@/lib/api/list/queries";

export default function Home() {
  const { loading, data, refetch } = useQuery<
    GetListsQuery,
    GetListsQueryVariables
  >(GET_LISTS, {
    variables: {
      cursor: 0,
      pageSize: 10,
      state: ListState.Published,
    },
    nextFetchPolicy: "cache-and-network",
  });

  return (
    <>
      <div className="flex flex-col mt-10 gap-4 max-w-6xl mx-auto">
        {loading ? <></> : <ListGallery initialLists={data?.lists as List[]} />}
      </div>
      <CreateListButton onCreation={refetch} />
    </>
  );
}
