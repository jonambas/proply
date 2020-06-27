var fs = require('fs');
const chalk = require('chalk');

module.exports = (config) => {
  console.log(chalk.gray('Cleaning...'));
  try {
    if (fs.existsSync(`${config.cwd}/node_modules/relight/.relight/data.json`)) {
      fs.unlinkSync(`${config.cwd}/node_modules/relight/.relight/data.json`);
    }
  } catch (e) {
    console.error(e);
  }
  console.log(chalk.green('Relight cache cleaned'));
};
