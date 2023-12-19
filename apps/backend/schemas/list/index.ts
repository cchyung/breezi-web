import {
  objectType,
  enumType,
  mutationField,
  queryField,
  nonNull,
  stringArg,
  list,
  inputObjectType,
  intArg,
  extendType,
  arg,
} from "nexus";
import {
  ListState as ListStateEnum,
  ListType as ListTypeEnum,
} from "models/list";
import { AuthenticationError, SystemError } from "@/lib/errors";
import { ListService } from "@/services";
import { db } from "@/models";
import { User } from "../user";
import { ListLikeService } from "@/services/list/like";

const listService = ListService(db);
const listLikeService = ListLikeService(db);

export const ListState = enumType({
  name: "ListState",
  members: ListStateEnum,
});

export const ListType = enumType({
  name: "ListType",
  members: ListTypeEnum,
});

export const List = objectType({
  name: "List",
  definition(t) {
    t.nonNull.string("_id");
    t.nonNull.string("title");
    t.field("state", { type: ListState });
    t.nonNull.field("type", { type: ListType });
    t.nonNull.list.field("items", { type: ListItem });
    t.list.nonNull.field("comments", { type: ListComment });
    t.string("description");
    t.string("coverImageURL");
    // @ts-ignore
    // TODO: Fix this
    t.nonNull.field("author", { type: User });
    t.datetime("createdAt");
    t.datetime("updatedAt");
  },
});

export const ListWithLikes = extendType({
  type: "List",
  definition(t) {
    t.nonNull.int("likeCount", {
      resolve: async (parent, _, ctx) => {
        return await listLikeService.getListLikeCount({
          listId: parent._id.toString(),
        });
      },
    });
    t.nonNull.field("likes", {
      type: list("ListLike"),
      resolve: async (parent, _, ctx) => {
        return await listLikeService.getListLikes({
          listId: parent._id.toString(),
        });
      },
    });
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

export const ListComment = objectType({
  name: "ListComment",
  definition(t) {
    t.nonNull.string("_id");
    t.nonNull.string("text");
    // @ts-ignore
    // TODO: Fix this
    t.nonNull.field("author", { type: User });
    t.datetime("createdAt");
    t.datetime("updatedAt");
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
    t.nonNull.field("type", { type: ListType });
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
      type: list.type,
    });
  },
});

export const UpdateList = mutationField("updateList", {
  type: List,
  args: {
    list: nonNull(ListInput),
    id: nonNull(stringArg()),
  },
  resolve: async (_, { list, id }, { user }) => {
    if (!user) throw new AuthenticationError("user is not logged in");
    const listToUpdate = await listService.getList({ id });

    if (!listToUpdate) throw new SystemError("list not found");
    if (listToUpdate.author!._id.toString() !== user._id.toString()) {
      throw new AuthenticationError("user is not authorized to update list");
    }

    return await listService.updateList({
      id,
      ...list,
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
      if (ctx.user?._id?.toString() !== list?.author?._id?.toString()) {
        throw new AuthenticationError("user is not logged in");
      }
    }

    return list;
  },
});

export const GetLists = queryField("lists", {
  type: list(List),
  args: {
    state: arg({ type: ListState }),
    cursor: intArg(),
    pageSize: intArg(),
  },
  resolve: async (_, { cursor, pageSize, state }, __) => {
    const lists = listService.getLists({
      state: state as ListStateEnum | undefined,
      cursor: cursor as number | undefined,
      pageSize: pageSize as number | undefined,
    });

    return lists;
  },
});

export const GetListFeed = queryField("listFeed", {
  type: list(List),
  args: {
    cursor: nonNull(intArg({ default: 0 })),
    pageSize: nonNull(intArg({ default: 20 })),
  },
  resolve: async (_, { cursor, pageSize }, ctx) => {
    if (!ctx.user) {
      return listService.getLists({
        state: ListStateEnum.published,
        cursor: cursor,
        pageSize: pageSize,
      });
    } else {
      return listService.getListFeed({
        userId: ctx.user._id,
        cursor: cursor,
        pageSize: pageSize,
      });
    }
  },
});

export const GetUserLists = queryField("userLists", {
  type: list(List),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: async (_, { userId }, ctx) => {
    if (ctx?.user?._id?.toString() === userId) {
      return await listService.getUserLists({ userId });
    } else {
      return await listService.getUserLists({
        userId: userId,
        state: ListStateEnum.published,
      });
    }
  },
});

export const DeleteList = mutationField("deleteList", {
  type: "Boolean",
  args: {
    id: nonNull(stringArg()),
  },
  resolve: async (_, { id }, { user }) => {
    if (!user) throw new AuthenticationError("user is not logged in");
    const list = await listService.getList({ id });

    if (!list) throw new SystemError("list not found");
    if (list.author!._id.toString() !== user._id.toString()) {
      throw new AuthenticationError("user is not authorized to delete list");
    }

    await listService.deleteList({ id });
    return true;
  },
});

export const AddCommentToList = mutationField("addCommentToList", {
  type: "List",
  args: {
    listId: nonNull(stringArg()),
    text: nonNull(stringArg()),
  },
  resolve: async (_, { listId, text }, { user }) => {
    if (!user) throw new AuthenticationError("user is not logged in");
    return await listService.addListComment({
      listId,
      text,
      author: user._id.toString(),
    });
  },
});

export const RemoveCommentFromList = mutationField("removeCommentFromList", {
  type: "List",
  args: {
    listId: nonNull(stringArg()),
    commentId: nonNull(stringArg()),
  },
  resolve: async (_, { listId, commentId }, { user }) => {
    if (!user) throw new AuthenticationError("user is not logged in");
    return await listService.removeListComment({
      listId,
      commentId,
    });
  },
});
