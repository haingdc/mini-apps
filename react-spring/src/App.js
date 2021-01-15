import logo from './logo.svg';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './App.css';

export default function App() {
  const [showing, setShowing] = useState(false);

  const fadeStyles = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: showing ? 1 : 0
    }
  });

  return (
    <div>
      <animated.div style={fadeStyles}>
        This content will fade in and fade out
      </animated.div>
      <button onClick={() => setShowing(val => !val)}>Toggle</button>
      <hr />
    </div>
  );
}
