const start = require('./start');
const build = require('./build');
const source = require("./source");
const clean = require("./clean");

function makeDefaultConfig(userConfig) {
  return {
    title: "My App",
    openBrowser: true,
    port: 9000,
    components: "./src/components",
    outputPath: "dist/propspotter",
    ...userConfig
  };
}

module.exports = function (userConfig) {
  const config = makeDefaultConfig(userConfig);

  return {
    start: callback => {
      source(config, callback);
      start(config, callback);
    },
    build: callback => {
      source(config, callback);
      build(config, callback);
    },
    source: callback => source(config, callback),
    clean: callback => clean(config, callback)
  };
};