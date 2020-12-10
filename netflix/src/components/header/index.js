import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Feature, FeatureCallOut, Text, ButtonLink, Background, Container, Logo } from './styles/header';

export default function Header(props) {
  var { bg = true, children, ...rest } = props;
  return bg ? <Background {...rest}>{children}</Background> : children;
}

Header.Feature = function HeaderFeature(props) {
  var { children, ...rest } = props;
  return <Feature {...rest}>{children}</Feature>
}

Header.FeatureCallOut = function HeaderFeatureCallOut(props) {
  var { children, ...rest } = props;
  return <FeatureCallOut {...rest}>{children}</FeatureCallOut>
}

Header.Text = function HeaderText(props) {
  var { children, ...rest } = props;
  return <Text {...rest}>{children}</Text>
}

Header.Frame = function HeaderFrame(props) {
  var { children, ...rest } = props;
  return <Container {...rest}>{children}</Container>;
}

Header.Logo = function HeaderLogo(props) {
  var { to, ...rest } = props;
  return (
    <ReactRouterLink to={to}>
      <Logo {...rest} />
    </ReactRouterLink>
  );
}

Header.ButtonLink = function HeaderButtonLink(props) {
  var { children, ...rest } = props;
  return <ButtonLink {...rest}>{children}</ButtonLink>
}