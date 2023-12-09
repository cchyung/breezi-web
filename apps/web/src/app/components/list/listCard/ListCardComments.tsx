"use client";

import {
  AddCommentToListMutation,
  AddCommentToListMutationVariables,
  List,
} from "@/lib/api";
import { useCallback, useContext, useState } from "react";
import { Input } from "../../ui";
import { UpArrowIcon } from "../../icon";
import { useApolloClient } from "@apollo/client";
import { ADD_COMMENT_TO_LIST } from "@/lib/api/list/queries";
import { UserContext } from "@/app/components/user/UserProvider";
import { useRouter } from "next/navigation";

const ListCardComments = ({
  list,
  refetchList,
}: {
  list: List;
  refetchList: () => Promise<void>;
}) => {
  const client = useApolloClient();
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");

  const submitComment = useCallback(
    async (text: string) => {
      if (!user) {
        router.push("/login");
        return;
      }

      await client.mutate<
        AddCommentToListMutation,
        AddCommentToListMutationVariables
      >({
        mutation: ADD_COMMENT_TO_LIST,
        variables: {
          listId: list._id,
          text: text,
        },
      });
      setCommentText("");
      refetchList();
    },
    [user]
  );

  return (
    <div className="flex flex-col gap-2">
      {list.comments
        ?.slice(0, expanded ? list.comments.length : 5)
        .map((comment) => (
          <div key={comment._id} className="flex flex-row gap-1">
            <p className="font-bold">@{comment.author.username}</p>
            <p>{comment.text}</p>
          </div>
        ))}

      {list.comments?.length && list.comments?.length > 5 ? (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-gray-500 underline text-[16px] text-left"
        >
          {expanded ? "Hide" : "View"} {list.comments?.length} comments
        </button>
      ) : (
        ""
      )}

      <div className="mt-2">
        <Input
          type="text"
          placeholder="Add a Comment"
          onChange={({ target: { value } }) => {
            setCommentText(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitComment(commentText);
            }
          }}
          value={commentText}
          inputClassName="pr-14"
        >
          <div
            className={`absolute right-0 top-0 h-full p-2 transition-opacity ${
              commentText.length > 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              className="bg-blue-600 text-white rounded-3xl h-full px-2"
              onClick={() => submitComment(commentText)}
              disabled={commentText.length === 0}
            >
              <UpArrowIcon />
            </button>
          </div>
        </Input>
      </div>
    </div>
  );
};

export default ListCardComments;
