import { writeToLocalStorage } from "../utils/localStorage";

export interface UserData {
  phone: string;
  username?: string;
  authToken: string;
}

export const writeUserToLocalStorage = (user: Partial<UserData>) => {
  writeToLocalStorage("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as Partial<UserData>;
  }
  return null;
};
