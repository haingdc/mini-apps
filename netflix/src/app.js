import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { IsUserRedirect } from './helpers/routes';
import { Home, Browse, Signin, Signup } from './pages';

function App() {
  var user = {};
  return (
    <Router>
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
      <IsUserRedirect
        user={user}
        path={ROUTES.SIGN_UP}
        loggedInPath={ROUTES.BROWSE}
      >
        <Signup />
      </IsUserRedirect>
      <IsUserRedirect
        user={user}
        path={ROUTES.SIGN_IN}
        loggedInPath={ROUTES.BROWSE}
      >
        <Signin />
      </IsUserRedirect>
      <Route exact path="/browse">
        <Browse />
      </Route>
    </Router>
  );
}

export default App;
