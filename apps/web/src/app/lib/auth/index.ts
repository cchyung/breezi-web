import { writeToLocalStorage } from "../utils/localStorage";

export interface UserData {
  _id: string;
  phone: string;
  username?: string;
  imageURL?: string;
  authToken: string;
}

export const writeUserToLocalStorage = (user: Partial<UserData>) => {
  writeToLocalStorage("user", JSON.stringify(user));
  writeToLocalStorage("token", user.authToken);
};

export const getUserFromLocalStorage = () => {
  if (localStorage) {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user) as Partial<UserData>;
    }
  }

  return null;
};

export const getTokenFromLocalStorage = () => {
  if (localStorage) {
    return localStorage.getItem("token");
  }

  return null;
}