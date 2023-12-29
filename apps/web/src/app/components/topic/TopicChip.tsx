import { Topic } from "@/lib/api";
import { getTopicStyle } from "./utils";

export default ({ topic }: { topic: Topic }) => {
  return (
    <div className="px-4 py-1 rounded-full shrink-0" style={getTopicStyle(topic)}>
      {topic.title}
    </div>
  );
};
