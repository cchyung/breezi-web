import { List, ListItem } from "@/models/list";
import { User } from "@/models/user";
import { ListState } from "@/models/list";
import { CreateListInput, ListService, UserService } from "@/services";
import { db } from "@/models";
import { loadConfig } from "tsconfig-paths";
import { initDatabaseConnection } from "@/lib/config/database";
import mongoose from "mongoose";

const users: Omit<User, "_id">[] = [
  {
    username: "conner",
    phone: "+11111111111",
    imageURL:
      "https://media.licdn.com/dms/image/D4D03AQERwY2A1QTiLw/profile-displayphoto-shrink_400_400/0/1692220299445?e=1706140800&v=beta&t=UaFjX_fUPNqsPgowoaPxgoiGB2tDM3ibrfT4jizKtCo",
  },
  {
    username: "lillie",
    phone: "+12222222222",
    imageURL:
      "https://media.licdn.com/dms/image/D5603AQEZRzMyGCoq7Q/profile-displayphoto-shrink_400_400/0/1691765167189?e=1706140800&v=beta&t=9p_4ha3aTyOVFjoFqB1mH6ZcURNZYmb6IBSwrOvkgi4",
  },
];

const lists: Omit<CreateListInput, "author">[] = [
  {
    title: "My First List",
    state: ListState.published,
    coverImageURL:
      "https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

    items: [
      {
        text: "My First Item",
      },
    ],
  },
  {
    title: "My Second List",
    state: ListState.published,
    description: "This is a description of the second list",
    items: [
      {
        text: "List Item 1",
      },
      {
        text: "List Item 2",
      },
      {
        text: "List Item 3",
      },
    ],
  },
  {
    title: "My Third List",
    state: ListState.published,
    items: [
      {
        text: "This is an item",
      },
      {
        text: "So is this",
      },
      {
        text: "This as well",
      },
    ],
  },
];

const seed = async () => {
  console.log("starting seed");

  await mongoose.connection.dropDatabase();
  const userService = UserService(db);
  const listService = ListService(db);

  const createdUsers = await Promise.all(
    users.map(async (user) => {
      const createdUser = await userService.createUser(user);
      return createdUser;
    })
  );

  for (const user of createdUsers) {
    // create lists for each of the users
    for (const list of lists) {
      await listService.createList({
        ...list,
        author: user._id.toString(),
      });
    }
  }

  console.log("seeded successfully");
};

const main = async () => {
  loadConfig();
  await initDatabaseConnection();
  console.log("database connected");
  await seed();
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
  });
