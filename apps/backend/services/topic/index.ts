import { Database } from "@/models";
import { TopicState } from "@/models/topic";
import { ObjectId } from "mongoose";

export interface CreateTopicInput {
  title: string;
  description?: string | null;
  state?: TopicState | null;
  start?: Date | null;
  end?: Date | null;
}

export interface UpdateTopicInput {
  title?: string | null;
  description?: string | null;
  state?: TopicState | null;
  start?: Date | null;
  end?: Date | null;
}

export const TopicService = (db: Database) => {
  const getTopic = async (id: ObjectId | string) => {
    return db.Topic.findById(id);
  };

  const getTopics = async ({
    state = TopicState.LIVE,
  }: {
    state?: TopicState | null;
  }) => {
    return db.Topic.find({
      state,
    });
  };

  const createTopic = async (topicInput: CreateTopicInput) => {
    const topic = new db.Topic(topicInput);
    return await topic.save();
  };

  const updateTopic = async ({
    id,
    update,
  }: {
    id: ObjectId | string;
    update: UpdateTopicInput;
  }) => {
    const updatedTopic = await db.Topic.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: update },
      { new: true }
    );

    return updatedTopic;
  };

  return { getTopic, getTopics, createTopic, updateTopic };
};
