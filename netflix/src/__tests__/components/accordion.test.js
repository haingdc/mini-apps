import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FAQs from  '../../fixtures/faqs.json';
import { FaqsContainer } from '../../containers/faqs';

describe('<Accordion />', () => {
  it('renders the <Accordion /> with populated data', () => {
    var { container, getByText } = render(
      <FaqsContainer />
    );

    expect(getByText('Frequently Asked Questions')).toBeTruthy();
    expect(getByText('What is Netflix?')).toBeTruthy();
    expect(getByText('How much does Netflix cost?')).toBeTruthy();
    expect(getByText('Where can I watch?')).toBeTruthy();
    expect(getByText('How do I cancel?')).toBeTruthy();
    expect(getByText('What can I watch on Netflix?')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('opens and closes the <Accordion /> component', () => {
    var { container, queryByText } = render(
      <FaqsContainer />
    );

    var whatIsNetflixBodyText = "Netflix is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want, without a single advert – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week!";

    console.log(queryByText(whatIsNetflixBodyText))
    expect(queryByText(whatIsNetflixBodyText)).toBeFalsy();
    fireEvent.click(queryByText('What is Netflix?'));
    expect(queryByText(whatIsNetflixBodyText)).toBeTruthy();

    fireEvent.click(queryByText('What is Netflix?'));
    expect(queryByText(whatIsNetflixBodyText)).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });
});