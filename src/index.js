import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const out = document.createElement('div');
document.body.append(out);

function renderPropspotter() {
  ReactDOM.render(
    <App />,
    out
  );
}

renderPropspotter();

if (module.hot) {
  module.hot.accept("./App", () => {
    renderPropspotter();
  });
}