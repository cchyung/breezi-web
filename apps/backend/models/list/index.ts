import { Schema } from "mongoose";
import { User } from "../user";
import paginate from "mongoose-paginate-v2";

export enum ListState {
  draft = "draft",
  published = "published",
}

export enum ListType {
  numbered = "numbered",
  bulleted = "bulleted",
}
export interface List {
  _id: Schema.Types.ObjectId;
  author: string | User | null;
  title: string;
  description?: string;
  state: ListState;
  items: ListItem[];
  type: ListType;
  coverImageURL?: string;
}

export interface PopulatedList extends List {
  author: User | null;
}

export interface ListItem {
  _id: Schema.Types.ObjectId;
  text: string;
  parent?: string;
  imageURL?: string;
}

export const ListItemSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "ListItem",
    },
    imageURL: {
      type: String,
    },
  },
  { timestamps: {} }
);

export const ListSchema = new Schema(
  {
    author: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    coverImageURL: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: true,
      enum: Object.values(ListState),
      default: ListState.draft,
    },
    items: [
      {
        type: ListItemSchema,
      },
    ],
    type: {
      type: String,
      required: true,
      enum: Object.values(ListType),
      default: ListType.bulleted,
    },
  },
  { timestamps: {} }
);

ListSchema.plugin(paginate);
