"use client";
import { Topic } from "@/lib/api";
import { Card } from "@/app/components/ui";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Amplitude, AmplitudeEventType } from "@/app/lib/analytics";

export default ({
  topics,
  onSelect,
}: {
  topics: Topic[];
  onSelect?: (topicId: string | null) => Promise<void>;
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const router = useRouter();
  const search = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const topicId = search.get("topic");

    setSelectedTopic(topicId);

    if (onSelect) {
      onSelect(topicId);
    }
  }, [search]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(search);
      params.set(name, value);

      return params.toString();
    },
    [search]
  );

  return (
    <div className="flex flex-row gap-2 mb-4 overflow-auto">
      <button
        className="shrink-0"
        onClick={() => {
          router.push(pathname);
        }}
      >
        <Card
          className={`py-2 px-8 ${
            selectedTopic === null ? "border-gradient" : "border-4 border-white"
          } transition-colors`}
        >
          <span className="font-uxum-grotesque">All</span>
        </Card>
      </button>
      {topics.map((topic) => (
        <button
          className="shrink-0"
          onClick={() => {
            // avoid retriggering if user clicks on the same topic
            if (topic._id !== selectedTopic) {
              // if (onSelect) {
              //   onSelect(topic._id);
              // }
              // setSelectedTopic(topic._id);
              Amplitude.trackEvent(AmplitudeEventType.HOT_TOPIC_VIEW, {
                topicId: topic._id,
              });

              router.push(
                pathname + "?" + createQueryString("topic", topic._id)
              );
            }
          }}
          key={topic._id}
        >
          <Card
            className={`py-2 px-8 ${
              selectedTopic === topic._id
                ? "border-gradient"
                : "border-4 border-white"
            } transition-colors`}
          >
            <span className="font-uxum-grotesque">{topic.title}</span>
          </Card>
        </button>
      ))}
    </div>
  );
};
