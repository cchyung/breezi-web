import { S3 } from "aws-sdk";

const R2_BUCKET_NAME = "breezi";

const s3 = new S3({
  endpoint: `https://${process.env.CLOUDFRONT_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: process.env.CLOUDFRONT_ACCESS_KEY_ID,
  secretAccessKey: process.env.CLOUDFRONT_SECRET,
  signatureVersion: "v4",
});

export const S3Service = {
  async getPutObjectURL(key: string) {
    const signedURL = await s3.getSignedUrlPromise("putObject", {
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    return signedURL;
  },
};
