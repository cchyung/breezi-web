"use client";
import { useQuery } from "@apollo/client";
import { CreateListButton, ListGallery } from "@/app/components/list";
import { GetListsQuery, GetListsQueryVariables, List } from "@/lib/api";
import { GET_LISTS } from "@/lib/api/list/queries";
import { useEffect } from "react";

export default function Home() {
  const { loading, data, refetch } = useQuery<GetListsQuery, GetListsQueryVariables>(
    GET_LISTS,
    {
      variables: {
        cursor: 0,
        pageSize: 10,
      },
    }
  );

  return (
    <>
      <div className="flex flex-col mt-10 gap-4 max-w-6xl mx-auto">
        {loading ? <></> : <ListGallery lists={data?.lists as List[]} />}
      </div>
      <CreateListButton onCreation={refetch} />
    </>
  );
}
