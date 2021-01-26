import React from 'react';
import { render } from 'react-dom';
import App from './app';
import 'normalize.css';
import { GlobalStyles } from './global-styles';
import Cursor from './utils/cursor';
import { firebase } from './lib/firebase.prod';
import { FirebaseContext } from './context/firebase';

render(
  <>
    <FirebaseContext.Provider value={{ firebase }}>
      <GlobalStyles />
      <App />
      <svg className="cursor" width="30" height="30" viewBox="0 0 30 30">
        <circle className="cursor__inner" cx="15" cy="15" r="7.5" />
      </svg>
    </FirebaseContext.Provider>
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