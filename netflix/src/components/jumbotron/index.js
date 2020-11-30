import React from 'react';
import { Inner, Container } from './styles/jumbotron';

export default function Jumbotron(props) {
  const { children, direction = 'row', ...restProps } = props;
  return (
    <Inner direction={direction}>{children}</Inner>
  );
}

Jumbotron.Container = function JumbotronContainer(props) {
  var { children, ...restProps } = props;
  return <Container {...restProps}>{children}</Container>;
}