import { S3Service } from "@/lib/aws";
import { generateUUID } from "@/lib/utils/uuid";
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

      // generate a random name for the key
      const uuid = generateUUID();

      const userProfileImageKey = `user-profile-images/${ctx.user._id.toString()}/${uuid}`;
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

    const uuid = generateUUID()
    const listImageKey = `list-images/${ctx.user._id.toString()}/${uuid}`;

    const signedURL = await S3Service.getPutObjectURL(listImageKey);

    return {
      url: signedURL,
      key: listImageKey,
    };
  },
});
