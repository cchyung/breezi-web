import { Topic } from "@/lib/api";
import { getTopicStyle } from "./utils";

export default ({ topic }: { topic: Topic }) => {
  return (
    <div className="px-4 py-1 rounded-full" style={getTopicStyle(topic)}>
      {topic.title}
    </div>
  );
};
