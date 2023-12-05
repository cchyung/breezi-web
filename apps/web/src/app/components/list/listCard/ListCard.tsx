"use client";
import { Card } from "@/app/components/ui";
import {
  GetListQuery,
  GetListQueryVariables,
  List,
  ListLike,
  ListType,
} from "@/lib/api";
import { UserAvatar } from "@/app/components/ui";
import { ListCardActionRow } from ".";
import { useApolloClient } from "@apollo/client";
import { GET_LIST } from "@/lib/api/list/queries";
import { useContext } from "react";
import { UserContext } from "../../user/UserProvider";

const ListCard = ({
  list,
  onRefetch,
}: {
  list: List;
  onRefetch?: (list: List) => void;
}) => {
  const client = useApolloClient();
  const refetchList = async () => {
    const query = await client.query<GetListQuery, GetListQueryVariables>({
      query: GET_LIST,
      variables: {
        id: list._id,
      },
      fetchPolicy: "network-only",
    });

    if (onRefetch) {
      onRefetch(query.data.list as List);
    }
  };

  const { user } = useContext(UserContext);

  return (
    <Card className="shadow-xl">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-3 items-center">
          <UserAvatar user={list.author} size="sm" />
          <p className="font-bold">@{list.author.username}</p>
        </div>

        {list.coverImageURL && (
          <img
            className="h-36 w-full rounded-md object-cover"
            alt="list cover"
            src={list.coverImageURL}
          />
        )}

        <h3 className="font-bold">{list.title}</h3>
        {list.description && <p>{list.description}</p>}

        <ul
          className={`flex flex-col gap-1 list-inside ${
            list.type === ListType.Bulleted ? "list-disc" : "list-decimal"
          }`}
        >
          {list.items.map((item, index) => (
            <li key={index}>{item?.text}</li>
          ))}
        </ul>
        <ListCardActionRow
          listId={list._id}
          likeCount={list.likeCount}
          userLiked={!!list.likes?.find((like) => like?.user === user?._id)} // todo fix
          refetchList={refetchList}
        />
      </div>
    </Card>
  );
};

export default ListCard;
