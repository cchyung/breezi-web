"use client";

import { Button } from "@/app/components/ui";
import {
  CreateListMutation,
  CreateListMutationVariables,
  List,
  ListInput,
  ListItemInput,
  ListState,
} from "@/lib/api";
import {
  FormEvent,
  FormEventHandler,
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ImageIcon } from "@/app/components/icon";
import { CREATE_LIST } from "@/lib/api/list/queries";
import { useApolloClient } from "@apollo/client";

const CreateList = ({
  list,
  create,
  onCreation,
}: {
  list?: List;
  create?: boolean;
  onCreation: (list?: List | null) => void;
}) => {
  const [title, setTitle] = useState(list?.title ?? "");
  const [description, setDescription] = useState(list?.description ?? "");
  const [items, setItems] = useState<ListItemInput[]>(
    list?.items ? (list.items as ListItemInput[]) : []
  );

  const [coverImageURL, setCoverImageURL] = useState(list?.coverImageURL);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const client = useApolloClient();

  const listItemInputRefs = useMemo<RefObject<HTMLTextAreaElement>[]>(() => {
    return items.map(() => createRef<HTMLTextAreaElement>());
  }, [items]);

  function autoGrowTextArea(index: number) {
    listItemInputRefs[index].current!.style.height = "5px";
    listItemInputRefs[index].current!.style.height =
      listItemInputRefs[index].current!.scrollHeight + "px";
  }

  const onSubmit = useCallback(
    async (publish?: boolean) => {
      try {
        const input: ListInput = {
          title,
          description,
          items: items.filter((item) => item.text !== ""),
          coverImageURL,
          state: publish ? ListState.Published : ListState.Draft,
        };
        const mutation = await client.mutate<
          CreateListMutation,
          CreateListMutationVariables
        >({
          mutation: CREATE_LIST,
          variables: {
            list: input,
          },
        });

        onCreation(mutation.data?.createList);
      } catch (error) {
        console.log(error);
      }
    },
    [title, description, items, coverImageURL]
  );

  useEffect(() => {
    if (create) {
      setItems([
        {
          text: "",
        },
        {
          text: "",
        },
        {
          text: "",
        },
      ]);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            color="gray"
            disabled={
              !items || items.filter((item) => item.text !== "").length === 0
            }
            onClick={() => onSubmit(false)}
          >
            Save Draft
          </Button>

          <Button
            size="sm"
            color="primary"
            disabled={
              !title ||
              title.length == 0 ||
              !items ||
              items.filter((item) => item.text !== "").length === 0
            }
            onClick={() => onSubmit(true)}
          >
            Share
          </Button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div>
          <button>
            <div className="flex items-center gap-2">
              <ImageIcon /> Add Cover Image (Optional)
            </div>
          </button>
        </div>

        <input
          placeholder="Title your list"
          className="font-bold text-3xl"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <input
          placeholder={"(Optional) write a caption for your list"}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>

        <ul className="flex flex-col gap-3 list-disc list-inside">
          {items.map((item, index) => {
            return (
              <li key={index}>
                <textarea
                  ref={listItemInputRefs[index]}
                  value={item.text}
                  onInput={() => {
                    autoGrowTextArea(index);
                  }}
                  className="resize-none flex-1 align-top w-[90%] active:outline-none focus:outline-none"
                  placeholder={`Item ${index + 1}`}
                  rows={1}
                  onChange={(e) => {
                    setItems((prev) => {
                      return [
                        ...prev.slice(0, index),
                        { ...prev[index], text: e.target.value },
                        ...prev.slice(index + 1),
                      ];
                    });
                  }}
                  onFocus={() => {
                    setActiveItemIndex(index);
                  }}
                  onBlur={() => {
                    setActiveItemIndex(-1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setItems((prev) => {
                        return [
                          ...prev.slice(0, index + 1),
                          { text: "" },
                          ...prev.slice(index + 1),
                        ];
                      });

                      listItemInputRefs[index + 1]?.current?.focus();
                    } else if (
                      items[index].text === "" &&
                      e.key === "Backspace" &&
                      items.length > 1
                    ) {
                      // remove item at index
                      setItems((prev) => {
                        if (prev.length > 1) {
                          return [
                            ...prev.slice(0, index),
                            ...prev.slice(index + 1),
                          ];
                        } else {
                          return prev;
                        }
                      });

                      if (index - 1 >= 0) {
                        listItemInputRefs[index - 1]?.current?.focus();
                      }
                    } else if (e.key === "ArrowUp") {
                      if (index - 1 >= 0) {
                        listItemInputRefs[index - 1]?.current?.focus();
                      }
                    } else if (e.key === "ArrowDown") {
                      if (index + 1 < items.length) {
                        listItemInputRefs[index + 1]?.current?.focus();
                      }
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CreateList;
