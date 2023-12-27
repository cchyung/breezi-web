"use client";
import { PropsWithChildren, createContext, useState } from "react";
import CreateListModal from "./CreateListModal";
import { List, Topic } from "@/lib/api";

export interface ListCreateOptions {
  create: boolean;
  list?: List;
  topic?: Topic;
  onCreation?: () => void;
}

let CreateListModalContext = createContext<{
  isOpen: boolean;
  openModal: (options: ListCreateOptions) => void;
}>({
  isOpen: false,
  openModal: () => {},
});

const CreateListModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [create, setCreate] = useState(true);
  const [list, setList] = useState<List>();
  const [topic, setTopic] = useState<Topic>();
  const [onCreation, setOnCreation] = useState<() => void>();

  const openModal = (options: ListCreateOptions) => {
    setCreate(options.create);
    setIsOpen(true);
    if (options.list) {
      setList(options.list);
    } else {
      setList(undefined);
    }

    if (options.topic) {
      setTopic(options.topic);
    } else {
      setTopic(undefined);
    }

    if (onCreation) {
      setOnCreation(() => options.onCreation);
    }
  };

  return (
    <CreateListModalContext.Provider value={{ isOpen, openModal }}>
      {children}
      <CreateListModal
      topic={topic}
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
