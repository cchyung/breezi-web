import { loadConfig } from "lib/config/config";
import { initDatabaseConnection } from "lib/config/database";
// import { initializeMeta } from "config/meta"
import { startServer } from "lib/config/server";
import { logger } from "lib/logger";
(async () => {
  try {
    logger.info("Starting up Server");

    if (process.env.NODE_ENV !== "production") {
      loadConfig();
    }
    await initDatabaseConnection();
    // initRedisPubSub()

    // only throw error if not local
    // await initializeMeta()
    await startServer();
  } catch (error) {
    logger.error(error);
  }
})();
