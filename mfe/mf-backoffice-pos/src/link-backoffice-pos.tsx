import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';
import './index.css';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return <div>Error en POS: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
