import { List } from "@/lib/api";
import { ListCard } from ".";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ListGallery = ({ lists }: { lists: List[] }) => {
  return (
    <div className="w-full">
      <ResponsiveMasonry columnsCountBreakPoints={{ 380: 1, 750: 2 }}>
        <Masonry gutter={"12px"}>
          {lists?.length > 0 ? (
            lists?.map((list) => <ListCard list={list} />)
          ) : (
            <p className="caption-light">No lists... go make some!</p>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ListGallery;
