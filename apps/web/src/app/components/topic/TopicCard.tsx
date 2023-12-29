"use client";

import { Button, Card } from "@/app/components/ui";
import { Topic } from "@/lib/api";
import { useContext } from "react";
import { CreateListModalContext } from "../list/create/CreateListModalProvider";
import { UserContext } from "../user";
import { useRouter } from "next/navigation";
import { getTopicStyle } from "./utils";

export default ({
  topic,
  refetchLists,
}: {
  topic: Topic;
  refetchLists: () => void;
}) => {
  const { openModal } = useContext(CreateListModalContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <Card
      className="bg-blue-700 text-white"
      overrideBgStyle={true}
      style={getTopicStyle(topic)}
    >
      <div className="flex flex-col items-center gap-1">
        <h1>{topic.title}</h1>
        {topic.description && <p>{topic.description}</p>}
        <div className="w-full mt-3">
          <Button
            color={"white"}
            className="w-full"
            onClick={() => {
              if (!user) {
                router.push("/login");
                return;
              }

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
