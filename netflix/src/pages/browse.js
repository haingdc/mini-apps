import React from 'react';
import { useContent } from '../hooks';
import selectionFilter from '../utils/selection-filter';

export default function Browse() {
  var { series } = useContent('series');
  var { films } = useContent('films');
  var slides = selectionFilter({ series, films });
  console.log(slides);

  return <p>Browse</p>
}