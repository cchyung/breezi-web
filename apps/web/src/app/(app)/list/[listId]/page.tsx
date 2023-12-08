"use client";

import { ListCard } from "@/app/components/list";
import { GetListQuery, GetListQueryVariables } from "@/lib/api";
import { GET_LIST } from "@/lib/api/list/queries";
import { useQuery } from "@apollo/client";

const ListPage = ({ params }: { params: { listId: string } }) => {
  const { loading, data, refetch } = useQuery<
    GetListQuery,
    GetListQueryVariables
  >(GET_LIST, {
    variables: {
      id: params.listId,
    },
    nextFetchPolicy: "network-only",
  });

  if (!loading && data?.list) {
    return (
      <div className="w-full flex justify-center px-4">
        <div className="w-full md:w-[412px]">
          <ListCard list={data.list} refetch={refetch} />
        </div>
      </div>
    );
  }
};
export default ListPage;
