import { Database } from "@/models";

export const ListLikeService = (db: Database) => {
  const getListLikes = async ({ listId }: { listId: string }) => {
    return db.ListLike.find({ list: listId }).exec();
  };

  const getUserLikes = async ({ userId }: { userId: string }) => {
    return db.ListLike.find({ user: userId }).exec();
  };

  const getListLikeCount = async ({ listId }: { listId: string }) => {
    return db.ListLike.count({ list: listId }).exec();
  };

  const createListLike = async ({
    listId,
    userId,
  }: {
    listId: string;
    userId: string;
  }) => {
    const listLike = new db.ListLike({
      list: listId,
      user: userId,
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
    return db.ListLike.deleteOne({
      list: listId,
      user: userId,
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
