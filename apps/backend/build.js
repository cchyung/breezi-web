let esbuild = require("esbuild");
let esbuildPluginTsc = require("esbuild-plugin-tsc");
let { copy } = require("esbuild-plugin-copy");

let buildSettings = {
  entryPoints: ["index.ts"],
  outfile: "build/index.js",
  bundle: true,
  plugins: [
    esbuildPluginTsc({
      force: true,
    }),
    copy({
      assets: [
        {
          from: ["./schemas/**/*.ts"],
          to: ["./schemas"],
        },
        {
          from: ["./models/**/*.ts"],
          to: ["./models"],
        },
      ],
    }),
  ],
  platform: "node",
  packages: "external",
  loader: {
    ".graphql": "copy",
  },
};

esbuild.build(buildSettings);
