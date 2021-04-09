import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router";
import { createBrowserHistory } from "history";
import { Provider } from 'mobx-react';

import App from "./App.tsx";
import About from './About.tsx';
import Store from './store.js';

ReactDOM.render(
  <Provider store={Store}>
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={App} />
      <Route exact path="/about" component={About} />
    </Router>
  </Provider>,
  document.getElementById("root")
);