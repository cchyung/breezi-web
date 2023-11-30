import {
  objectType,
  enumType,
  mutationField,
  queryField,
  arg,
  nonNull,
  stringArg,
  list,
  inputObjectType,
  intArg,
} from "nexus";
import { ListState as ListStateEnum } from "models/list";
import { AuthenticationError, SystemError } from "@/lib/errors";
import { ListService } from "@/services";
import { db } from "@/models";
import { User } from "../user";

const listService = ListService(db);

export const ListState = enumType({
  name: "ListState",
  members: ListStateEnum,
});

export const List = objectType({
  name: "List",
  definition(t) {
    t.nonNull.string("_id");
    t.nonNull.string("title");
    t.field("state", { type: ListState });
    t.nonNull.list.field("items", { type: ListItem });
    t.string("description");
    t.string("coverImageURL");
    // @ts-ignore
    // TODO: Fix this
    t.nonNull.field("author", { type: User });
    t.date("createdAt");
    t.date("updatedAt");
  },
});

export const ListItem = objectType({
  name: "ListItem",
  definition(t) {
    t.nonNull.string("_id");
    t.nonNull.string("text");
    t.string("parent");
    t.string("imageURL");
  },
});

export const ListInput = inputObjectType({
  name: "ListInput",
  definition(t) {
    t.nonNull.string("title");
    t.field("state", { type: ListState });
    t.nonNull.list.field("items", { type: nonNull(ListItemInput) });
    t.string("description");
    t.string("coverImageURL");
  },
});

export const ListItemInput = inputObjectType({
  name: "ListItemInput",
  definition(t) {
    t.nonNull.string("text");
    t.string("parent");
    t.string("imageURL");
  },
});

export const CreateList = mutationField("createList", {
  type: List,
  args: {
    list: nonNull(ListInput),
  },
  resolve: async (_, { list }, { user }) => {
    if (!user) throw new AuthenticationError("user is not logged in");
    return await listService.createList({
      title: list.title,
      items: list.items,
      author: user._id.toString(),
      state: list.state,
      coverImageURL: list.coverImageURL,
      description: list.description ? list.description : undefined,
    });
  },
});

export const GetList = queryField("list", {
  type: List,
  args: {
    id: nonNull(stringArg()),
  },
  resolve: async (_, { id }, ctx) => {
    const list = await listService.getList({ id });
    if (!list) {
      throw new SystemError("list not found");
    }

    // if list is in draft, make sure it's only being requested by the author
    if (list.state === ListStateEnum.draft) {
      if (ctx.user?._id !== list?.author?._id) {
        throw new AuthenticationError("user is not logged in");
      }
    }

    return list;
  },
});

export const GetLists = queryField("lists", {
  type: list(List),
  args: {
    cursor: intArg(),
    pageSize: intArg(),
  },
  resolve: async (_, { cursor, pageSize }, __) => {
    const lists = listService.getLists({
      cursor: cursor as number | undefined,
      pageSize: pageSize as number | undefined,
    });

    return lists;
  },
});

export const GetUserLists = queryField("userLists", {
  type: list(List),
  args: {
    userId: stringArg(),
  },
  resolve: async (_, { userId }, ctx) => {
    if (userId) {
      const lists = await listService.getUserLists({ userId });
      return lists;
    } else {
      const lists = await listService.getUserLists({ userId: ctx.user._id });
      return lists;
    }
  },
});
