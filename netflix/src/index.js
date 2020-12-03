import React from 'react';
import { render } from 'react-dom';
import App from './app';
import 'normalize.css';
import { GlobalStyles } from './global-styles';
import Cursor from './utils/cursor';

render(
  <>
    <GlobalStyles />
    <App />
    <svg class="cursor" width="30" height="30" viewBox="0 0 30 30">
      <circle class="cursor__inner" cx="15" cy="15" r="7.5" />
    </svg>
  </>,
  document.getElementById('root')
);

// Initialize custom cursor
const cursor = new Cursor(document.querySelector('.cursor'));
// Mouse effects on all links and buttons
[...document.querySelectorAll('a, .gallery__item-more, .back')].forEach(link => {
  link.addEventListener('mouseenter', () => cursor.enter());
  link.addEventListener('mouseleave', () => cursor.leave());
});