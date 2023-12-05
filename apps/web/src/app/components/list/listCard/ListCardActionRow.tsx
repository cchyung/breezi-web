"use client";
import { BreeziStarIcon, ShareIcon } from "@/app/components/icon";
import {
  LikeListMutation,
  LikeListMutationVariables,
  UnlikeListMutation,
  UnlikeListMutationVariables,
} from "@/lib/api";
import { LIKE_LIST, UNLIKE_LIST } from "@/lib/api/list/queries";
import { useApolloClient } from "@apollo/client";

const ListCardActionRow = ({
  listId,
  likeCount,
  userLiked,
  refetchList,
}: {
  listId: string;
  likeCount?: number | null;
  userLiked: boolean;
  refetchList: () => Promise<void>;
}) => {
  const client = useApolloClient();
  const onLikeButtonClick = async () => {
    if (!userLiked) {
      await client.mutate<LikeListMutation, LikeListMutationVariables>({
        mutation: LIKE_LIST,
        variables: {
          listId: listId,
        },
        fetchPolicy: "network-only",
      });
    } else {
      await client.mutate<UnlikeListMutation, UnlikeListMutationVariables>({
        mutation: UNLIKE_LIST,
        variables: {
          listId: listId,
        },
        fetchPolicy: "network-only",
      });
    }
    await refetchList();
  };

  return (
    <div className="w-full flex items-center gap-4">
      <button
        className={`flex flex-col items-center gap-1 rounded-3xl w-1/2 py-2  ${
          userLiked ? "bg-secondary text-primary" : "bg-gray-200 text-gray-400"
        } hover:text-white hover:bg-primary transition-colors btn-small`}
        onClick={onLikeButtonClick}
      >
        <BreeziStarIcon className="w-10 ml-2"></BreeziStarIcon>
        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
      </button>

      <button
        className="flex flex-col items-center gap-1 rounded-3xl w-1/2 py-2 bg-gray-200 text-gray-400 btn-small"
        onClick={() => {
          window.alert("TODO: Implement share");
        }}
      >
        <ShareIcon className="w-8 text-gray-400"></ShareIcon>
        Share
      </button>
    </div>
  );
};

export default ListCardActionRow;
