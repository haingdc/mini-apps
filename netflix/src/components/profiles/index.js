import React from 'react';
import { Container, Title, List, Item, Picture, Name } from './styles/profiles';

export default function Profiles(props) {
  var { children, ...rest } = props;
  return <Container {...rest}>{children}</Container>;
}

Profiles.Title = function ProfilesTitle(props) {
  var { children, ...rest } = props;
  return <Title {...rest}>{children}</Title>;
}

Profiles.List = function ProfilesList(props) {
  var { children, ...rest } = props;
  return <List {...rest}>{children}</List>;
}

Profiles.User = function ProfilesUser(props) {
  var { children, ...rest } = props;
  return <Item {...rest}>{children}</Item>;
}

Profiles.Picture = function ProfilesPicture(props) {
  var { src, ...rest } = props;
  return <Picture {...rest} src={src ? `/images/users/${src}.png` : `/images/misc/loading.gif`} />
}

Profiles.Name = function ProfilesName(props) {
  var { children, ...rest } = props;
  return <Name {...rest}>{children}</Name>;
}