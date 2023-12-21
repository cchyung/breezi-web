"use client";

import { Menu } from "@headlessui/react";
import { MoreVerticalIcon } from "../../icon";
import { CreateListModalContext } from "../create/CreateListModalProvider";
import { useContext } from "react";
import {
  DeleteListMutation,
  DeleteListMutationVariables,
  List,
} from "@/lib/api";
import { useApolloClient } from "@apollo/client";
import { DELETE_LIST } from "@/lib/api/list/queries";

const ListCardOptions = ({
  list,
  refetchList,
  onDelete,
}: {
  list: List;
  refetchList: () => Promise<void>;
  onDelete?: (list: List) => void;
}) => {
  const { openModal } = useContext(CreateListModalContext);
  const client = useApolloClient();

  const deleteList = async () => {
    await client.mutate<DeleteListMutation, DeleteListMutationVariables>({
      mutation: DELETE_LIST,
      variables: {
        id: list._id,
      },
    });

    onDelete && onDelete(list);
  };

  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          <MoreVerticalIcon />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 flex flex-col w-24 bg-white shadow-xl rounded-xl overflow-hidden text-[16px] z-40">
          <Menu.Item>
            <button
              className="px-4 pb-2 pt-4 hover:bg-gray-100 transition-colors text-left"
              onClick={() => {
                openModal(false, list, refetchList);
              }}
            >
              Edit
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="px-4 pt-2 pb-4 hover:bg-gray-100 transition-colors text-left text-red-700"
              onClick={deleteList}
            >
              Delete
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};
export default ListCardOptions;
