import React from 'react';
import { useContent } from '../hooks';

export default function Browse() {
  var { series } = useContent('series');
  var { films } = useContent('films');
  console.log({series, films});
  return <p>Browse</p>
}