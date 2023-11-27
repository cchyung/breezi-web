"use client";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import CreateListModal from "./CreateListModal";

let CreateListModalContext = createContext<{
  isOpen: boolean;
  openModal: (create?: boolean, onCreation?: () => void) => void;
}>({
  isOpen: false,
  openModal: () => {},
});

const CreateListModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [create, setCreate] = useState(true);
  const [onCreation, setOnCreation] = useState<() => void>();

  const openModal = (create: boolean = true, onCreation?: () => void) => {
    setCreate(create);
    setIsOpen(true);

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
      />
    </CreateListModalContext.Provider>
  );
};

export { CreateListModalProvider, CreateListModalContext };
