import React, { useState, useContext} from 'react';
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../context/firebase';
import { FooterContainer } from '../containers/footer';
import { HeaderContainer } from '../containers/header';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';

export default function Signup() {
  var history = useHistory();
  var { firebase } = useContext(FirebaseContext);
  var [firstName , setFirstName ] = useState('');
  var [password  , setPassword  ] = useState('');
  var [email     , setEmail     ] = useState('');
  var [error     , setError     ] = useState('');

  var isInvalid = firstName === '' || password === '' || email === '';
  function signUp(event) {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user
        .updateProfile({
          displayName: firstName,
          photoURL: Math.floor(Math.random() * 5) + 1,
        })
        .then(() => {
          history.push(ROUTES.BROWSE);
        })
      })
      .catch(error => {
        setFirstName('');
        setPassword('');
        setEmail('');
        setError(error.message);
      });
  }
  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error data-testid="error">{error}</Form.Error>}
          <Form.Base onSubmit={signUp} method="POST">
            <Form.Input
              placeholder="First Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Form.Input
              placeholder="Email address"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Form.Input
              type="password"
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type="submit" data-testid="sign-up">
              Sign Up
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            Already a user?&nbsp;
            <Form.Link to="/signin">Sign in now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  )
}