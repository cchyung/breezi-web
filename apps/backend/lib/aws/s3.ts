import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";
import path from "path";
import { parseFileNameFromPathWithoutExtension } from "lib/utils/files";
import { ASSETS_CLOUDFRONT_HOST } from "./constants";

const client = new S3Client({ region: "us-east-1" });

export const S3Service = {
  async listTopObjects(bucket: string, prefix?: string) {
    const listObjectsCommand = new ListObjectsCommand({
      Bucket: bucket,
      Delimiter: "/",
      Prefix: prefix,
    });
    const listObjectsCommandResponse = await client.send(listObjectsCommand);
    return listObjectsCommandResponse;
  },

  async putObject(
    bucket: string,
    body: any,
    { prefix, key, ext }: { prefix?: string; key?: string; ext?: string } = {}
  ) {
    const partialPath = path.join(
      process.env.NODE_ENV || "local",
      prefix || "",
      key || crypto.randomUUID()
    );
    const fullPath = `${partialPath}${ext ? `.${ext}` : ""}`;
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: fullPath,
      Body: body,
    });
    const putObjectCommandResponse = await client.send(putObjectCommand);

    return {
      ...putObjectCommandResponse,
      bucket,
      fileName: parseFileNameFromPathWithoutExtension(fullPath),
      path: fullPath,
      url: `${ASSETS_CLOUDFRONT_HOST}${fullPath}`,
    };
  },
};
