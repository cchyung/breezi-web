"use client";
import { Topic } from "@/lib/api";
import { getTopicStyle } from "./utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default ({
  topic,
  clickable = false,
}: {
  topic: Topic;
  clickable?: boolean;
}) => {
  const router = useRouter();
  const search = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(search);
      params.set(name, value);

      return params.toString();
    },
    [search]
  );

  return (
    <>
      {clickable ? (
        <button
          className="px-3 py-1 rounded-full whitespace-nowrap truncate caption md:body font-bold font-uxum-grotesque shadow-md"
          style={getTopicStyle(topic)}
          onClick={() => {
            const selectedTopic = search.get("topic");

            if (selectedTopic !== topic._id) {
              router.push(
                pathname + "?" + createQueryString("topic", topic._id)
              );
            }
          }}
        >
          {topic.title}
        </button>
      ) : (
        <div
          className="px-3 py-1 rounded-full whitespace-nowrap truncate caption md:body font-bold font-uxum-grotesque shadow-md"
          style={getTopicStyle(topic)}
        >
          {topic.title}
        </div>
      )}
    </>
  );
};
