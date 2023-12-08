import { Schema } from "mongoose";

export interface User {
  _id: Schema.Types.ObjectId;
  phone: string;
  username: string;
  about?: string;
  email?: string;
  imageURL?: string;
  invitedBy?: string;
}

export const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    phone: {
      type: String,
    },
    about: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    invitedBy: {
      type: String,
    },
  },
  { timestamps: {} }
);
