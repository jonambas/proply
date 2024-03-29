var fs = require('fs');
const chalk = require('chalk');

module.exports = (config) => {
  console.log(chalk.gray('Cleaning...'));
  try {
    if (fs.existsSync(`${config.cwd}/node_modules/proply/.proply/data.json`)) {
      fs.unlinkSync(`${config.cwd}/node_modules/proply/.proply/data.json`);
    }
  } catch (e) {
    console.error(e);
  }
  console.log(chalk.green('Proply cache cleaned'));
};
