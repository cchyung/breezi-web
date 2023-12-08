import { User } from "@/lib/api";
import { writeToLocalStorage } from "../utils/localStorage";

export type UserData = Partial<User> & {
  authToken?: string;
};

export const writeUserToLocalStorage = (user: Partial<UserData>) => {
  writeToLocalStorage("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as UserData;
  }
};
