import { Database } from "@/models";
import {
  List,
  ListItem,
  ListState,
  ListType,
  PopulatedList,
} from "@/models/list";
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

export const ListService = (db: Database) => {
  const getList = async ({ id }: { id: string }) => {
    return await db.List.findById(id)
      .populate<PopulatedList>({ path: "author" })
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
      .populate<PopulatedList>({ path: "author" })
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
      .populate<PopulatedList>({ path: "author" })
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
    return (await list.save()).populate<PopulatedList>({ path: "author" });
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
    title?: string;
    items?: ListItem[];
    state?: ListState;
    description?: string;
    coverImageURL?: string;
    type?: ListType;
  }) => {
    const update: Partial<List> = {};
    if (title) update.title = title;
    if (items) update.items = items;
    if (state) update.state = state;
    if (description) update.description = description;
    if (coverImageURL) update.coverImageURL = coverImageURL;
    if (type) update.type = type;
    return await db.List.findByIdAndUpdate(id, update)
      .populate<PopulatedList>({ path: "author" })
      .exec();
  };

  return {
    getList,
    getLists,
    getUserLists,
    createList,
    updateList,
    deleteList,
  };
};
