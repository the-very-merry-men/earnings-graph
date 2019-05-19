import App from './components/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route exact path='/stocks/:stock' component={App}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('earnings-chart'));