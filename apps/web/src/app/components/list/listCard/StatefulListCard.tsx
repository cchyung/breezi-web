"use client";

import { GetListQuery, GetListQueryVariables, List } from "@/lib/api";
import { useEffect, useState } from "react";
import { ListCard } from ".";
import { useQuery } from "@apollo/client";
import { GET_LIST } from "@/lib/api/list/queries";

const StatefulListCard = ({ list }: { list: List }) => {
  const { data, refetch } = useQuery<GetListQuery, GetListQueryVariables>(
    GET_LIST,
    {
      variables: {
        id: list._id,
      },
      skip: true,
      nextFetchPolicy: "network-only",
    }
  );

  const refetchList = async () => {
    const listRefetch = await refetch();
    if (listRefetch.data?.list) {
      console.log("refetching", listRefetch.data.list);
      setList(listRefetch.data.list);
    }
  };

  const [_list, setList] = useState<List>(list);

  useEffect(() => {
    if (data?.list) {
      setList(data.list);
    } else {
      setList(list);
    }
  }, [list]);

  return <ListCard list={_list} refetch={refetchList} />;
};

export default StatefulListCard;
