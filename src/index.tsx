import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';
import rootReducer from './redux/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

syncHistoryWithStore(createBrowserHistory(), store);

const rootEl = document.getElementById('root');

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootEl,
);
