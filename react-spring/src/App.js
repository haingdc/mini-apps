import logo from './logo.svg';
import { useState, useRef, useLayoutEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './App.css';

export default function App() {
  const [showing, setShowing] = useState(false);
  const [heightRef, height] = useHeight();

  const slideInStyles = useSpring({
    from: { opacity: 0, height: 0 },
    to: {
      opacity: showing ? 1 : 0,
      height: showing ? height : 0
    }
  });

  return (
    <div>
      <animated.div style={{ ...slideInStyles, overflow: "hidden" }}>
        <div ref={heightRef}>
          This content will fade in and fade out with sliding

          Where does it come from?

          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

        </div>
      </animated.div>
      <button onClick={() => setShowing(val => !val)}>Toggle</button>
      <hr />
    </div>
  );
}

export function useHeight({ on = true /* no value means on */ } = {}) {
  const ref = useRef();
  const [height, set] = useState(0);
  const heightRef = useRef(height);
  const [ro] = useState(
    () =>
      new ResizeObserver(packet => {
        if (ref.current && heightRef.current !== ref.current.offsetHeight) {
          heightRef.current = ref.current.offsetHeight;
          set(ref.current.offsetHeight);
        }
      })
  );
  useLayoutEffect(() => {
    if (on && ref.current) {
      set(ref.current.offsetHeight);
      ro.observe(ref.current, {});
    }
    return () => ro.disconnect();
  }, [on, ref.current]);

  return [ref, height];
}