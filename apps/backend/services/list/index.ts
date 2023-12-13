import { Database } from "@/models";
import { ListState, ListType, PopulatedList } from "@/models/list";
import { Schema, ObjectId } from "mongoose";

export interface ListItemInput {
  text: string;
  parent?: string | null;
  imageURL?: string | null;
}

export interface CreateListInput {
  author: string;
  title: string;
  items: ListItemInput[];
  type?: ListType | null;
  state?: ListState | null;
  description?: string | null;
  coverImageURL?: string | null;
}

const populateList = [{ path: "author" }, { path: "comments.author" }];

export const ListService = (db: Database) => {
  const getList = async ({ id }: { id: string }) => {
    return await db.List.findById(id)
      .populate<PopulatedList>(populateList)
      .exec();
  };

  const getLists = async ({
    cursor = 0,
    pageSize = 20,
    state,
  }: {
    cursor?: number;
    pageSize?: number;
    state?: ListState;
  }) => {
    return await db.List.find(
      {
        ...(state && { state }),
      },
      {},
      { skip: cursor, limit: pageSize, sort: { updatedAt: -1 } }
    )
      .populate<PopulatedList>(populateList)
      .exec();
  };

  const getUserLists = async ({
    userId,
  }: {
    userId: string | Schema.Types.ObjectId;
  }) => {
    return await db.List.find(
      { author: userId },
      {},
      { sort: { updatedAt: -1, createdAt: -1 } }
    )
      .populate<PopulatedList>(populateList)
      .exec();
  };

  const createList = async ({
    author,
    title,
    items,
    state,
    description,
    type = ListType.bulleted,
    coverImageURL,
  }: CreateListInput): Promise<PopulatedList> => {
    const list = new db.List({
      author,
      title,
      items,
      state,
      description,
      type,
      coverImageURL,
    });
    return (await list.save()).populate<PopulatedList>(populateList);
  };

  const deleteList = async ({ id }: { id: string }) => {
    return await db.List.findByIdAndDelete(id).exec();
  };

  const updateList = async ({
    id,
    title,
    items,
    state,
    description,
    coverImageURL,
    type,
  }: {
    id: string;
    title?: string | null;
    items?: ListItemInput[];
    state?: ListState | null;
    description?: string | null;
    coverImageURL?: string | null;
    type?: ListType | null;
  }) => {
    const update: Partial<CreateListInput> = {};
    if (title) update.title = title;
    if (items) update.items = items; // TODO: Update items in list
    if (state) update.state = state;
    if (description) update.description = description;
    if (coverImageURL) update.coverImageURL = coverImageURL;
    if (type) update.type = type;
    return await db.List.findOneAndUpdate({ _id: id }, { $set: update })
      .populate<PopulatedList>(populateList)
      .exec();
  };

  const addListComment = async ({
    listId,
    text,
    author,
  }: {
    listId: string;
    text: string;
    author: string;
  }) => {
    const updatedList = await db.List.findOneAndUpdate(
      {
        _id: listId,
      },
      {
        $push: {
          comments: {
            text,
            author,
          },
        },
      },
      { timestamps: false }
    )
      .populate<PopulatedList>(populateList)
      .exec();

    return updatedList;
  };

  const removeListComment = async ({
    listId,
    commentId,
  }: {
    listId: string;
    commentId: string;
  }) => {
    const updatedList = await db.List.findOneAndUpdate(
      {
        _id: listId,
      },
      {
        $pull: {
          comments: {
            _id: commentId,
          },
        },
      },
      { timestamps: false }
    )
      .populate<PopulatedList>(populateList)
      .exec();

    return updatedList;
  };

  const getListFeed = async ({
    userId,
    cursor = 0,
    pageSize = 15,
  }: {
    userId: string | ObjectId;
    cursor: number;
    pageSize: number;
  }) => {
    const listFeed = await db.List.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      { $skip: cursor },
      {
        $limit: pageSize,
      },
      {
        $lookup: {
          from: "userfollowers",
          let: { authorId: "$author" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$user", "$$authorId"] },
                    {
                      $eq: [
                        { $toObjectId: "$follower" },
                        { $toObjectId: userId },
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "listlikes",
          let: { listId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$listId", { $toObjectId: "$list" }],
                },
              },
            },
          ],
          as: "likes",
        },
      },
      {
        $addFields: {
          followerScore: {
            $cond: {
              if: {
                $gt: [{ $size: "$followers" }, 0],
              },
              then: 3,
              else: 0,
            },
          },
          likesScore: {
            $cond: {
              if: { $gte: [{ $size: "$likes" }, 2] },
              then: 2,
              else: 0,
            },
          },
        },
      },
      {
        $addFields: {
          totalScore: { $add: ["$followerScore", "$likesScore"] },
        },
      },
      {
        $sort: {
          totalScore: -1,
          updatedAt: -1,
          createdAt: -1,
        },
      },
    ]).exec();

    if (listFeed.length === 0) {
      return [];
    }

    const populatedLists = await db.List.populate<PopulatedList>(
      listFeed,
      populateList
    );
    return populatedLists;
  };

  const getListLikeCountForUser = async ({
    userId,
  }: {
    userId: string | ObjectId;
  }) => {
    const listLikeQuery = await db.List.aggregate([
      {
        $match: {
          author: userId.toString(),
        },
      },
      {
        $lookup: {
          from: "listlikes",
          let: { listId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$listId", { $toObjectId: "$list" }],
                },
              },
            },
          ],
          as: "list_likes",
        },
      },
      {
        $group: {
          _id: null,
          totalListLikes: {
            $sum: {
              $cond: [{ $isArray: "$list_likes" }, { $size: "$list_likes" }, 0],
            },
          },
        },
      },
      { $project: { _id: 0, totalListLikes: 1 } },
    ]).exec();

    if (listLikeQuery?.length === 0) {
      return 0;
    } else {
      return listLikeQuery[0].totalListLikes as number;
    }
  };

  return {
    getList,
    getLists,
    getUserLists,
    createList,
    updateList,
    deleteList,
    addListComment,
    removeListComment,
    getListFeed,
    getListLikeCountForUser,
  };
};
