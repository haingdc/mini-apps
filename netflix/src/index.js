import React from 'react';
import { render } from 'react-dom';
import App from './app';
import 'normalize.css';
import { GlobalStyles } from './global-styles';
import Cursor from './utils/cursor';
import { firebase } from './lib/firebase.prod';
import { FirebaseContext } from './context/firebase';
// import CAF from 'caf';

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













// var token = new CAF.cancelToken();

// // wrap a generator to make it look like a normal async
// // function that when called, returns a promise.
// var main = CAF( function *main(signal,url){
//     var resp = yield fetch( url );

//     // want to be able to cancel so we never get here?!?
//     console.log( resp );
//     return resp;
// } );

// // run the wrapped async-looking function, listen to its
// // returned promise
// main( token.signal, "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2" )
// .then( onResponse, onCancelOrError );

// // only wait 5 seconds for the ajax request!
// setTimeout( function onElapsed(){
//     token.abort( "Request took too long!" );
// }, 5000 );

// function onResponse(res) {
//   console.log({ res })
// }

// function onCancelOrError(v) {
//   console.log({ v })
// }