#! /usr/bin/env node
const path = require('path');
const meow = require('meow');
const lib = require('../lib');
const findUp = require('find-up');

const cli = meow(
  `
  Usage
    $ relight <command> [options...]
  
  Commands
    source         Generates JSON data of your App's component
    start          Starts the relight UI
    build          Builds the prospot UI
    clean          Clears the relight component cache
    help           Displays this usage guide

	Options
    --help, -h     Displays this usage guide
    --version, -v  Displays version info
`,
  {
    flags: {
      help: {
        type: 'boolean',
        alias: 'h'
      },
      version: {
        type: 'boolean',
        alias: 'v'
      }
    }
  }
);

async function relight(command, flags) {
  if (flags.version) {
    cli.showVersion(1);
  }

  if (command === 'help') {
    cli.showHelp();
    process.exit(1);
  }

  const configPath = await findUp('relight.config.js');

  if (!configPath) {
    console.error('Please add a relight.config.js to the root of your project.');
    process.exit(1);
  }

  const config = require(configPath);

  const relight = lib({
    cwd: path.dirname(configPath),
    ...config
  });

  if (relight.hasOwnProperty(command)) {
    relight[command]((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  } else {
    cli.showHelp();
    process.exit(1);
  }
}

relight(cli.input[0], cli.flags);
