import { FilterQuery, Schema, Types } from "mongoose";
import { Database } from "models";
import { AuthService } from "../auth";
import { User } from "@/models/user";
import { PopulatedUserFollower } from "@/models/userFollower";

const identityFilter = ({
  id,
  phone,
}: {
  id?: string | Types.ObjectId;
  phone?: string;
}) => ({
  $or: [...(id ? [{ _id: id }] : []), ...(phone ? [{ phone }] : [])],
});

const authService = AuthService();

export const UserService = (db: Database) => {
  /**
   * Get a user by id
   * @param options
   * @returns
   */
  async function getUser({
    id,
    phone,
  }: {
    id?: string | Types.ObjectId;
    phone?: string;
  }) {
    if (!id && !phone) {
      throw new Error("Must provide either id, address, or phone number");
    }
    const filter = identityFilter({
      id: id?.toString(),
      phone,
    });
    const query = db.User.findOne(filter);
    return await query.exec();
  }

  /**
   * Gets all existing users
   */
  async function getUsers({
    ids,
    addresses,
  }: { ids?: string[]; addresses?: string[] } = {}) {
    const filter: FilterQuery<User> = {};
    if (ids || addresses) {
      filter["$or"] = [{ _id: { $in: ids } }, { address: { $in: addresses } }];
    }
    return await db.User.find(filter).exec();
  }

  /**
   * Creates and returns a new user
   * @param options
   * @returns
   */
  async function createUser({
    username,
    about,
    email,
    phone,
    imageURL,
    invitedBy,
    registered = true,
  }: {
    phone: string;
    username?: string;
    about?: string;
    email?: string;
    imageURL?: string;
    invitedBy?: string | null;
    registered?: boolean;
  }) {
    const user = new db.User({
      username,
      about,
      email,
      phone,
      imageURL,
      invitedBy,
      registered,
    });

    return user.save();
  }

  /**
   * Fetches a user by address or creates a new one if a user with that address does not exist
   * @param options
   * @returns User object
   */
  async function getOrCreateUser({
    phone,
    invitedBy,
  }: {
    phone: string;
    invitedBy?: string | null;
  }) {
    const existingUser = await getUser({ phone });
    if (existingUser) {
      return existingUser;
    }

    return await createUser({ phone, invitedBy });
  }

  /**
   * Updates and returns the updated user
   * @param options
   * @returns
   */
  async function updateUser({
    id,
    username,
    about,
    email,
    imageURL,
    registered,
  }: {
    id: string | Schema.Types.ObjectId;
    username?: string;
    about?: string;
    email?: string;
    imageURL?: string;
    registered?: boolean;
  }) {
    if (!id) {
      throw new Error("Must provide uesr id");
    }
    // Address is immutable
    const properties = {
      $set: {
        username,
        about,
        email,
        imageURL,
        registered,
      },
    };
    const options = { new: true };
    const query = db.User.findOneAndUpdate({ _id: id }, properties, options);
    return await query.exec();
  }

  /**
   * Delete a user
   * @param id
   * @returns
   */
  async function deleteUser({ id }: { id?: string | Types.ObjectId }) {
    if (!id) {
      throw new Error("Must provide either id or address");
    }
    const filter = identityFilter({ id });
    const query = db.User.findOneAndDelete(filter);
    return await query.exec();
  }

  /**
   *
   * @param authToken token from request header
   * @returns authenticated user if found or nullblak
   */
  async function getAuthenticatedUser(authToken: string) {
    try {
      const userId = authService.decodeAuthToken(authToken);

      if (userId) {
        const authenticatedUser = await db.User.findById(userId);
        return authenticatedUser;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async function createUserFollower({
    userId,
    followerId,
  }: {
    userId: string;
    followerId: string;
  }) {
    const userFollower = new db.UserFollower({
      user: userId,
      follower: followerId,
    });

    return userFollower.save();
  }

  async function deleteUserFollower({
    userId,
    followerId,
  }: {
    userId: string;
    followerId: string;
  }) {
    return db.UserFollower.findOneAndDelete({
      user: userId,
      follower: followerId,
    });
  }

  async function getUserFollowers({ userId }: { userId: string }) {
    return db.UserFollower.find({ user: userId })
      .populate<PopulatedUserFollower>({ path: "follower" })
      .exec();
  }

  async function getUserFollowerCount({ userId }: { userId: string }) {
    return db.UserFollower.countDocuments({ user: userId }).exec();
  }

  return {
    getUser,
    getUsers,
    createUser,
    getOrCreateUser,
    updateUser,
    deleteUser,
    getAuthenticatedUser,
    createUserFollower,
    deleteUserFollower,
    getUserFollowers,
    getUserFollowerCount,
  };
};
