import express from 'express';
import React from 'react';
import { matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { StaticRouter } from 'react-router-dom';
import { routes } from '../../shared/routes';
import App from '../../components/app';
import { Provider } from 'react-redux';
import createStore from '../../shared/store';
import resource from './resource';

const router = express.Router();

router.use('/resource', resource);

router.get('*', (req, res) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {};
  const fetchDataPromise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  fetchDataPromise.then(data => {
    console.log('data..........', data);
    const store = createStore(data);
    const context = { data };
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    res.render('index', {
      markup,
      title: 'React Redux HMR SSR Starter Kit',
      data: serialize(store.getState())
    });
  });
});

export default router;
