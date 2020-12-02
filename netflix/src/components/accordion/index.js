import React , { createContext, useState } from 'react';

var ToggleContext = createContext();

export default function Accordion({ children, ...rest }) {
  return (
    <Container {...rest}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordion.Title = function AccordionTitle({ children, ...rest }) {
  return <Title { ...rest }>{ children }</Title>
}

Accordion.Frame = function AccordionFrame({ children, ...rest }) {
  return <Frame { ...rest }>{ children }</Frame>
}

Accordion.Item = function AccordionItem({ children, ...rest }) {
  var [toggleShow, setToggleShow] = useState(false);
  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow}}>
      <Item {...rest}>{ children }</Item>
    </ToggleContext.Provider>
  );
}

Accordion.Header = function AccordionHeader({ children, ...rest }) {
  return <Header { ...rest } onClick{() => setToggle}>{ children }</Header>
}