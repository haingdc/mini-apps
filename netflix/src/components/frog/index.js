import React, { createContext, useContext, useLayoutEffect, useState } from 'react';
import { Container } from './styles/frog'

export var FrogContext = createContext();

export default function Frog(props) {
  var { mode, animationStartTime } = useContext(FrogContext);
  var [left, setLeft] = useState(55);
  var [top, setTop] = useState(205);
  var [backgroundPosition, setBackgroundPosition] = useState(0);

  useLayoutEffect(() => {
    if (mode === 'play') {
      var timerId = window.requestAnimationFrame(animate);

      function animate(time) {
        var left = (55 + (time - animationStartTime)/10 % 300);
        var top = (205 - 10 * ((time - animationStartTime)/100 % 10) + ((time - animationStartTime)/100 % 10) * ((time - animationStartTime)/100 % 10) );
        var t = (time - animationStartTime)/10 % 100;
        var backgroundPosition = - Math.floor(t / (100/2)) * 60;
        setLeft( left );
        setTop( top );
        setBackgroundPosition( backgroundPosition );
        timerId = window.requestAnimationFrame(animate);
      }
    }

    return () => window.cancelAnimationFrame(timerId);
  }, [ mode ]);
  return <Container backgroundPosition={backgroundPosition} left={left} top={top} />;
}

Frog.Container = function FrogContainer({ children, ...rest }) {
  var [requestId, setRequestId] = useState(0);
  var [animationStartTime, setAnimationStartTime] = useState(0);
  var [mode, setMode] = useState('stop');
  return (
    <FrogContext.Provider
      value={{ mode, setMode, requestId, setRequestId, animationStartTime, setAnimationStartTime }}
    >
      {children}
    </FrogContext.Provider>
  );
}

Frog.StartButton = function FrogButton() {
  const { setMode, setAnimationStartTime } = useContext(FrogContext);
  function play() {
    setAnimationStartTime( window.performance.now() );
    setMode('play');
  }
  return <span onClick={play}>Start</span>;
}

Frog.PauseButton = function FrogButton() {
  const { setMode, requestId, setRequestId } = useContext(FrogContext);
  function stop() {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
    setRequestId(0);
    setMode('stop');
  }
  return <span onClick={stop}>Pause</span>;
}