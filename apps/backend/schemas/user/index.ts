import {
  objectType,
  queryField,
  stringArg,
  inputObjectType,
  nonNull,
} from "nexus";
import { db } from "models";
import { UserService } from "services";
import { AuthenticationError } from "lib/errors";
import {
  sendTwilioVerificationToken,
  verifyTwilioVerificationToken,
} from "lib/twilio";
import { AuthService } from "@/services/auth";

const userService = UserService(db);
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
    t.nonNull.string("phone");
    t.nonNull.string("username");
    t.string("about");
    t.string("email");
    t.string("imageURL");
    t.field("createdAt", { type: "DateTime" });
  },
});

export const UserInput = inputObjectType({
  name: "UserInput",
  definition(t) {
    t.string("_id");
    t.string("username");
    t.string("phone");
  },
});

export const LoginObject = objectType({
  name: "LoginObject",
  definition(t) {
    t.string("authToken");
    t.field("user", { type: User });
  },
});

// ---------------------- Queries ----------------------

export const GetUser = queryField("user", {
  type: User,
  args: {
    authToken: stringArg(),
  },
  resolve: async (_, { authToken }, ctx) => {
    if (authToken) {
      return userService.getAuthenticatedUser(authToken);
    } else if (ctx.user) {
      const userId = ctx.user._id.toString();
      return userService.getUser({ id: userId });
    }
  },
});

export const LoginUser = queryField("loginUser", {
  type: LoginObject,
  description:
    "Logs in the user based on the supplied number and verification code.  If the user doesn't exist, a new user will be created",
  args: {
    phone: nonNull(stringArg()),
    verificationCode: nonNull(stringArg()),
    referralCode: stringArg(),
  },
  resolve: async (_, { phone, verificationCode }, __) => {
    let valid: boolean = false;
    ({ valid } = await verifyTwilioVerificationToken(phone, verificationCode));

    if (!valid) {
      throw new AuthenticationError("verification code was invalid", {
        extra: {
          phone,
        },
      });
    } else {
      const user = await userService.getOrCreateUser({ phone });
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
