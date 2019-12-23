var fs = require("fs");

module.exports = (config, callback) => {
  if (fs.existsSync(`${config.cwd}/node_modules/propspotter/.propspottercache`)) {
    fs.unlinkSync(
      `${config.cwd}/node_modules/propspotter/.propspottercache/data.json`
    );
  }
  console.log("👍  Cache Cleaned");
};
