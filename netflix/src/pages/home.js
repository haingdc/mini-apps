import React from 'react';
import { FaqsContainer } from '../containers/faqs';
import { FooterContainer } from '../containers/footer';
import { JumbotronContainer } from '../containers/jombotron';

export default function Home () {
  return (
    <>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer/>
    </>
  );
}