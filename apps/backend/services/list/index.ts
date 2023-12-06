import { Database } from "@/models";
import { ListState, ListType, PopulatedList } from "@/models/list";
import { Schema } from "mongoose";

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
    pageSize = 10,
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
      { skip: cursor, limit: pageSize, sort: { createdAt: -1 } }
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
      { sort: { createdAt: -1 } }
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
      }
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
      }
    )
      .populate<PopulatedList>(populateList)
      .exec();

    return updatedList;
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
  };
};
