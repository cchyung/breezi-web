import { List, ListItem } from "@/models/list";
import { User } from "@/models/user";
import { ListState } from "@/models/list";
import { CreateListInput, ListService, UserService } from "@/services";
import { db } from "@/models";
import { loadConfig } from "tsconfig-paths";
import { initDatabaseConnection } from "@/lib/config/database";
import mongoose from "mongoose";

const TEST_USER_ID = "656e6de5f473743a91f11ca9";
const main = async () => {
  loadConfig();
  await initDatabaseConnection();
  console.log("database connected");
  const listService = ListService(db);

  console.log(
    await listService.getListFeed({
      userId: TEST_USER_ID,
      skip: 0,
      pageSize: 20,
    })
  );
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
  });
