import React , { createContext, useContext, useState } from 'react';
import { Container, Title, Frame, Item, Inner, Header, Body } from './styles/accordion';

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
  var { toggleShow, setToggleShow } = useContext(ToggleContext);
  return (
    <Header
      { ...rest }
      onClick={() => setToggleShow(toggleShow => !toggleShow)}
      >
      {children}
      {toggleShow ?
        <img src="/images/icons/close-slim.png" alt="Close" /> :
        <img src="/images/icons/add.png" alt="Open" />
      }
    </Header>
  );
}

Accordion.Body = function AccordionBody({ children, ...rest }) {
  var { toggleShow } = useContext(ToggleContext);
  return toggleShow ? <Body {...rest}>{children}</Body> : null;
}