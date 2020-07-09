## What is this?

Proply runs through your app's JSX and allows you to explore how your React components are being used. Proply provides a standalone environment that can be used or deployed with your design system documentation.

### Demos

- [Example App Demo](https://proply-demo.vercel.app/)
- [SparkPost UI Demo](https://proply-2web2ui.vercel.app/)

---

![Image of the proply interface in SparkPost's web app](demo.png)

---

### Getting Started

Install `proply` in your app:

```bash
npm i proply@alpha
```

Create a proply config file named `proply.config.js` in the root directory of your app:

```js
// proply.config.js
module.exports = {
  // Sets page title
  title: 'My App',

  // Glob pattern for your app's code, where component data will be sourced
  include: '/src/**/!(*.spec|*.test).js',

  // Specifies which port Proply should use
  port: 9000,

  // If provided, prepends this url to component locations and turns them into links
  locationUrl: 'https://github.com/jonambas/proply/tree/master/example',

  // Where to put proply's build
  // Defaults to "dist/proply"
  outputPath: 'dist/proply'
};
```

Add the following scripts to your npm `package.json`.

```js
// package.json
"scripts": {
  "proply:start": "proply start",
  "proply:build": "proply build"
}
```

And finally, run proply

```bash
npm run proply:start
# That's it!
```

### Limitations

Proply uses typescript's compiler API to parse through your JSX.

- Components will only be detected when explicitly rendered with JSX, ie `<MyComponent />`.
- Components may not accurately represent their `displayName` if they are aliased or renamed.
- Prop values that contain expressions such as variables or functions are not evaluated, but are stringified and truncated. Eg, if you use css-modules, you can filter `className` to include `styles.css-class`.

---

### License

MIT
