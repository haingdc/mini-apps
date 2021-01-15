import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

export default function App() {
  const [showing, setShowing] = useState(false);
  return (
    <div>
      <div style={{ opacity: showing ? 1 : 0 }}>
        This content will fade in and fade out
      </div>
      <button onClick={() => setShowing(val => !val)}>Toggle</button>
      <hr />
    </div>
  );
}
