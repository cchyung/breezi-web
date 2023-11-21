"use client";

import { Card } from "@/app/components/ui";
import { List, ListItem } from "@/lib/api";
import { useEffect, useState } from "react";

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
  }, []);

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <p>Add Cover Image</p>

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
                      setItems((prev) => {
                        prev.splice(index);
                        return prev
                      });
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export default CreateList;
