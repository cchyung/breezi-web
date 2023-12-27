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
  comments: ListComment[];
  coverImageURL?: string;
  topic?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PopulatedList extends List {
  author: User | null;
  comments: PopulatedListComment[];
}

export interface ListComment {
  _id: Schema.Types.ObjectId;
  text: string;
  author: string | User | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PopulatedListComment extends ListComment {
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

export const ListCommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: {},
  }
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
    comments: [
      {
        type: ListCommentSchema,
      },
    ],
    type: {
      type: String,
      required: true,
      enum: Object.values(ListType),
      default: ListType.bulleted,
    },
    topic: {
      type: String,
    },
  },
  { timestamps: {} }
);

ListSchema.plugin(paginate);
