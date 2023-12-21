"use client";
import { List } from "@/lib/api";
import { ListCard } from ".";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useCallback, useEffect, useMemo, useState } from "react";

const ListGallery = ({
  initialLists,
  showOptions = false,
}: {
  initialLists: List[];
  showOptions?: boolean;
}) => {
  const [lists, setLists] = useState<List[]>(initialLists);

  useEffect(() => {
    setLists(initialLists);
  }, [initialLists]);

  const onRefetch = useCallback(
    (updatedList: List) => {
      setLists((currentLists) => {
        return currentLists.map((list) => {
          if (list._id === updatedList._id) {
            return updatedList;
          } else {
            return list;
          }
        });
      });
    },
    [lists]
  );

  return (
    <div className="w-full">
      {lists?.length > 0 && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 380: 1, 750: 2 }}>
          <Masonry gutter={"12px"}>
            {lists?.length > 0 ? (
              lists?.map((list) => (
                <ListCard
                  list={list}
                  key={list._id}
                  onRefetch={onRefetch}
                  showOptions={showOptions}
                  onDelete={(deletedList) => {
                    setLists((currentLists) =>
                      currentLists.filter((l) => l._id !== deletedList._id)
                    );
                  }}
                />
              ))
            ) : (
              <p className="caption-light">No lists... go make some!</p>
            )}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};

export default ListGallery;
