import { User } from "models/user";
import { Schema } from "mongoose";

export interface UserFollower {
  _id: Schema.Types.ObjectId;
  user: string;
  follower: string | User | null;
}

export interface PopulatedUserFollower extends UserFollower {
  follower: User | null;
}

export const UserFollowerSchema = new Schema(
  {
    user: {
      type: String,
    },
    follower: {
      type: String,
      ref: "User",
    },
  },
  { timestamps: {} }
);

UserFollowerSchema.index({ user: 1, follower: 1 }, { unique: true });
