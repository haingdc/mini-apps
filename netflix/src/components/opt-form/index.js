import React from 'react';
import { Container, Button, Input, Text, Break } from './styles/opt-form';

export default function OptForm(props) {
  var { children, ...rest } = props;
  return <Container {...rest}>{children}</Container>;
}

OptForm.Input = function OptFormInput(props) {
  return <Input {...props} />;
};

OptForm.Button = function OptFormButton(props) {
  var { children, ...rest } = props;
  return (
    <Button {...rest}>
      {children}
      <img src="/images/icons/chevron-right.png" alt="Try Now" />
    </Button>
  );
};

OptForm.Text = function OptFormText(props) {
  var { children, ...rest } = props;
  return <Text {...rest}>{children}</Text>;
}

OptForm.Break = function OptFormBreak(props) {
  return <Break {...props} />;
}