var fs = require("fs");

module.exports = (config, callback) => {
  fs.unlinkSync(
    `${config.cwd}/node_modules/propspotter/.propspottercache/data.json`
  );
  console.log("👍  Propspotter cache cleaned");
};
