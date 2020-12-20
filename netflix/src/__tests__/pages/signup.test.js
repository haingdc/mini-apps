import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { SignUp } from '../../pages';
import { FirebaseContext } from '../../context/firebase';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const firebase = {
  auth: () => ({
    createUserWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({ user: { updateProfile: jest.fn(() => Promise.resolve('I am signed up!')) } })
    ),
  }),
};

const firebaseError = {
  auth: () => ({
    createUserWithEmailAndPassword: jest.fn(() => Promise.reject({ message: 'error' })),
  }),
};

describe('<SignUp />', () => {
  it('renders the sign up page with a form submission', async () => {
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'Hopea' } });
      await fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'hopea@gmail.com' } });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.click(getByTestId('sign-up'));

      expect(getByPlaceholderText('Email address').value).toBe('hopea@gmail.com');
      expect(getByPlaceholderText('Password').value).toBe('password');
      expect(queryByTestId('error')).toBeFalsy();
    });
  });


  it('renders the sign up page with an error', async () => {
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase: firebaseError }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'Hopea' } });
      await fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'hopea@gmail.com' } });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.click(getByTestId('sign-up'));

      await waitFor(() => {
        expect(getByPlaceholderText('Email address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      }, { timeout: 100 });

    });
  });
});
