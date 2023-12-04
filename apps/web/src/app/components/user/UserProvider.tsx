"use client";
import {
  UserData,
  getUserFromLocalStorage,
  writeUserToLocalStorage,
} from "@/app/lib/auth";
import { User } from "@/lib/api";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface UserContext {
  user: Partial<User> | null;
  updateUser: (user: Partial<UserData>) => void;
}

export const UserContext = createContext<UserContext>({
  user: null,
  updateUser: () => {},
});

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    const userDataFromLocalStorage = getUserFromLocalStorage();

    if (userDataFromLocalStorage) {
      setUser(userDataFromLocalStorage);
    }
  }, []);

  const updateUser = (_user: Partial<UserData>) => {
    setUser(_user);
    writeUserToLocalStorage(_user);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
