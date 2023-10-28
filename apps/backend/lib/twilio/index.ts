import Twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const getTwilioClient = () => {
  const client = Twilio(accountSid, authToken);
  return client;
};

export const sendTextVerification = async (phoneNumber: string) => {
  const client = getTwilioClient();
  await client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
    .verifications.create({ to: phoneNumber, channel: "sms" });
};

export const verifyCode = async (phoneNumber: string, code: string) => {
  const client = getTwilioClient();
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verificationChecks.create({ to: phoneNumber, code: code });
    return verification.valid;
  } catch (error) {
    return false;
  }
};

export const sendTwilioVerificationToken = async (phone: string) => {
  if (process.env.NODE_ENV === "development") {
    return {
      status: "pending",
      to: phone,
    };
  }
  const client = getTwilioClient();
  const verificationInstance = await client.verify.v2
    .services(process.env.TWILIO_AUTH_SID!)
    .verifications.create({ to: phone, channel: "sms" });
  return verificationInstance;
};

export const verifyTwilioVerificationToken = async (
  phone: string,
  code: string
) => {
  if (process.env.NODE_ENV === "development") {
    return {
      valid: true,
      to: phone,
    };
  }
  const client = getTwilioClient();
  const verificationInstance = await client.verify.v2
    .services(process.env.TWILIO_AUTH_SID!)
    .verificationChecks.create({ to: phone, code });
  return verificationInstance;
};
