import React from 'react';
import { hydrate } from 'react-dom';
import App from '../components/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from '../shared/store';

const initialState = document.body.getAttribute('data-props');

const praseInitialState = rawData => {
  try {
    return JSON.parse(initialState);
  } catch (ex) {
    console.error('error parsing inital state', ex);
  }
};

const store = createStore(praseInitialState(initialState));
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (__isBrowser__) {
  module.hot.accept();
}

