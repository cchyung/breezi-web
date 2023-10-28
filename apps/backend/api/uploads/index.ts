import express from "express";
import { SystemError } from "lib/errors";
import { S3Service, ASSETS_BUCKET, ASSETS_CLOUDFRONT_HOST } from "lib/aws";
import { logger } from "lib/logger";
import multer from "multer";
import { parseFileExtension } from "lib/utils/files";

const router = express.Router();
const noStorageUpload = multer();

router.post(
  "/upload-to-s3",
  noStorageUpload.single("upload"),
  async (req, res) => {
    if (!req.file) {
      res
        .status(500)
        .send({ message: "failure", reason: "file missing from form data" });
    }

    const { filename, buffer, originalname } = req.file;
    const ext = parseFileExtension(originalname);

    try {
      const uploadResponse = await S3Service.putObject(ASSETS_BUCKET, buffer, {
        prefix: req.body.prefix,
        key: req.body.key,
        ext,
      });
      const url = `${ASSETS_CLOUDFRONT_HOST}${uploadResponse.path}`;
      res.send({ message: "success!", defaultURL: url });
    } catch (error) {
      const sysError = new SystemError("Error uploading file to S3", {
        originalError: error,
        extra: {
          filename,
        },
      });
      logger.error(sysError);
      res.status(500).send({ error: sysError });
    }
  }
);

export default router;
