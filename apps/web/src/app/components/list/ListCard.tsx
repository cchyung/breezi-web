import { Card } from "@/app/components/ui";
import { List } from "@/lib/api";
import UserAvatar from "../ui/UserAvatar";

const ListCard = ({ list }: { list: List }) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-3 items-center">
          <UserAvatar user={list.author} size="sm" />
          <p className="font-bold">@{list.author.username}</p>
        </div>

        {list.coverImageURL && (
          <img
            className="h-36 w-full rounded-md object-cover"
            alt="list cover"
            src={list.coverImageURL}
          />
        )}

        <h3 className="font-bold">{list.title}</h3>
        {list.description && <p>{list.description}</p>}

        <ul className="flex flex-col gap-3 list-disc list-inside">
          {list.items.map((item, index) => (
            <li key={index}>{item?.text}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ListCard;
