"use client";

import { Button, Card } from "@/app/components/ui";
import { List, ListItem } from "@/lib/api";
import { useEffect, useState } from "react";
import { CrossIcon, ImageIcon } from "@/app/components/icon";

const CreateList = ({ list, create }: { list?: List; create?: boolean }) => {
  const [title, setTitle] = useState(list?.title ?? "");
  const [description, setDescription] = useState(list?.description ?? "");
  const [items, setItems] = useState<ListItem[]>(
    list?.items ? (list.items as ListItem[]) : []
  );

  const [coverImageURL, setCoverImageURL] = useState(list?.coverImageURL);

  const [activeItemIndex, setActiveItemIndex] = useState(-1);

  useEffect(() => {
    if (create) {
      setItems([
        {
          _id: "",
          text: "",
        },
        {
          _id: "",
          text: "",
        },
        {
          _id: "",
          text: "",
        },
      ]);
    }

    console.log(items);
  }, []);

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <button>
              <CrossIcon />
            </button>
          </div>

          <div>
            <Button
              size="sm"
              disabled={
                !items || items.filter((item) => item.text !== "").length === 0
              }
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
                  <input
                    value={item.text}
                    placeholder={`Item ${index + 1}`}
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
                        setItems((prev) => {
                          return [
                            ...prev.slice(0, index + 1),
                            { text: "", _id: "" },
                            ...prev.slice(index + 1),
                          ];
                        });
                      } else if (
                        items[index].text === "" &&
                        e.key === "Backspace"
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
                      }
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default CreateList;
