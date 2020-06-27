## What is this?

Re-light runs through your app's JSX and allows you to explore how your React components are being used. Re-light provides a standalone environment that can be used or deployed with your design system documentation.

### Demos

- [Example App Demo](https://jonambas.github.io/reprop/)
- [SparkPost UI Demo](https://reprop-2web2ui.now.sh/)

---

![Image of the reprop interface in SparkPost's web app](demo.png)

---

### Getting Started

Install `reprop` in your app:

```bash
npm i reprop@alpha
```

Create a reprop config file named `reprop.config.js` in the root directory of your app:

```js
// reprop.config.js
module.exports = {
  // Sets page title
  title: 'My App',

  // Glob pattern for your app's code
  // Indicates where component data will be sourced
  include: '/src/**/!(*.spec|*.test).js',

  // Specifies which port Reprop should use
  // Defaults to 9000
  port: 9000,

  // If provided, prepends this url to component locations and turns them into links
  locationUrl: 'https://github.com/jonambas/reprop/tree/master/example',

  // If true, opens webpack dev server in a new tab when running the start command
  // Defaults to true
  openBrowser: true,

  // Specifies where to output the webpack build
  // Defaults to "dist/reprop"
  outputPath: 'dist/reprop'
};
```

Add the following scripts to your npm `package.json`.

```js
// package.json
"scripts": {
  "reprop:start": "reprop start",
  "reprop:build": "reprop build"
}
```

And finally, run reprop

```bash
npm run reprop:start
```

### Limitations

Reprop uses typescript's compiler API to parse through your JSX.

- Components will only be detected when explicitly rendered with JSX, ie `<MyComponent />`.
- Components may not accurately represent their `displayName` if they are aliased or renamed.
- Prop values that contain expressions such as variables or functions are not evaluated, but are stringified and truncated. Eg, if you use css-modules, you can filter `className` to include `styles.css-class`.

---

### License

MIT
