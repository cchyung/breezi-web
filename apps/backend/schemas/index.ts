import { makeSchema, asNexusMethod, fieldAuthorizePlugin } from "nexus";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { listFiles } from "lib/files";
import { GraphQLNamedType, GraphQLScalarType } from "graphql";
import path from "path";
import fs from "fs";
import { AccessError } from "lib/errors";

// ==================== Scalars ====================
export const GQLDate = asNexusMethod(GraphQLDate, "date"); // @ts-ignore
export const GQLTime = asNexusMethod(GraphQLTime, "time"); // @ts-ignore
export const GQLDateTime = asNexusMethod(GraphQLDateTime, "datetime"); // @ts-ignore
export const JSONScalar = new GraphQLScalarType({
  name: "JSON",
  serialize: (data: any) => data,
  parseValue: (data: any) => data,
});

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

const commonFileFilter = (filePath: string) => {
  return [".js", ".ts"].includes(path.extname(filePath));
};

const getSchemaTypes = () => {
  // get all schema files
  const schemaFilePath = __dirname;
  const schemaIgnorePaths = fs
    .readdirSync(schemaFilePath)
    .map((filePath) => path.join(schemaFilePath, filePath));
  const schemaFiles = listFiles(schemaFilePath, (filePath) => {
    return commonFileFilter(filePath) && !schemaIgnorePaths.includes(filePath);
  });

  // require each file
  const types = schemaFiles.map((file) => require(file));

  // push various scalars
  types.push(GQLDate);
  types.push(GQLTime);
  types.push(GQLDateTime);
  types.push(JSONScalar);

  return types;
};

const getSourceModules = () => {
  // get all model files
  // const modelFilePath = path.join(__dirname, "..", "models")
  // const modelIgnorePaths = fs.readdirSync(modelFilePath).map((filePath) => path.join(modelFilePath, filePath))
  // const modelFiles = listFiles(modelFilePath, (filePath) => {
  // 	return commonFileFilter(filePath) && !modelIgnorePaths.includes(filePath)
  // })

  // get top level model files
  const modelFilePath = path.join(__dirname, "..", "models");
  const modelRootPaths = fs
    .readdirSync(modelFilePath)
    .map((filePath) => path.join(modelFilePath, filePath));
  const modelFiles: string[] = [];
  modelRootPaths.forEach((filePath) => {
    if (
      fs.statSync(filePath).isDirectory() &&
      fs.readdirSync(filePath).includes("index.ts")
    ) {
      modelFiles.push(path.join(filePath, "index.ts"));
    }
  });

  // determine aliases
  const modules = modelFiles.map((file) => {
    const moduleName = path.dirname(file).split(path.sep).pop()!;
    const fileName = path.basename(file, path.extname(file));

    // Construct alias based on filepath. For example, koop/member.ts becomes koopMember.
    let alias = capitalize(moduleName);
    if (fileName !== "index") {
      alias += capitalize(fileName);
    }

    return {
      module: file,
      alias: alias,
      typeMatch: (name: GraphQLNamedType) =>
        new RegExp(`(?:interface|type|class|enum)\\s+(${name}s?)\\W`, "g"),
    };
  });

  return modules;
};

// make schema
export const schema = makeSchema({
  types: getSchemaTypes(),
  shouldGenerateArtifacts: process.env.NODE_ENV !== "production",
  plugins: [
    fieldAuthorizePlugin({
      formatError: ({ ctx, args, error }) => {
        return new AccessError("user does not have access", {
          ctx,
          originalError: error,
          extra: { ...args },
        });
      },
    }),
  ],
  outputs: {
    typegen: path.join(__dirname, "..", "generated", "nexus-typegen.ts"),
    schema: path.join(__dirname, "..", "generated", "schema.graphql"),
  },
  sourceTypes: {
    modules: getSourceModules(),
  },
  contextType: {
    module: path.join(__dirname, "..", "lib", "context", "index.ts"),
    export: "AuthenticatedContext",
  },
});
