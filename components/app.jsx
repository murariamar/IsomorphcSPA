/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../shared/routes';
import NoMatch from './noMatch';
import NavBar from './navbar';

export default () => {
  return (
    <div>
      <NavBar />
      <Switch>
        {routes.map(({ path, exact, component: C, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={props => <C {...props} {...rest} />}
          />
        ))}
        <Route render={props => <NoMatch {...props} />} />
      </Switch>
    </div>
  );
};
