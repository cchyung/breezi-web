"use client";
import { Dialog } from "@headlessui/react";
import { CreateList } from ".";
import { CrossIcon } from "@/app/components/icon";
import { Card } from "@/app/components/ui";
import { List } from "@/lib/api";

const CreateListModal = ({
  isOpen = false,
  create = false,
  setIsOpen,
  onCreation,
  list,
}: {
  isOpen: boolean;
  create: boolean;
  setIsOpen: (_: boolean) => void;
  onCreation?: () => void;
  list?: List;
}) => {
  return (
    <Dialog
      className="z-50 relative"
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="fixed inset-0 flex w-screen justify-center items-center overflow-auto">
        <Dialog.Panel className="relative max-w-auto md:max-w-md md:h-auto h-screen w-full">
          <div className="w-full h-full md:max-h-[80vh]">
            <Card className="h-full shadow-xl" tight={true}>
              <CreateList
                create={create}
                onCreation={() => {
                  setIsOpen(false);

                  if (onCreation) {
                    onCreation();
                  }
                }}
                list={list}
              />

              <div className="absolute left-6 top-6">
                <button onClick={() => setIsOpen(false)}>
                  <CrossIcon />
                </button>
              </div>
            </Card>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateListModal;
