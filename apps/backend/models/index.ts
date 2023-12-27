import { model, Model } from "mongoose";
import { User, UserSchema } from "models/user";
import { List, ListSchema } from "models/list";
import { ListLike, ListLikeSchema } from "./listLike";
import { UserFollower, UserFollowerSchema } from "./userFollower";
import { Topic, TopicSchema } from "./topic";

export interface Database {
  User: Model<User>;
  List: Model<List>;
  ListLike: Model<ListLike>;
  UserFollower: Model<UserFollower>;
  Topic: Model<Topic>;
}

export const db: Database = {
  User: model<User>("User", UserSchema),
  List: model<List>("List", ListSchema),
  ListLike: model<ListLike>("ListLike", ListLikeSchema),
  UserFollower: model<UserFollower>("UserFollower", UserFollowerSchema),
  Topic: model<Topic>("Topic", TopicSchema),
};
