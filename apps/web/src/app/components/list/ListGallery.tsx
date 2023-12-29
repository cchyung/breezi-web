"use client";
import {
  GetListFeedQuery,
  GetListFeedQueryVariables,
  List,
  Topic,
} from "@/lib/api";
import { ListCard, ListGalleryTopicFilter } from ".";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useCallback, useEffect, useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_LIST_FEED } from "@/lib/api/list/queries";

const ListGallery = ({
  initialLists,
  topics,
  selectedTopic,
  setSelectedTopic,
  showOptions = false,
}: {
  initialLists: List[];
  topics?: Topic[];
  selectedTopic?: string | null;
  setSelectedTopic?: (topicId: string | null) => Promise<void>;
  showOptions?: boolean;
}) => {
  const [lists, setLists] = useState<List[]>(initialLists);

  useEffect(() => {
    setLists(initialLists);
  }, [initialLists]);

  const onRefetch = useCallback(
    (updatedList: List) => {
      setLists((currentLists) => {
        return currentLists.map((list) => {
          if (list._id === updatedList._id) {
            return updatedList;
          } else {
            return list;
          }
        });
      });
    },
    [lists]
  );

  return (
    <div className="w-full">
      {topics && topics.length > 0 ? (
        <ListGalleryTopicFilter topics={topics} onSelect={setSelectedTopic} />
      ) : (
        ""
      )}

      {lists?.length > 0 && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 380: 1, 750: 2 }}>
          <Masonry gutter={"12px"}>
            {lists?.length > 0 ? (
              lists?.map((list) => (
                <ListCard
                  list={list}
                  key={list._id}
                  onRefetch={onRefetch}
                  showOptions={showOptions}
                  onDelete={(deletedList) => {
                    setLists((currentLists) =>
                      currentLists.filter((l) => l._id !== deletedList._id)
                    );
                  }}
                />
              ))
            ) : (
              <p className="caption-light">No lists... go make some!</p>
            )}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};

export default ListGallery;
