import { model, Model } from "mongoose";

import { User, UserSchema } from "models/user";

export interface Database {
  User: Model<User>;
}

export const db: Database = {
  User: model<User>("User", UserSchema),
};
