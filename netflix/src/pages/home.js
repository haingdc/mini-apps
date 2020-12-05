import React from 'react';
import { FaqsContainer } from '../containers/faqs';
import { FooterContainer } from '../containers/footer';
import { HeaderContainer } from '../containers/header';
import { JumbotronContainer } from '../containers/jombotron';

export default function Home () {
  return (
    <>
      <HeaderContainer>
        <p>Hello</p>
      </HeaderContainer>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer/>
    </>
  );
}