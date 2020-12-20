import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectProfileContainer } from '../../containers/profiles';
import { BrowserRouter as Router } from 'react-router-dom';
import { Frog } from '../../components';

describe('<Profiles />', () => {
  it('renders the <Profiles />', () => {
    const user = { displayName: 'Karl', photoURL: 'profile.png' };
    const setProfile = jest.fn();
    const { getByTestId } = render(
      <Router>
        <Frog.Container>
          <SelectProfileContainer user={user} setProfile={setProfile} />
        </Frog.Container>
      </Router>
    );

    fireEvent.click(getByTestId('user-profile'));
    expect(setProfile).toHaveBeenCalled();
  });
});
