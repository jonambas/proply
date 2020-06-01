#! /usr/bin/env node
const path = require('path');
const meow = require('meow');
const lib = require('../lib');
const findUp = require('find-up');

const cli = meow(
  `
  Usage
    $ propspot <command> [options...]
  
  Commands
    source         Generates JSON data of your App's component
    start          Starts the propspot UI
    build          Builds the prospot UI
    clean          Clears the propspot component cache
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

async function propspot(command, flags) {
  if (flags.version) {
    cli.showVersion(1);
  }

  if (command === 'help') {
    cli.showHelp();
    process.exit(1);
  }

  const configPath = await findUp('propspot.config.js');

  if (!configPath) {
    console.error('Please add a propspot.config.js to the root of your project.');
    process.exit(1);
  }

  const config = require(configPath);

  const propspot = lib({
    cwd: path.dirname(configPath),
    ...config
  });

  if (propspot.hasOwnProperty(command)) {
    propspot[command]((err) => {
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

propspot(cli.input[0], cli.flags);
