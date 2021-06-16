import * as React from 'react';
import { hot } from 'react-hot-loader';

import './assets/scss/App.scss';
import Routes from './routes';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Routes />
    </div>
  );
};

declare let module: any;

export default hot(module)(App);
