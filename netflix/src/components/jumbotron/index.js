import React from 'react';
import { Inner, Item, Container, Pane, Image, Title, SubTitle } from './styles/jumbotron';

export default function Jumbotron(props) {
  const { children, direction = 'row', ...restProps } = props;
  return (
    <Item {...restProps}>
      <Inner direction={direction}>
        {children}
      </Inner>
    </Item>
  );
}

Jumbotron.Container = function JumbotronContainer(props) {
  var { children, ...restProps } = props;
  return <Container {...restProps}>{children}</Container>;
}

Jumbotron.Pane = function JumbotronContainer(props) {
  var { children, ...restProps } = props;
  return <Pane {...restProps}>{children}</Pane>;
}

Jumbotron.Image = function JumbotronContainer(props) {
  var { ...restProps } = props;
  return <Image {...restProps} />;
}

Jumbotron.Title = function JumbotronContainer(props) {
  var { children, ...restProps } = props;
  return <Title {...restProps}>{children}</Title>;
}

Jumbotron.SubTitle = function JumbotronContainer(props) {
  var { children, ...restProps } = props;
  return <SubTitle {...restProps}>{children}</SubTitle>;
}