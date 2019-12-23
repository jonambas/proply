import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import data from '../.propspottercache/data.json'

function renderPropspotter() {

  ReactDOM.render(
    <div>
      <Table data={data} />
    </div>,
    document.body
  );
}

renderPropspotter();

if (module.hot) {
  module.hot.accept("./Table", () => {
    renderPropspotter({ data: require('../.propspottercache/data.json' )});
  });
}