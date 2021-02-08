import "@reach/dialog/styles.css";
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { Home, Browse, SignIn, SignUp } from './pages';
import { useAuthListener } from './hooks';
import { Route } from 'react-router-dom';
import Experimental from './pages/experimental';
import { CardPage } from './pages/card'
import { Ministop } from './pages/mini-stop';

function App() {
  var user = useAuthListener();
  // user = undefined;
  return (
    <Router>
      <Switch>
        <IsUserRedirect user={user} path={ROUTES.SIGN_UP} loggedInPath={ROUTES.BROWSE} exact >
          <SignUp />
        </IsUserRedirect>
        <IsUserRedirect user={user} path={ROUTES.SIGN_IN} loggedInPath={ROUTES.BROWSE} exact >
          <SignIn />
        </IsUserRedirect>
        <ProtectedRoute user={user} path={ROUTES.BROWSE} exact>
          <Browse />
        </ProtectedRoute>
        <IsUserRedirect user={user} path={ROUTES.HOME}    loggedInPath={ROUTES.BROWSE} exact >
          <Home />
        </IsUserRedirect>
        <Route path={ROUTES.EXPERIMENTAL} exact>
          <Experimental />
        </Route>
        <Route path="/card" exact>
          <CardPage></CardPage>
        </Route>
        <Route path="/ministop" exact>
          <Ministop></Ministop>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
