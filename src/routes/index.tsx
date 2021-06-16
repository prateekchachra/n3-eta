import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from '../pages/Login';
import Home from '../pages/Home';

export const history = createBrowserHistory();

const Routes: React.FunctionComponent = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
