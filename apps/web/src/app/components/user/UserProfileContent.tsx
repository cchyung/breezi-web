"use client";
import { Tab } from "@headlessui/react";
import ListsIcon from "../icon/ListsIcon";
import DraftsIcon from "../icon/DraftsIcon";
import SaveIcon from "../icon/SaveIcon";
import { List, ListState } from "@/lib/api";
import { ListGallery } from "@/app/components/list";

const UserProfileContent = ({ lists }: { lists: List[] }) => {
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="w-full flex flex-row">
          <Tab className="focus:outline-none py-2 w-1/3 flex flex-row items-center justify-center gap-1 text-gray border-b-2 border-b-gray ui-selected:text-primary ui-selected:border-b-primary">
            <ListsIcon className="h-5" />
            <span className="caption-light">Lists</span>
          </Tab>
          <Tab className="focus:outline-none py-2 w-1/3 flex flex-row items-center justify-center gap-1 text-gray border-b-2 border-b-gray ui-selected:text-primary ui-selected:border-b-primary">
            <DraftsIcon className="h-5" />
            <span className="caption-light">Drafts</span>
          </Tab>
          <Tab className="focus:outline-none py-2 w-1/3 flex flex-row items-center justify-center gap-1 text-gray border-b-2 border-b-gray ui-selected:text-primary ui-selected:border-b-primary">
            <SaveIcon className="h-5" />
            <span className="caption-light">Saved</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="mx-auto max-w-6xl p-3">
            <ListGallery
              showOptions={true}
              initialLists={lists.filter(
                (list) => list.state === ListState.Published
              )}
            />
          </Tab.Panel>
          <Tab.Panel className="mx-auto max-w-6xl p-3">
            <ListGallery
              showOptions={true}
              initialLists={lists.filter(
                (list) => list.state === ListState.Draft
              )}
            />
          </Tab.Panel>
          <Tab.Panel className="mx-auto max-w-6xl p-3">
            <p>Saved Lists (TODO)</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default UserProfileContent;
