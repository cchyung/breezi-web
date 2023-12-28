import { db } from "@/models";
import { TopicState as TopicStateEnum } from "@/models/topic";
import { TopicService } from "@/services";
import {
  arg,
  enumType,
  extendType,
  idArg,
  inputObjectType,
  list,
  mutationField,
  nonNull,
  objectType,
  queryField,
} from "nexus";

const topicService = TopicService(db);

export const Topic = objectType({
  name: "Topic",
  definition(t) {
    t.nonNull.id("_id");
    t.string("title");
    t.string("description");
    t.field("state", { type: TopicState });
    t.datetime("start");
    t.datetime("end");
    t.datetime("createdAt");
    t.datetime("updatedAt");
    t.field("style", { type: TopicStyle });
  },
});

export const TopicStyle = objectType({
  name: "TopicStyle",
  definition(t) {
    t.string("color");
    t.string("backgroundImageURL");
    t.string("backgroundColor");
  },
});

export const TopicState = enumType({
  name: "TopicState",
  members: TopicStateEnum,
});

export const TopicInput = inputObjectType({
  name: "TopicInput",
  definition(t) {
    t.nonNull.string("title");
    t.string("description");
    t.field("state", { type: TopicState });
    t.datetime("start");
    t.datetime("end");
    t.field("style", { type: TopicStyleInput });
  },
});

export const TopicStyleInput = inputObjectType({
  name: "TopicStyleInput",
  definition(t) {
    t.string("color");
    t.string("backgroundImageURL");
    t.string("backgroundColor");
  },
});

export const GetTopic = queryField("topic", {
  type: Topic,
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, __) => {
    return await topicService.getTopic(id);
  },
});

export const GetTopics = queryField("topics", {
  type: list(Topic),
  args: {
    state: arg({ type: TopicState }),
  },
  resolve: async (_, { state }, __) => {
    return await topicService.getTopics({ state });
  },
});

export const CreateTopic = mutationField("createTopic", {
  type: Topic,
  args: {
    topic: nonNull(arg({ type: TopicInput })),
  },
  resolve: async (_, { topic }, __) => {
    return await topicService.createTopic(topic);
  },
});

export const UpdateTopic = mutationField("updateTopic", {
  type: Topic,
  args: {
    id: nonNull(idArg()),
    topic: nonNull(arg({ type: TopicInput })),
  },
  resolve: async (_, { id, topic }, __) => {
    return await topicService.updateTopic({ id, update: topic });
  },
});

export const ListWithTopic = extendType({
  type: "List",
  definition(t) {
    t.field("topic", {
      type: Topic,
      resolve: async (parent) => {
        if (parent.topic) {
          const topic = await topicService.getTopic(parent.topic);
          return topic;
        } else {
          return null;
        }
      },
    });
  },
});
