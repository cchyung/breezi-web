import { Schema } from "mongoose";

export interface ListLike {
  _id: Schema.Types.ObjectId;
  user: string;
  list: string;
}

export const ListLikeSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  list: {
    type: String,
    required: true,
  },
});

ListLikeSchema.index({ user: 1, list: 1 }, { unique: true });
