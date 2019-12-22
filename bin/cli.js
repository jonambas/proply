const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')

function printUsage() {
  console.log(
    commandLineUsage([
      {
        header: 'propspotter',
        content: 'Usage: propspotter <command> [options...'
      }, {
        header: 'Commands',
        content: [
          { name: 'start' },
          { name: 'build' },
          { name: 'help' }
        ]
      }
    ])
  );
}

(async () => {
  const args = commandLineArgs([
    { name: 'help', type: Boolean }
  ]);

  if (args.command === 'help' || args.help) {
    return printUsage();
  }

  const cwd = process.cwd();
  console.log(cwd)
  process.exit(1)
})()