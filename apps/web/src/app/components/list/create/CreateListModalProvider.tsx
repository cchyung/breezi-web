"use client";
import {
  PropsWithChildren,
  createContext,
  useState,
} from "react";
import CreateListModal from "./CreateListModal";
import { List } from "@/lib/api";

let CreateListModalContext = createContext<{
  isOpen: boolean;
  openModal: (create?: boolean, list?: List, onCreation?: () => void) => void;
}>({
  isOpen: false,
  openModal: () => {},
});

const CreateListModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [create, setCreate] = useState(true);
  const [list, setList] = useState<List>();
  const [onCreation, setOnCreation] = useState<() => void>();

  const openModal = (
    create: boolean = true,
    list?: List,
    onCreation?: () => void
  ) => {
    setCreate(create);
    setIsOpen(true);
    if (list) {
      setList(list);
    } else {
      setList(undefined);
    }

    if (onCreation) {
      setOnCreation(() => onCreation);
    }
  };

  return (
    <CreateListModalContext.Provider value={{ isOpen, openModal }}>
      {children}
      <CreateListModal
        isOpen={isOpen}
        create={create}
        setIsOpen={setIsOpen}
        onCreation={onCreation}
        list={list}
      />
    </CreateListModalContext.Provider>
  );
};

export { CreateListModalProvider, CreateListModalContext };
