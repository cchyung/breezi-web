import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date";
import { asNexusMethod } from "nexus";

export * from "./list";
export * from "./listLike";
export * from "./user";
export * from "./upload"

// @ts-ignore
export const GQLDate = asNexusMethod(GraphQLDate, "date");
// @ts-ignore
export const GQLTime = asNexusMethod(GraphQLTime, "time");
// @ts-ignore
export const GQLDateTime = asNexusMethod(GraphQLDateTime, "datetime");
