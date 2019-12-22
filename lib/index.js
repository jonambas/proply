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
    ...userConfig
  };
}

module.exports = function (userConfig) {
  const config = makeDefaultConfig(userConfig);

  return {
    start: callback => {
      source(config);
      start(config);
    },
    build: callback => build(config),
    source: callback => source(config),
    clean: callback => clean(config)
  };
};