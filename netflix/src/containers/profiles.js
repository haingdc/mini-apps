import React from 'react';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';
import { Frog, Header, Profiles } from '../components';

export function SelectProfileContainer(props) {
  var { user, setProfile } = props;
  return (
    <>
      <Header bg={false}>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
            <Header.TextLink> <Frog.StartButton /> </Header.TextLink>
            <Header.TextLink> <Frog.PauseButton /> </Header.TextLink>
          </Header.Group>
        </Header.Frame>
      </Header>
      <Profiles>
        <Profiles.Title>Who's watching?</Profiles.Title>
        <Profiles.List>
          <Profiles.User
            onClick={() => setProfile({ displayName: user.displayName, photoURL: user.photoURL })}
            data-testid="user-profile"
          >
            <Profiles.Picture src={user.photoURL} />
            <Profiles.Name>{user.displayName}</Profiles.Name>
          </Profiles.User>
        </Profiles.List>
      </Profiles>
    </>
  );
}