import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute, { hasLogged, hasntLogged } from '../AuthMiddleware';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import NotFound from './NotFound';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <AuthRoute exact path="/login" component={Login} middlewares={[{ middleware: hasntLogged, redirect: '/' }]} />
          <AuthRoute path="/register" component={Register} middlewares={[{ middleware: hasntLogged, redirect: '/' }]} />
          <AuthRoute exact path="/home" component={Home} middlewares={[{ middleware: hasLogged, redirect: '/login' }]} />
          <AuthRoute exact path="/" component={Home} middlewares={[]} />
          {/* <Route exact path="/" component={Home} /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}