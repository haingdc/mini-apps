import React from 'react';
import { Container , Row, Column, Link, Title, Text, Break } from './styles/footer';

export default function Footer({ children, ...rest }) {
  return <Container {...rest}>{ children }</Container>;
}

Footer.Row = function FooterRow({ children, ...rest }) {
  return <Row {...rest}>{ children }</Row>;
}

Footer.Column = function FooterRow({ children, ...rest }) {
  return <Column {...rest}>{ children }</Column>;
}

Footer.Link = function FooterRow({ children, ...rest }) {
  return <Link {...rest}>{ children }</Link>;
}

Footer.Title = function FooterRow({ children, ...rest }) {
  return <Title {...rest}>{ children }</Title>;
}

Footer.Text = function FooterRow({ children, ...rest }) {
  return <Text {...rest}>{ children }</Text>;
}

Footer.Break = function FooterRow({ children, ...rest }) {
  return <Break {...rest}>{ children }</Break>;
}


