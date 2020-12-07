import React from 'react';
import { Container, Error, Title, Text, TextSmall, Link, Input, Submit, Base } from './styles/form';

export default function Form(props) {
  var { children, rest } = props;
  return <Container {...rest}>{children}</Container>;
}

Form.Error = function FormError(props) {
  var { children, ...rest } = props;
  return <Error {...rest}>{children}</Error>;
}

Form.Base = function FormBase(props) {
  var { children, ...rest } = props;
  return <Base {...rest}>{children}</Base>;
}

Form.Input = function FormInput(props) {
  return <Input {...props} />;
}

Form.Title = function FormTitle(props) {
  var { children, ...rest } = props;
  return <Title {...rest}>{children}</Title>;
}

Form.Text = function FormText(props) {
  var { children, ...rest } = props;
  return <Text {...rest}>{children}</Text>;
}

Form.TextSmall = function FormTextSmall(props) {
  var { children, ...rest } = props;
  return <TextSmall {...rest}>{children}</TextSmall>;
}

Form.Link = function FormLink(props) {
  var { children, ...rest } = props;
  return <Link {...rest}>{children}</Link>;
}

Form.Submit = function FormSubmit(props) {
  var { children, ...rest } = props;
  return <Submit {...rest}>{children}</Submit>;
}