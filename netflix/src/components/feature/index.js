import React from 'react';
import { Container, Title, SubTitle } from './styles/feature';

export default function Feature(props) {
  var { children, ...rest } = props;
  return <Container {...props}>{children}</Container>;
}

Feature.Title = function FeatureTitle(props) {
  var { children, ...rest } = props;
  return <Title {...rest}>{children}</Title>;
}

Feature.SubTitle = function SubFeatureTitle(props) {
  var { children, ...rest } = props;
  return <SubTitle {...rest}>{children}</SubTitle>;
}
