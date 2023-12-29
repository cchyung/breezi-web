"use client";
import { useQuery } from "@apollo/client";
import { CreateListButton, ListGallery } from "@/app/components/list";
import {
  GetListFeedQuery,
  GetListFeedQueryVariables,
  GetTopicsQuery,
  GetTopicsQueryVariables,
  List,
  Topic,
} from "@/lib/api";
import { GET_LIST_FEED } from "@/lib/api/list/queries";
import { Spinner } from "@/app/components/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { GET_TOPICS } from "@/lib/api/topic/queries";
import { TopicCard } from "@/app/components/topic";

export default function Home() {
  const { loading, data, refetch, fetchMore } = useQuery<
    GetListFeedQuery,
    GetListFeedQueryVariables
  >(GET_LIST_FEED, {
    variables: {
      cursor: 0,
      pageSize: 10,
    },
    nextFetchPolicy: "network-only",
  });

  const { data: topicData } = useQuery<GetTopicsQuery, GetTopicsQueryVariables>(
    GET_TOPICS
  );

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // track scroll and determine if user has scrolled past bottom spinner to fetch more
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [prevScrollDirection, setPrevScrollDirection] = useState("down");

  const listContainerRef = useRef<HTMLDivElement>(null);

  const onTopicSelect = useCallback(
    async (topic: string | null) => {
      try {
        refetch({
          topic,
        });
        setSelectedTopic(topic);
      } catch (error) {
        console.error(error);
      }
    },
    [selectedTopic, refetch]
  );

  const handleScroll = useCallback(() => {
    const position = window.scrollY + window.innerHeight;

    if (position > prevScrollPosition) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    setPrevScrollPosition(position);
    setPrevScrollDirection(scrollDirection);

    if (
      scrollDirection === "down" &&
      position >= document.body.scrollHeight - 10
    ) {
      if (loadingMore) {
        return;
      }
      setLoadingMore(true);
      fetchMore({
        variables: {
          cursor: data!.listFeed!.length,
          pageSize: 4,
        },
      })
        .then((res) => {
          setLoadingMore(false);
          if (res.data.listFeed?.length === 0) {
            setHasMore(false);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoadingMore(false);
        });
    }
  }, [loadingMore, scrollDirection, data, hasMore, prevScrollDirection]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div
        className="flex flex-col gap-4 max-w-6xl mx-auto p-3"
        ref={listContainerRef}
      >
        {topicData?.topics && (
          <div className="flex flex-col gap-4">
            {topicData.topics.map((topic) => {
              return (
                <TopicCard
                  topic={topic as Topic}
                  refetchLists={refetch}
                  key={topic!._id}
                />
              );
            })}
          </div>
        )}

        {loading ? (
          <></>
        ) : (
          <ListGallery
            initialLists={data?.listFeed as List[]}
            topics={topicData?.topics as Topic[]}
            selectedTopic={selectedTopic}
            setSelectedTopic={onTopicSelect}
          />
        )}

        <>
          <div className="w-full flex justify-center mt-6 h-12">
            {loadingMore && <Spinner />}
          </div>
        </>
      </div>
      <CreateListButton onCreation={refetch} />
    </>
  );
}
