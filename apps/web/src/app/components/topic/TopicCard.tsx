import { Button, Card } from "@/app/components/ui";
import { Topic } from "@/lib/api";
import { useContext } from "react";
import { CreateListModalContext } from "../list/create/CreateListModalProvider";

export default ({
  topic,
  refetchLists,
}: {
  topic: Topic;
  refetchLists: () => void;
}) => {
  const { openModal } = useContext(CreateListModalContext);

  return (
    <Card className="bg-blue-700 text-white" overrideBgStyle={true}>
      <div className="flex flex-col items-center gap-1">
        <h1>{topic.title}</h1>
        {topic.description && <p>{topic.description}</p>}
        <div className="w-full mt-3">
          <Button
            color={"white"}
            className="w-full"
            onClick={() => {
              openModal({
                create: true,
                topic: topic,
                onCreation: refetchLists,
              });
            }}
          >
            Add to Hot Topic
          </Button>
        </div>
      </div>
    </Card>
  );
};
