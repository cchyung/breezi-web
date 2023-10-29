import { model, Model } from "mongoose";

import { User, UserSchema } from "models/user";
import { List, ListSchema } from "models/list";

export interface Database {
  User: Model<User>;
  List: Model<List>;
}

export const db: Database = {
  User: model<User>("User", UserSchema),
  List: model<List>("List", ListSchema),
};
