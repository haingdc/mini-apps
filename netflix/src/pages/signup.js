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
  function handleSignup(event) {
    event.preventDefault();
  }
  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
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
          <Form.Submit disabled={isInvalid} type="submit">
            Sign Up
          </Form.Submit>
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