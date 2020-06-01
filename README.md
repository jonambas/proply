## What is this?

Propspot runs through your app's JSX and allows you to explore how your React components are being used. propspot provides a standalone environment that can be used or deployed with your design system documentation.

### Demos

- [Example App Demo](https://jonambas.github.io/propspot/)
- [SparkPost UI Demo](https://propspot-2web2ui.now.sh/)

---

![Image of the propspot interface in SparkPost's web app](demo.png)

---

### Getting Started

Install `propspot` in your app:

```bash
npm i propspot@alpha
```

Create a propspot config file named `propspot.config.js` in the root directory of your app:

```js
// propspot.config.js
module.exports = {
  // Sets page title
  title: 'My App',

  // Glob pattern for your app's code
  // Indicates where component data will be sourced
  include: '/src/**/!(*.spec|*.test).js',

  // Specifies which port Propspot should use
  // Defaults to 9000
  port: 9000,

  // If provided, prepends this url to component locations and turns them into links
  locationUrl: 'https://github.com/jonambas/propspot/tree/master/example',

  // If true, opens webpack dev server in a new tab when running the start command
  // Defaults to true
  openBrowser: true,

  // Specifies where to output the webpack build
  // Defaults to "dist/propspot"
  outputPath: 'dist/propspot'
};
```

Add the following scripts to your npm `package.json`.

```js
// package.json
"scripts": {
  "propspot:start": "propspot start",
  "propspot:build": "propspot build"
}
```

And finally, run propspot

```bash
npm run propspot:start
```

### Limitations

propspot uses typescript's compiler API to parse through your JSX.

- Components will only be detected when explicitly rendered with JSX, ie `<MyComponent />`.
- Components may not accurately represent their `displayName` if they are aliased or renamed.
- Prop values that contain expressions such as variables or functions are not evaluated, but are stringified and truncated. Eg, if you use css-modules, you can filter `className` to include `styles.css-class`.

---

### License

MIT
