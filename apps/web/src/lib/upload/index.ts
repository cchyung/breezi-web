export const uploadFileToSignedURL = async (signedURL: string, file: Blob) => {
  const response = await fetch(signedURL, {
    method: "PUT",
    body: file,
  });
  return response;
};

// TODO: Change this to use a proper CDN
const R2_DEV_URL = "https://pub-7c059b0bf70b4f4fbf45f6baf2331fcb.r2.dev";
export const getObjectURL = (key: string) => {
  return `${R2_DEV_URL}/${key}`;
};
