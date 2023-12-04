"use client";
import { getUserFromLocalStorage } from "@/app/lib/auth";
import { User } from "@/lib/api";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface UserContext {
  user: Partial<User> | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    const userDataFromLocalStorage = getUserFromLocalStorage();

    if (userDataFromLocalStorage) {
      setUser(userDataFromLocalStorage);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
