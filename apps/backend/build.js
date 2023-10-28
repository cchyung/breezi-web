let esbuild = require("esbuild");
let esbuildPluginTsc = require("esbuild-plugin-tsc");

let buildSettings = {
  entryPoints: ["index.ts"],
  outfile: "build/index.js",
  bundle: true,
  plugins: [
    esbuildPluginTsc({
      force: true,
    }),
  ],
  platform: "node",
  packages: "external",
};

esbuild.build(buildSettings);
