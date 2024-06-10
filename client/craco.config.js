const cracoAlisa = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: cracoAlisa,
      options: {
        source: "tsconfig",
        baseurl: ".",
        tsConfigPath: "tsconfig.paths.json",
        debug: false,
      },
    },
  ],
};
 