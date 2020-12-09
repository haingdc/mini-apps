import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { Home, Browse, Signin, Signup } from './pages';
import { useAuthListener } from './hooks';

function App() {
  var user = useAuthListener();
  // user = undefined;
  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          path={ROUTES.SIGN_UP}
          loggedInPath={ROUTES.BROWSE}
          exact
        >
          <Signup />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          path={ROUTES.SIGN_IN}
          loggedInPath={ROUTES.BROWSE}
          exact
        >
          <Signin />
        </IsUserRedirect>
        <ProtectedRoute user={user} path={ROUTES.BROWSE} exact>
          <Browse />
        </ProtectedRoute>
        <IsUserRedirect
          user={user}
          path={ROUTES.HOME}
          loggedInPath={ROUTES.BROWSE}
          exact
        >
          <Home />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
}

export default App;
