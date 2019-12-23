## Propspotter

Discover how your app's components are used. 

![Displays component usage of your app through a table](demo.png)

---

#### Getting Started

Install propspotter:
```bash
npm i propspotter@alpha
```

Create a config file in your app:
```js
// propspotter.config.js
module.exports = {
  // Sets page title
  title: "My App",

  // Glob pattern for your app's code
  // Indicates where component data will be sourced
  include: "/src/**/!(*.spec|*.test).js",

  // Specifies which port Propspotter should use
  port: 9000,

  // If provided, prepends this url to component locations and turns them into links
  locationUrl: "https://github.com/jonambas/propspotter/tree/master/example",

  // If true, opens a new browser tab when running the start command
  openBrowser: true,

  // Specifies where to output the webpack build
  outputPath: "dist/propspotter"
}
```

Modify your npm package:
```js
// package.json
"scripts": {
  "propspotter:start": "propspotter start",
  "propspotter:build": "propspotter build"
}
```
