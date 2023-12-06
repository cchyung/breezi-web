import { S3Service } from "@/lib/aws";
import { objectType, queryField, nonNull, stringArg } from "nexus";

export const SignedURL = objectType({
  name: "SignedURL",
  definition(t) {
    t.nonNull.string("url");
    t.nonNull.string("key");
  },
});

export const uploadUserProfileImageURL = queryField(
  "uploadUserProfileImageURL",
  {
    type: SignedURL,
    resolve: async (_, __, ctx) => {
      if (!ctx.user) {
        throw new Error("must be signed in to use this function");
      }

      const userProfileImageKey = `user-profile-images/${ctx.user._id.toString()}`;

      const signedURL = await S3Service.getPutObjectURL(userProfileImageKey);

      return {
        url: signedURL,
        key: userProfileImageKey,
      };
    },
  }
);

export const uploadListCoverURL = queryField("uploadListCoverURL", {
  type: SignedURL,
  resolve: async (_, __, ctx) => {
    if (!ctx.user) {
      throw new Error("must be signed in to use this function");
    }

    const randomHash = Math.random().toString(36).substring(7);
    const listImageKey = `list-images/${ctx.user._id.toString()}/${randomHash}`;

    const signedURL = await S3Service.getPutObjectURL(listImageKey);

    return {
      url: signedURL,
      key: listImageKey,
    };
  },
});
