## Propspotter

Propspotter runs through your app's JSX and allows you to explore how your React components are being used. Propspotter provides a standalone environment that can be used or deployed with your design system documentation.

### Demos

- [Example App Demo](https://jonambas.github.io/propspotter/)
- [SparkPost UI Demo](https://propspotter-2web2ui.now.sh/)

---

![Image of the propspotter interface in SparkPost's web app](demo.png)

---

### Getting Started

Install `propspotter` in your app:

```bash
npm i propspotter@alpha
```

Create a propspotter config file named `propspotter.config.js` in the root directory of your app:

```js
// propspotter.config.js
module.exports = {
  // Sets page title
  title: 'My App',

  // Glob pattern for your app's code
  // Indicates where component data will be sourced
  include: '/src/**/!(*.spec|*.test).js',

  // Specifies which port Propspotter should use
  // Defaults to 9000
  port: 9000,

  // If provided, prepends this url to component locations and turns them into links
  locationUrl: 'https://github.com/jonambas/propspotter/tree/master/example',

  // If true, opens webpack dev server in a new tab when running the start command
  // Defaults to true
  openBrowser: true,

  // Specifies where to output the webpack build
  // Defaults to "dist/propspotter"
  outputPath: 'dist/propspotter'
};
```

Add the following scripts to your npm `package.json`.

```js
// package.json
"scripts": {
  "propspotter:start": "propspotter start",
  "propspotter:build": "propspotter build"
}
```

And finally, run propspotter

```bash
npm run propspotter:start
```

---

### License

MIT
