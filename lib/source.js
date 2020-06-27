const path = require('path');
const ts = require('typescript');
const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');

const data = [];

function parse(source, fileName) {
  visit(source);

  function saveEntry(entry) {
    const { node, name, props } = entry;
    const { line } = ts.getLineAndCharacterOfPosition(source, node.pos);
    data.push({ name, location: { fileName, line: line + 1 }, props });
  }

  function visit(node) {
    if (
      node.kind === ts.SyntaxKind.JsxOpeningElement ||
      node.kind === ts.SyntaxKind.JsxSelfClosingElement
    ) {
      const name = node.tagName ? node.tagName.getText(source) : false;

      // Ignores normal HTML JSX elements
      if (name && /[A-Z]/.test(name[0])) {
        const props = node.attributes.properties || [];
        let toSave = [];
        let spread = false;

        props.forEach((prop) => {
          if (prop.kind === ts.SyntaxKind.JsxSpreadAttribute) {
            spread = true;
            return;
          }

          const propName = prop.name.getText(source);
          const valueNode = prop.initializer;
          let value = '__EXPRESSION__'; // Not used

          if (!valueNode) {
            value = true; // Boolean prop set to true
          } else {
            if (valueNode.text) {
              value = valueNode.text; // Strings
            } else if (valueNode.expression && valueNode.expression.text) {
              value = valueNode.expression.text; // Numbers
            } else {
              // Everything else, variables, functions, etc
              const parts = valueNode.getText(source);
              const expression = parts.substring(1, parts.length - 1);
              const max = 200;
              value =
                expression.length > max
                  ? `${expression.substring(0, max)}...` // Keep only first 200 characters
                  : expression;
            }
          }
          toSave.push({ value, name: propName });
        });

        toSave.push(...(spread ? [{ name: '...spread', value: true }] : []));
        saveEntry({ node: node.tagName, name, props: toSave });
      }
    }

    ts.forEachChild(node, visit);
  }
}

module.exports = function(config, callback) {
  glob(config.cwd + config.include, {}, function(err, files) {
    if (err) {
      callback(err);
    }

    console.log(chalk.white(`Relight reading ${files.length} files...`));
    files.forEach((fileName) => {
      console.log(chalk.gray(`${fileName}`));
      const sourceFile = ts.createSourceFile(
        fileName,
        fs.readFileSync(fileName).toString(),
        ts.ScriptTarget.ES2015
      );
      parse(sourceFile, path.relative(config.cwd, fileName));
    });

    // Saving in node modules okay?
    const dir = `${config.cwd}/node_modules/relight/.relight`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(dir + '/data.json', JSON.stringify(data));

    console.log(chalk.green('Relight source done'));
  });
};
