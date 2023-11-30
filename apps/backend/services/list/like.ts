import { Database } from "@/models";
import { objectType } from "nexus";

export const ListLike = objectType({
  name: "ListLike",
  definition(t) {
    t.string("_id");
    t.string("user");
    t.string("list");
  },
});

export const ListLikeService = (db: Database) => {
  const getListLikes = async ({ listId }: { listId: string }) => {
    return db.ListLike.find({ listId }).exec();
  };

  const getUserLikes = async ({ userId }: { userId: string }) => {
    return db.ListLike.find({ userId }).exec();
  };

  const getListLikeCount = async ({ listId }: { listId: string }) => {
    return db.ListLike.count({ listId }).exec();
  };

  const createListLike = async ({
    listId,
    userId,
  }: {
    listId: string;
    userId: string;
  }) => {
    const listLike = new db.ListLike({
      listId,
      userId,
    });
    return await listLike.save();
  };

  const deleteListLike = async ({
    listId,
    userId,
  }: {
    listId: string;
    userId: string;
  }) => {
    await db.ListLike.deleteOne({
      listId,
      userId,
    });
  };

  return {
    getListLikes,
    getUserLikes,
    getListLikeCount,
    createListLike,
    deleteListLike,
  };
};
