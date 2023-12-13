import {
  objectType,
  queryField,
  stringArg,
  inputObjectType,
  nonNull,
  mutationField,
  extendType,
} from "nexus";
import { db } from "models";
import { ListService, UserService } from "services";
import { AuthenticationError } from "lib/errors";
import {
  sendTwilioVerificationToken,
  verifyTwilioVerificationToken,
} from "lib/twilio";
import { AuthService } from "@/services/auth";

const userService = UserService(db);
const listService = ListService(db);
const authService = AuthService();

// ---------------------- Objects ----------------------

export const Ok = objectType({
  name: "Ok",
  definition(t) {
    t.boolean("ok");
    t.string("message");
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("_id");
    t.string("phone");
    t.string("username");
    t.string("about");
    t.string("email");
    t.string("imageURL");
    t.boolean("registered");
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
    t.int("likeCount", {
      resolve: async (parent, _, __) => {
        return await listService.getListLikeCountForUser({
          userId: parent._id.toString(),
        });
      },
    });
  },
});

export const UserInput = inputObjectType({
  name: "UserInput",
  definition(t) {
    t.string("_id");
    t.string("username");
    t.string("phone");
    t.boolean("registered");
  },
});

export const LoginObject = objectType({
  name: "LoginObject",
  definition(t) {
    t.string("authToken");
    t.field("user", { type: User });
  },
});

export const UserFollower = objectType({
  name: "UserFollower",
  definition(t) {
    t.string("_id");
    t.string("user");
    t.field("follower", {
      type: User,
    });
  },
});

export const UserWithFollowers = extendType({
  type: "User",
  definition(t) {
    t.list.field("followers", {
      type: "UserFollower",
      resolve: async (parent, _, __) => {
        return await userService.getUserFollowers({
          userId: parent._id.toString(),
        });
      },
    });
    t.int("followerCount", {
      resolve: async (parent, _, __) => {
        return await userService.getUserFollowerCount({
          userId: parent._id.toString(),
        });
      },
    });
  },
});

// ---------------------- Queries ----------------------

export const GetUser = queryField("user", {
  type: User,
  args: {
    authToken: stringArg(),
    id: stringArg(),
  },
  resolve: async (_, { authToken, id }, ctx) => {
    if (id) {
      return await userService.getUser({ id });
    } else if (authToken) {
      const user = await userService.getAuthenticatedUser(authToken);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } else if (ctx.user) {
      const userId = ctx.user._id.toString();
      const user = await userService.getUser({ id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } else {
      throw new Error("Must provide auth token or be logged in");
    }
  },
});

export const LoginUser = queryField("loginUser", {
  type: LoginObject,
  description:
    "Logs in the user based on the supplied number and verification code.  If the user doesn't exist, a new user will be created",
  args: {
    phone: nonNull(stringArg()),
    invitedBy: stringArg(),
    verificationCode: nonNull(stringArg()),
  },
  resolve: async (_, { phone, verificationCode, invitedBy }, __) => {
    let valid: boolean = false;
    ({ valid } = await verifyTwilioVerificationToken(phone, verificationCode));

    if (!valid) {
      throw new AuthenticationError("verification code was invalid", {
        extra: {
          phone,
        },
      });
    } else {
      const user = await userService.getOrCreateUser({
        phone,
        invitedBy,
      });
      const authToken = authService.generateAuthToken(user._id.toString());
      return {
        authToken,
        user,
      };
    }
  },
});

export const sendSMSVerificationToken = queryField("sendSMSVerificationToken", {
  type: Ok,
  args: {
    phone: nonNull(stringArg()),
  },
  resolve: async (_, { phone }, ___) => {
    const { status, to } = await sendTwilioVerificationToken(phone);
    return { ok: status === "pending", message: to };
  },
});

export const verifySMSVerificationToken = queryField(
  "verifySMSVerificationToken",
  {
    type: Ok,
    args: {
      phone: nonNull(stringArg()),
      code: nonNull(stringArg()),
    },
    resolve: async (_, { phone, code }, ___) => {
      const { valid, to } = await verifyTwilioVerificationToken(phone, code);
      return { ok: valid, message: to };
    },
  }
);

export const UpdateUserInput = inputObjectType({
  name: "UpdateUserInput",
  definition(t) {
    t.string("username");
    t.string("about");
    t.string("email");
    t.string("imageURL");
    t.boolean("registered");
  },
});

export const updateUser = mutationField("updateUser", {
  type: User,
  args: {
    id: nonNull(stringArg()),
    user: nonNull(UpdateUserInput),
  },
  resolve: async (_, { id, user }, ctx) => {
    if (!ctx.user) {
      throw new Error("Must be logged in to update user");
    }

    if (ctx.user._id.toString() !== id) {
      throw new Error("Must be logged in as the user you are trying to update");
    }

    // @ts-ignore
    const updatedUser = await userService.updateUser({ id: id, ...user });
    return updatedUser;
  },
});

export const followUser = mutationField("followUser", {
  type: User,
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: async (_, { userId }, ctx) => {
    if (!ctx.user) {
      throw new Error("Must be logged in to follow user");
    }

    // get user to follow and ensure exists
    const userToFollow = await userService.getUser({ id: userId });
    if (!userToFollow) {
      throw new Error("User to follow does not exist");
    }

    await userService.createUserFollower({
      userId,
      followerId: ctx.user._id.toString(),
    });
    return userToFollow;
  },
});

export const unfollowUser = mutationField("unfollowUser", {
  type: User,
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: async (_, { userId }, ctx) => {
    if (!ctx.user) {
      throw new Error("Must be logged in to unfollow user");
    }

    // get user to follow and ensure exists
    const userToUnfollow = await userService.getUser({ id: userId });
    if (!userToUnfollow) {
      throw new Error("User to unfollow does not exist");
    }

    await userService.deleteUserFollower({
      userId,
      followerId: ctx.user._id.toString(),
    });
    return userToUnfollow;
  },
});
