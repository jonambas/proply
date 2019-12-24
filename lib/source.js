const path = require('path');
const ts = require('typescript');
const fs = require('fs');
const glob = require('glob');

const data = [];

function parse(source, fileName) {
  visit(source);

  function saveEntry(entry) {
    const { node, name, props } = entry;
    const { line } = ts.getLineAndCharacterOfPosition(source, node.pos);
    data.push({ name, location: { fileName, line: line + 1 }, props });
  }

  function visit(node) {
    switch (node.kind) {
      case ts.SyntaxKind.JsxOpeningElement:
      case ts.SyntaxKind.JsxSelfClosingElement:
        const name = node.tagName ? node.tagName.getText(source) : null;

        // Ignores normal HTML JSX elements
        if (name && /[A-Z]/.test(name[0])) {
          const props = node.attributes.properties || [];
          let toSave = [];
          let spread = false;

          props.forEach(prop => {
            if (prop.kind === ts.SyntaxKind.JsxSpreadAttribute) {
              spread = true;
              return;
            }

            const propName = prop.name.getText(source);
            const valueNode = prop.initializer;
            let value = 'EXPRESSION';

            if (!valueNode) {
              value = true; // Boolean prop set to true
            } else {
              if (valueNode.text) {
                value = valueNode.text; // Strings
              } else if (valueNode.expression && valueNode.expression.text) {
                value = valueNode.expression.text; // Numbers
              } else {
                // Everything else, variables, functions, etc
                // console.log(valueNode.getText(source));
              }
            }
            toSave.push({ value, name: propName });
          });

          toSave.push(...(spread ? [{ name: '...spread', value: true }] : []));
          saveEntry({ node: node.tagName, name, props: toSave });
        }

        break;
    }

    ts.forEachChild(node, visit);
  }
}

module.exports = function(config, callback) {
  glob(config.cwd + config.include, {}, function(err, files) {
    if (err) {
      callback(err);
    }

    files.forEach(fileName => {
      const sourceFile = ts.createSourceFile(
        fileName,
        fs.readFileSync(fileName).toString(),
        ts.ScriptTarget.ES2015
      );
      parse(sourceFile, path.relative(config.cwd, fileName));
    });

    // Saving in node modules okay?
    const dir = `${config.cwd}/node_modules/propspotter/.propspottercache`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(dir + '/data.json', JSON.stringify(data));
  });
};
