import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute, { hasLogged, hasntLogged } from '../AuthMiddleware';
import Login from './Login';
import Register from './Register';
import Share from './Home';
import Review from './Home/Review';
import Donate from './Home/Donate';
import NotFound from './NotFound';
import Home from './Home/Home';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <AuthRoute exact path="/login" component={Login} middlewares={[{ middleware: hasntLogged, redirect: '/' }]} />
          <AuthRoute path="/register" component={Register} middlewares={[{ middleware: hasntLogged, redirect: '/' }]} />
          <AuthRoute exact path="/share" component={Share} middlewares={[{ middleware: hasLogged, redirect: '/login' }]} />
          <AuthRoute exact path="/" component={Share} middlewares={[{ middleware: hasLogged, redirect: '/login' }]} />
          <AuthRoute exact path="/review" component={Review} middlewares={[{ middleware: hasLogged, redirect: '/login' }]} />
          <AuthRoute exact path="/donate" component={Donate} middlewares={[{ middleware: hasLogged, redirect: '/login' }]} />
          <AuthRoute exact path="/home" component={Home} middlewares={[{ middleware: hasLogged, redirect: '/login' }]} />
          {/* <Route exact path="/" component={Home} /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}