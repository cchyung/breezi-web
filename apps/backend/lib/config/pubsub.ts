import { RedisPubSub } from "graphql-redis-subscriptions";
import { Redis, RedisOptions } from "ioredis";

/**
 * Initialize Redis PubSub
 */
let PubSubConnection: RedisPubSub;

export const PubSub = {
  initRedisPubSub() {
    // parse out host and port from REDISCLOUD_URL with regex
    let REDIS_CLIENT_OPTIONS: RedisOptions;

    if (process.env.NODE_ENV !== "local") {
      const redisCloudUrl = process.env.REDISCLOUD_URL!;
      const redisCloudUrlRegex = /redis:\/\/([a-z]+):([\S]+)@(\S+):(\d+)/gm;
      const redisCloudUrlMatch = redisCloudUrlRegex.exec(redisCloudUrl);
      const [_, username, password, host, port] = redisCloudUrlMatch!;

      REDIS_CLIENT_OPTIONS = {
        host,
        username,
        password,
        port: parseInt(port),
        retryStrategy: (times) => {
          return Math.min(times * 50, 2000);
        },
      };
    } else {
      REDIS_CLIENT_OPTIONS = {
        host: "localhost",
        port: 6379,
        retryStrategy: (times) => {
          return Math.min(times * 50, 2000);
        },
      };
    }

    const PubSub = new RedisPubSub({
      publisher: new Redis(REDIS_CLIENT_OPTIONS),
      subscriber: new Redis(REDIS_CLIENT_OPTIONS),
    });
    return PubSub;
  },
  client() {
    if (!PubSubConnection) {
      PubSubConnection = this.initRedisPubSub();
    }
    return PubSubConnection;
  },
};
