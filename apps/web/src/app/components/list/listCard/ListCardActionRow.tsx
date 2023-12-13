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
import { UserContext } from "@/app/components/user/UserProvider";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

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
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [likeLoading, setLikeLoading] = useState(false);

  const onLikeButtonClick = async () => {
    if (likeLoading) {
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      setLikeLoading(true);
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
    } catch (e) {
      console.error(e);
    } finally {
      setLikeLoading(false);
    }
  };

  const onShareButtonClick = () => {
    const listURL =
      location.protocol +
      "//" +
      window.location.host +
      "/list/" +
      listId +
      "?shared=true";

    // check if native share is available
    if (navigator.share) {
      navigator.share({
        title: "Breezi",
        text: "Check out this list on Breezi",
        url: listURL,
      });
    } else {
      // put link in clipboard
      navigator.clipboard.writeText(listURL);

      // TODO: Show pop up saying link is copied to clipboard
    }
  };

  return (
    <div className="w-full flex items-center gap-2">
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
        className="flex flex-col items-center gap-1 rounded-3xl w-1/2 py-2 bg-gray-200 text-gray-400 btn-small hover:text-white hover:bg-primary"
        onClick={onShareButtonClick}
      >
        <ShareIcon className="w-8"></ShareIcon>
        Share
      </button>
    </div>
  );
};

export default ListCardActionRow;
