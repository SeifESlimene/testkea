import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { resetContext, getContext } from 'kea';
import Layout from './layout';
import bundles from './bundles-async';

if (typeof window !== 'undefined') {
  window.__KEA_GET_CONTEXT__ = getContext;
}

const AppContainer = (props) => {
  const { scene } = 'homepage';

  resetContext({
    createStore: {
      paths: ['homepage'],
    },
  });

  const splitPoints = [scene];
  Promise.all(splitPoints.map((chunk) => bundles[chunk].loadComponent())).then(
    (response) => {
      const reactElement = <Layout bundles={bundles} />;
      ReactDOM.hydrate(reactElement, document.getElementById('root'));
    }
  );
};

export default AppContainer;
