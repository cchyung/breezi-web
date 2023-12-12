import { Card, Spinner } from "@/app/components/ui";
import { List } from "@/lib/api";
import ListCard from "./list/listCard/ListCard";
import { CreateList } from "./list";

const demoList: List = {
  _id: "0",
  title: "My Dream Boyfriend 💍",
  description: "The heart wants what it wants",
  coverImageURL:
    "https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  author: {
    username: "lillie",
    _id: "123941",
    imageURL:
      "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/user/profile_picture/7119d5a3-388a-41d2-a955-5d056f1f4980/thumb_Screenshot_2023-01-06_at_6.29.50_PM.png",
  },
  items: [
    {
      _id: "1",
      text: "6ft",
    },
    {
      _id: "2",
      text: "Middle Child",
    },
    {
      _id: "3",
      text: "Black Hair",
    },
  ],
};

const Components = () => {
  return (
    <div className="flex flex-col items-center gap-4 max-w-6xl mx-auto">
      <Card>
        <p>This is a Card</p>
      </Card>

      <ListCard list={demoList} />

      <Spinner />
    </div>
  );
};

export default Components;
