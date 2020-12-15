import React from 'react';
import { Frog } from '../components';
import { BrowseContainer } from '../containers/browse';
import { useContent } from '../hooks';
import selectionFilter from '../utils/selection-filter';

export default function Browse() {
  var { series } = useContent('series');
  var { films } = useContent('films');
  var slides = selectionFilter({ series, films });

  return (
    <>
      <Frog.Container>
        <Frog />
        <BrowseContainer slides={slides} />
      </Frog.Container>
    </>
  );
}