import { List, ListItem, ListType } from "@/models/list";
import { User } from "@/models/user";
import { ListState } from "@/models/list";
import { CreateListInput, ListService, UserService } from "@/services";
import { db } from "@/models";
import { loadConfig } from "tsconfig-paths";
import { initDatabaseConnection } from "@/lib/config/database";
import mongoose from "mongoose";
import * as fs from "fs";
import * as readline from "readline";

const createUsers = async () => {
  const userService = UserService(db);
  const listService = ListService(db);

  // read from csv in first argument
  const filePath = process.argv[2];

  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let total = 0;
  let count = 0;
  let countOfUsersWithList = 0;
  const notFoundNumbers = [];
  for await (const line of rl) {
    total++;

    // Each line in the input will be successively available here as `line`.
    const phone = `+1${line}`;

    // look for user in the db and check if they have created a list.  Export CSV showing updated metrics
    const user = await userService.getUser({ phone });

    if (user) {
      count++;
      const list = await listService.getUserLists({
        userId: user._id.toString(),
      });

      if (list.length > 0) {
        countOfUsersWithList++;
      }
    } else {
      notFoundNumbers.push(phone);
    }
  }
  console.log("total phones", total);
  console.log("count", count);
  console.log("countOfUsersWithList", countOfUsersWithList);
  console.log("notFoundNumbers", notFoundNumbers);
};

const main = async () => {
  loadConfig();
  await initDatabaseConnection();
  console.log("database connected");
  await createUsers();
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
  });
