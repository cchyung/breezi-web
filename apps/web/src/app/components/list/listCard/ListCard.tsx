"use client";
import { Card } from "@/app/components/ui";
import { GetListQuery, GetListQueryVariables, List, ListType } from "@/lib/api";
import { UserAvatar } from "@/app/components/ui";
import { ListCardActionRow } from ".";
import { useApolloClient } from "@apollo/client";
import { GET_LIST } from "@/lib/api/list/queries";
import { useContext } from "react";
import { UserContext } from "../../user/UserProvider";
import ListCardOptions from "./ListCardOptions";
import { formatTime } from "@/app/lib/utils/formatting";
import ListCardComments from "./ListCardComments";

const ListCard = ({
  list,
  onRefetch,
  showOptions = false,
  refetch,
}: {
  list: List;
  onRefetch?: (list: List) => void;
  showOptions?: boolean;
  refetch?: () => Promise<any>; // refetch function from parent
}) => {
  const client = useApolloClient();
  const refetchList = async () => {
    if (refetch) {
      refetch();
    } else {
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
    }
  };

  const { user } = useContext(UserContext);

  return (
    <Card className="shadow-xl">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1 items-center mb-2">
          <UserAvatar user={list.author} size="sm" />
          <p className="font-bold ml-2">@{list.author.username}</p>
          <p className="text-gray-400">·</p>
          <p className="text-gray-400">
            {/* {formatTime(new Date(list.createdAt), new Date(), true)} */}
            {list.createdAt !== list.updatedAt
              ? `Updated ${formatTime(
                  new Date(list.updatedAt),
                  new Date(),
                  true
                )}`
              : `Posted ${formatTime(
                  new Date(list.createdAt),
                  new Date(),
                  true
                )}`}
          </p>

          {showOptions && (
            <div className="ml-auto">
              <ListCardOptions refetchList={refetchList} list={list} />
            </div>
          )}
        </div>

        {list.coverImageURL && (
          <img
            className="h-40 w-full rounded-3xl object-cover"
            alt="list cover"
            src={list.coverImageURL}
          />
        )}

        <h3 className="font-bold">{list.title}</h3>
        {list.description && <p>{list.description}</p>}
        <ul
          className={`flex flex-col gap-1 ml-4 list-inside overflow-hidden ${
            list.type === ListType.Bulleted ? "list-disc" : "list-decimal"
          }`}
        >
          {list.items.map((item, index) => (
            <li key={index}>{item?.text}</li>
          ))}
        </ul>

        <ListCardComments list={list} refetchList={refetchList} />
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
