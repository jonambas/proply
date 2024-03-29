const start = require('./start');
const build = require('./build');
const source = require('./source');
const clean = require('./clean');

function makeDefaultConfig(userConfig) {
  return {
    openBrowser: true,
    port: 9000,
    outputPath: 'dist/proply',
    ...userConfig
  };
}

module.exports = function(userConfig) {
  const config = makeDefaultConfig(userConfig);

  return {
    start: (callback) => {
      source(config, callback);
      start(config, callback);
    },
    build: (callback) => {
      source(config, callback);
      build(config, callback);
    },
    source: (callback) => source(config, callback),
    clean: (callback) => clean(config, callback)
  };
};
