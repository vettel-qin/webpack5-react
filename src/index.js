import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';

import App from './App';
import About from './About';
import List from './List';
import Store from './store';

ReactDOM.render(
  <Provider store={Store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" exact component={App} />
      <Route path="/about" exact component={About} />
      <Route path="/list" exact component={List} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
