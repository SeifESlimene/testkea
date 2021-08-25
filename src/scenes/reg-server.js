import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import { resetContext, getContext } from 'kea';
import bundles from './bundles-sync';
import Layout from './layout';
import { routerPlugin } from 'kea-router';

const initialContext = getContext();

const AppContainer = (props) => {
  resetContext({
    plugins: [
      routerPlugin({
        location,
        pathFromWindowToRoutes: (path) => removeLanguageUrlFromPath(path),
        pathFromRoutesToWindow: (path) => maybeAddLanguageUrlToPath(path),
      }),
    ],
    inputs: initialContext.inputs,
    sceneDefaults: {
      [scene]: props,
    },
    createStore: {
      paths: ['homepage'],
    },
  });

  const response = {
    renderedHtml: {
      componentHtml: renderStylesToString(
        renderToString(<Layout bundles={bundles} />)
      ),
    },
  };

  return response;
};

export default AppContainer;
