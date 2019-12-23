### Propspotter


Install:
```bash
npm i propspotter@alpha
```

Create a config file
```js
// propspotter.config.js
module.exports = {
  include: "/src/**/*.js",
  port: 9000,
  openBrowser: true
}
```

Modify your npm package
```
// package.json
"scripts": {
  "propspotter:start": "propspotter start"
}
```
