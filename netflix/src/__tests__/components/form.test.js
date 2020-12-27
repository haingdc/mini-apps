import React from 'react';
import { render } from '@testing-library/react';
import { Form } from '../../components';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Form />', () => {
  jest.mock('react-router-dom');
  it('renders the <Form /> with populated data', () => {
    var { container, getByText, getByPlaceholderText } = render(
      <Router>
        <Form>
          <Form.Title>Sign In Now</Form.Title>
          <Form.Base>
            <Form.Input placeholder="Email address" onChange={() => {}} />
            <Form.Input type="password" placeholder="Password" onChange={() => {}} />
            <Form.Submit disabled type="submit">Sign In</Form.Submit>
          </Form.Base>
          <Form.Text>
            New to Netflix?&nbsp;
            <Form.Link to="/signup">Sign up now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </Form.TextSmall>
        </Form>
      </Router>
    );

    expect(getByText("This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.")).toBeTruthy();
    expect(getByText('Sign In Now')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Sign In').disabled).toBeTruthy();
    expect(getByPlaceholderText('Email address')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the <Form /> with an error', () => {
    var { container, getByText, queryByText } = render(
      <Form>
        <Form.Error>Your email address is already being used</Form.Error>
        <Form.Submit type="submit">Sign In</Form.Submit>
      </Form>
    );

    expect(getByText('Your email address is already being used')).toBeTruthy();
    expect(queryByText('Sign In').disabled).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  })
});