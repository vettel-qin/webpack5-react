import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';

import App from './App';
import About from './About';
import Store from './store';

ReactDOM.render(
  <Provider store={Store}>
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={App} />
      <Route exact path="/about" component={About} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
