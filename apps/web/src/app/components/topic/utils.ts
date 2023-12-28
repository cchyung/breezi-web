import { Topic } from "@/lib/api";
import { CSSProperties } from "react";

/** returns CSSProperties object based on topic styling */
export const getTopicStyle = (topic: Topic): CSSProperties => {
  return topic.style
    ? {
        ...(topic.style?.backgroundImageURL
          ? {
              backgroundImage: `url(${topic.style?.backgroundImageURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}),
        ...(topic.style?.backgroundColor
          ? {
              background: topic.style?.backgroundColor,
            }
          : {}),
        ...(topic.style?.color ? { color: topic.style?.color } : {}),
      }
    : {};
};
