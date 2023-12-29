import { Topic } from "@/lib/api";
import { getTopicStyle } from "./utils";

export default ({ topic }: { topic: Topic }) => {
  return (
    <div
      className="px-3 py-1 rounded-full whitespace-nowrap truncate caption md:body font-bold font-uxum-grotesque"
      style={getTopicStyle(topic)}
    >
      {topic.title}
    </div>
  );
};
