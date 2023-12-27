import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { ApolloServer } from "apollo-server-express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { logger } from "lib/logger";
import { schema } from "schemas/make-schema";
import { AuthenticatedContext, UnauthenticatedContext } from "lib/context";
import { verifyAuthToken } from "lib/auth";
import { BaseError } from "lib/errors";
import { db } from "models";

const loggingPlugin: ApolloServerPlugin = {
  async requestDidStart(requestContext) {
    if (requestContext.request.operationName === "IntrospectionQuery") return;

    logger.info(
      `${requestContext.request.operationName} - ${requestContext.request.http?.method}`
    );

    return {
      async didEncounterErrors(requestContext) {
        for (const error of requestContext.errors) {
          const payload: any = {
            query: requestContext.context.query,
          };

          let formattedPayload;

          if (error.originalError) {
            if (error.originalError instanceof BaseError) {
              formattedPayload = {
                ...payload,
                extra: error.originalError.extra,
                ...((error.originalError.ctx as AuthenticatedContext)?.user
                  ? {
                      user: (
                        error.originalError.ctx as AuthenticatedContext
                      ).user._id.toString(),
                    }
                  : {}),
              };
            } else {
              formattedPayload = payload;
            }
            logger.error(error.originalError);
          } else {
            logger.error(error);
          }
        }
      },
    };
  },
};

export const startServer = async () => {
  const app = express();
  app.use(cors());
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
  });

  // websocket server
  const serverCleanup = useServer(
    {
      schema,
      onNext: (_, __, ___, result) => {
        if (result.errors) {
          for (const error of result.errors) {
            const payload: any = {};

            let formattedPayload;

            if (error.originalError) {
              if (error.originalError instanceof BaseError) {
                formattedPayload = {
                  ...payload,
                  extra: error.originalError.extra,
                  ...((error.originalError.ctx as AuthenticatedContext)?.user
                    ? {
                        user: (
                          error.originalError.ctx as AuthenticatedContext
                        ).user._id.toString(),
                      }
                    : {}),
                };
              } else {
                formattedPayload = payload;
              }

              console.log("base error");
              logger.error(payload.operationName, error.originalError);
            } else {
              logger.error(payload.operationName, error);
            }
          }
        }
      },
      onSubscribe(_, message) {
        logger.info(`${message.payload.operationName} - Susbcribe`);
      },
      onError: (_, __, errors) => {
        for (const error of errors) {
          const payload: any = {};

          let formattedPayload;

          if (error.originalError) {
            if (error.originalError instanceof BaseError) {
              formattedPayload = {
                ...payload,
                extra: error.originalError.extra,
                ...((error.originalError.ctx as AuthenticatedContext)?.user
                  ? {
                      user: (
                        error.originalError.ctx as AuthenticatedContext
                      ).user._id.toString(),
                    }
                  : {}),
              };
            } else {
              formattedPayload = payload;
            }
            logger.error(error.originalError);
          } else {
            logger.error(error);
          }
        }
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      loggingPlugin,
    ],
    context: async ({
      req,
      res,
    }): Promise<AuthenticatedContext | UnauthenticatedContext> => {
      // parse token from "Bearer"
      let authToken = req.headers.authorization || null;

      if (authToken) {
        authToken = authToken.split(" ")[1];
        const authenticatedUser = await verifyAuthToken(authToken);
        // const metaService = MetaService(db)
        // let internalAdmin = await metaService.userIsInternalAdmin({ userId: authenticatedUser._id })

        // TODO: Type these
        /* @ts-ignore */
        return { req, res, user: authenticatedUser, db };
      } else {
        /* @ts-ignore */
        return { req, res, db };
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(process.env.PORT ?? 4000, () => {
    logger.info(`🗿 Server ready 🎉`);
  });
};
