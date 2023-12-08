"use client";
import {
  UserData,
  getUserFromLocalStorage,
  writeUserToLocalStorage,
} from "@/app/lib/auth";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface UserContext {
  user: UserData | null;
  updateLocalUser: (user: UserData) => void;
}

export const UserContext = createContext<UserContext>({
  user: null,
  updateLocalUser: () => {},
});

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userDataFromLocalStorage = getUserFromLocalStorage();

    if (userDataFromLocalStorage) {
      setUser(userDataFromLocalStorage);
    }
  }, []);

  const updateLocalUser = (_user: UserData) => {
    setUser(_user);
    writeUserToLocalStorage(_user);
  };

  return (
    <UserContext.Provider value={{ user, updateLocalUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
