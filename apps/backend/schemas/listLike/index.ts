import { db } from "@/models";
import { ListService } from "@/services";
import { ListLikeService } from "@/services/list/like";
import {
  list,
  mutationField,
  nonNull,
  objectType,
  queryField,
  stringArg,
} from "nexus";

const listLikeService = ListLikeService(db);

export const ListLike = objectType({
  name: "ListLike",
  definition(t) {
    t.string("_id");
    t.string("user");
    t.string("list");
  },
});

export const GetListLikeCount = queryField("listLikeCount", {
  type: "Int",
  args: {
    listId: nonNull(stringArg()),
  },
  resolve: async (_, { listId }, __) => {
    return listLikeService.getListLikeCount({ listId });
  },
});

export const GetListLikes = queryField("listLikes", {
  type: list(ListLike),
  args: {
    listId: nonNull(stringArg()),
  },
  resolve: async (_, { listId }, __) => {
    return listLikeService.getListLikes({ listId });
  },
});

export const LikeList = mutationField("likeList", {
  type: ListLike,
  args: {
    listId: nonNull(stringArg()),
  },
  resolve: async (_, { listId }, ctx) => {
    if (!ctx.user) {
      throw new Error("user must be signed in to like this list");
    } else {
      return listLikeService.createListLike({
        listId,
        userId: ctx.user._id.toString(),
      });
    }
  },
});

export const UnlikeList = mutationField("unlikeList", {
  type: "Boolean",
  args: {
    listId: nonNull(stringArg()),
  },
  resolve: async (_, { listId }, ctx) => {
    if (!ctx.user) {
      throw new Error("user must be signed in to like this list");
    } else {
      const result = await listLikeService.deleteListLike({
        listId,
        userId: ctx.user._id.toString(),
      });

      return result?.deletedCount === 1;
    }
  },
});

export const GetUserLikes = queryField("userLikes", {
  type: list(ListLike),
  args: {
    userId: stringArg(),
  },
  resolve: async (_, { userId }, ctx) => {
    if (userId) {
      return listLikeService.getUserLikes({ userId });
    } else if (ctx?.user._id) {
      return listLikeService.getUserLikes({ userId: ctx.user._id.toString() });
    } else {
      throw new Error(
        "user must be logged in or provide a user id to get user likes"
      );
    }
  },
});
