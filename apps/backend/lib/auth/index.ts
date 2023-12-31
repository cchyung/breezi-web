import { UserService } from "services/user";
import { User } from "models/user";
import { NextFunction, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { db } from "@/models";

export const createJWTAuthToken = (phone: string) => {
  const token = jwt.sign({ phone }, process.env.JWT_SECRET!);
  return token;
};

export const verifyJWTAuthToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export const decodeJWTAuthToken = (token: string) => {
  return jwt.decode(token) as { phone: string };
};

export const isOwner = ({
  user,
  _id,
}: {
  user?: User;
  _id: string | ObjectId;
}) => {
  return user?._id?.toString() === _id.toString();
};

interface AuthJWT extends jwt.Jwt {
  payload: jwt.Jwt["payload"] & {
    userId: string;
  };
}

/**
 *
 * @param authToken token from request header
 * @returns authenticated user if found or nullblak
 */
export const verifyAuthToken = async (
  authToken: string
): Promise<User | null> => {
  try {
    // @ts-ignore
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET, {
      complete: true,
    }) as AuthJWT;
    const userId = decodedToken.payload.userId;

    if (userId) {
      const authenticatedUser = await db.User.findById(userId);
      return authenticatedUser;
    }
    return null;
  } catch (error) {
    return null;
  }
};
