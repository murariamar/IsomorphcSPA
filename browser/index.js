import React from 'react';
import { hydrate } from 'react-dom';
import App from '../components/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from '../shared/store';

const store = createStore(window.__INITIAL_DATA__);
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

console.log('__isBrowser__...........', __isBrowser__);

if (__isBrowser__) {
  module.hot.accept();
}
