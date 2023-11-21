import { Database } from "@/models";
import { List, ListItem, ListState, PopulatedList } from "@/models/list";
import { Schema } from "mongoose";

export interface ListItemInput {
  text: string;
  parent?: string | null;
  imageURL?: string | null;
}

export const ListService = (db: Database) => {
  const getList = async ({ id }: { id: string }) => {
    return await db.List.findById(id).populate<PopulatedList>("author").exec();
  };

  const getUserLists = async ({
    userId,
  }: {
    userId: string | Schema.Types.ObjectId;
  }) => {
    return await db.List.find({ author: userId }).exec();
  };

  const createList = async ({
    author,
    title,
    items,
    state,
    description,
    coverImageURL,
  }: {
    author: string | Schema.Types.ObjectId;
    title: string;
    items: ListItemInput[];
    state?: ListState | null;
    description?: string | null;
    coverImageURL?: string | null;
  }) => {
    const list = new db.List({
      author,
      title,
      items,
      state,
      description,
      coverImageURL,
    });
    return (await list.save()).populate<PopulatedList>("author");
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
  }: {
    id: string;
    title?: string;
    items?: ListItem[];
    state?: ListState;
    description?: string;
    coverImageURL?: string;
  }) => {
    const update: Partial<List> = {};
    if (title) update.title = title;
    if (items) update.items = items;
    if (state) update.state = state;
    if (description) update.description = description;
    if (coverImageURL) update.coverImageURL = coverImageURL;
    return await db.List.findByIdAndUpdate(id, update)
      .populate<PopulatedList>("author")
      .exec();
  };

  return {
    getList,
    getUserLists,
    createList,
    updateList,
    deleteList,
  };
};
