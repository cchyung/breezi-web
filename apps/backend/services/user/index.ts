import { FilterQuery, Schema, Types } from "mongoose";
import { Database } from "models";
import { AuthService } from "../auth";
import { User } from "@/models/user";

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
   * Get a user by id or address
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
  }: {
    phone: string;
    username?: string;
    about?: string;
    email?: string;
    imageURL?: string;
  }) {
    const user = new db.User({
      username,
      about,
      email,
      phone,
      imageURL,
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
  }: {
    phone: string;
  }) {
    const existingUser = await getUser({ phone });
    if (existingUser) {
      return existingUser;
    }

    return await createUser({ phone });
  }

  /**
   * Updates and returns the updated user
   * @param options
   * @returns
   */
  async function updateUser({
    id,
    address,
    conversationToken,
    username,
    about,
    email,
    phone,
    imageURL,
    receiveNotifications,
    registered,
    isBrowserStreamer,
  }: {
    id?: string | Schema.Types.ObjectId;
    address?: string;
    username?: string;
    about?: string;
    email?: string;
    phone?: string;
    receiveNotifications?: boolean;
    imageURL?: string;
    registered?: boolean;
    conversationToken?: string;
    isBrowserStreamer?: boolean;
  }) {
    if (!id && !address) {
      throw new Error("Must provide either id or address");
    }
    // Address is immutable
    const properties = {
      $set: {
        address,
        username,
        about,
        email,
        phone,
        receiveNotifications,
        imageURL,
        registered,
        conversationToken,
        isBrowserStreamer,
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

  return {
    getUser,
    getUsers,
    createUser,
    getOrCreateUser,
    updateUser,
    deleteUser,
    getAuthenticatedUser,
  };
};
