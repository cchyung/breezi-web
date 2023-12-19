"use client";

import { Button } from "@/app/components/ui";
import {
  CreateListMutation,
  CreateListMutationVariables,
  GetUploadListCoverUrlQuery,
  GetUploadListCoverUrlQueryVariables,
  List,
  ListInput,
  ListItemInput,
  ListState,
  ListType,
  UpdateListMutation,
  UpdateListMutationVariables,
} from "@/lib/api";
import {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ImageIcon,
  DraftsIcon,
  BulletedListIcon,
  NumberedListIcon,
} from "@/app/components/icon";
import { CREATE_LIST, UPDATE_LIST } from "@/lib/api/list/queries";
import { useApolloClient } from "@apollo/client";

import FileDropzoneWrapper from "@/app/components/ui/FileDropzoneWrapper";
import {
  GET_UPLOAD_LIST_COVER_URL,
  GET_UPLOAD_PROFILE_IMAGE_URL,
} from "@/lib/api/upload/queries";
import { getObjectURL, uploadFileToSignedURL } from "@/lib/upload";
import { Amplitude, AmplitudeEventType } from "@/app/lib/analytics";

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
    list?.items ? ([...list.items, { text: "" }] as ListItemInput[]) : []
  );
  const [type, setType] = useState<ListType>(list?.type ?? ListType.Bulleted);
  const [coverImageURL, setCoverImageURL] = useState(list?.coverImageURL);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveDraftLoading, setSaveDraftLoading] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);

  const client = useApolloClient();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const listItemInputRefs = useMemo<RefObject<HTMLTextAreaElement>[]>(() => {
    return items.map(() => createRef<HTMLTextAreaElement>());
  }, [items]);

  const onFileDrop = useCallback((files: File[]) => {
    setCoverImageFile(files[0]);

    const imageURL = URL.createObjectURL(files[0]);
    setCoverImageURL(imageURL);
  }, []);

  function autoGrowTextArea(index: number) {
    listItemInputRefs[index].current!.style.height = "5px";
    listItemInputRefs[index].current!.style.height =
      listItemInputRefs[index].current!.scrollHeight + "px";
  }

  // initialize textareas
  useEffect(() => {
    if (!items || items.length === 0) {
      return;
    }

    items.map((_, index) => {
      autoGrowTextArea(index);
    });
  }, [items]);

  const onSubmit = useCallback(
    async (publish?: boolean) => {
      try {
        if (publish) {
          setSubmitLoading(true);
        } else {
          setSaveDraftLoading(true);
        }

        // check if cover imageURL was changed
        let coverImageURLInput = list?.coverImageURL;

        if (coverImageFile) {
          const uploadImageURLQuery = await client.query<
            GetUploadListCoverUrlQuery,
            GetUploadListCoverUrlQueryVariables
          >({
            query: GET_UPLOAD_LIST_COVER_URL,
          });

          if (uploadImageURLQuery.data.uploadListCoverURL) {
            const { url, key } = uploadImageURLQuery.data.uploadListCoverURL;

            await uploadFileToSignedURL(url, coverImageFile);
            coverImageURLInput = getObjectURL(key);
          } else {
            console.error(new Error("Failed to get upload url"));
          }
        }

        const input: ListInput = {
          title,
          description,
          items: items
            .filter((item) => item.text !== "")
            .map((item) => {
              return {
                text: item.text,
                parent: item.parent,
                imageURL: item.imageURL,
              };
            }),
          coverImageURL: coverImageURLInput,
          state: publish ? ListState.Published : ListState.Draft,
          type,
        };

        if (create) {
          const mutation = await client.mutate<
            CreateListMutation,
            CreateListMutationVariables
          >({
            mutation: CREATE_LIST,
            variables: {
              list: input,
            },
          });

          Amplitude.trackEvent(AmplitudeEventType.CREATE_LIST, {
            listId: mutation.data?.createList?._id,
          });
          onCreation(mutation.data?.createList);
        } else {
          const mutation = await client.mutate<
            UpdateListMutation,
            UpdateListMutationVariables
          >({
            mutation: UPDATE_LIST,
            variables: {
              id: list!._id!,
              list: input,
            },
          });

          Amplitude.trackEvent(AmplitudeEventType.EDIT_LIST, {
            listId: mutation.data?.updateList?._id,
          });

          onCreation(mutation.data?.updateList);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitLoading(false);
        setSaveDraftLoading(false);
      }
    },
    [title, description, items, coverImageURL, type]
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
    <div className="flex flex-col gap-4 overflow-auto">
      <FileDropzoneWrapper onDrop={onFileDrop}>
        <div className="flex items-center justify-between p-4">
          <div className="ml-auto flex items-center gap-2">
            <button
              className="mr-4"
              onClick={() =>
                setType((type) => {
                  return type === ListType.Bulleted
                    ? ListType.Numbered
                    : ListType.Bulleted;
                })
              }
            >
              {type === ListType.Bulleted ? (
                <BulletedListIcon className="w-8" />
              ) : (
                <NumberedListIcon className="w-8" />
              )}
            </button>

            <button
              disabled={
                !title || title.length == 0 || saveDraftLoading || submitLoading
              }
              onClick={() => onSubmit(false)}
              className="disabled:text-gray-300 text-black"
            >
              <DraftsIcon />
            </button>

            {create ? (
              <Button
                size="sm"
                color="primary"
                disabled={
                  submitLoading ||
                  saveDraftLoading ||
                  !title ||
                  title.length == 0
                }
                loading={submitLoading}
                onClick={() => onSubmit(true)}
              >
                {create ? "Share" : "Update"}
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  color="gray"
                  disabled={
                    saveDraftLoading ||
                    submitLoading ||
                    !title ||
                    title.length == 0
                  }
                  loading={saveDraftLoading}
                  onClick={() => onSubmit(false)}
                >
                  Update Draft
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  disabled={
                    saveDraftLoading ||
                    submitLoading ||
                    !title ||
                    title.length == 0
                  }
                  loading={submitLoading}
                  onClick={() => onSubmit(true)}
                >
                  Publish
                </Button>
              </>
            )}
          </div>
        </div>

        <div>
          {coverImageURL ? (
            <div className="h-[200px] relative overflow-hidden group">
              <img src={coverImageURL} className="w-full object-cover" />

              <div className="group-hover:flex hidden flex-row items-center p-4 justify-end w-full absolute bottom-0">
                <Button
                  color="gray"
                  size="sm"
                  onClick={() => {
                    setCoverImageURL(undefined);
                  }}
                >
                  Change Image
                </Button>
              </div>
            </div>
          ) : (
            <button onClick={() => fileInputRef.current?.click()}>
              <div className="flex items-center gap-2 px-6 text-gray-400 text-[14px]">
                <ImageIcon /> Add Cover Image
              </div>
            </button>
          )}
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files) {
                onFileDrop([e.target.files[0]]);
              }
            }}
          />
        </div>

        <div className="p-6 pt-4 flex flex-col gap-2 overflow-hidden">
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

          <ul
            className={`flex flex-col gap-1 ml-4 list-inside flex-1 ${
              type === ListType.Bulleted ? "list-disc" : "list-decimal"
            }`}
          >
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
                        e.preventDefault();
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
      </FileDropzoneWrapper>
    </div>
  );
};

export default CreateList;
