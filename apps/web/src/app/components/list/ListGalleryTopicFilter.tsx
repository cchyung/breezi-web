"use client";
import { Topic } from "@/lib/api";
import { Card } from "@/app/components/ui";
import { useState } from "react";

export default ({
  topics,
  onSelect,
}: {
  topics: Topic[];
  onSelect?: (topicId: string | null) => Promise<void>;
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="flex flex-row gap-2 mb-4 overflow-auto">
      <button
        className="shrink-0"
        onClick={() => {
          if (onSelect) {
            onSelect(null);
          }

          setSelectedTopic(null);
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
              if (onSelect) {
                onSelect(topic._id);
              }
              setSelectedTopic(topic._id);
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
