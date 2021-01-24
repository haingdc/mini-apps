import { useState, useRef, useLayoutEffect } from 'react';
import { useSpring, animated, config, useTransition } from 'react-spring';
import './App.css';

export default function App() {
  const [showing, setShowing] = useState(false);
  const [on, setOn] = useState(false);
  const [elemRef, height] = useHeight(on);

  const slideInStyles = useSpring({
    config: { ...config.stiff },
    from: { opacity: 0, height: 0 },
    to: {
      opacity: showing ? 1 : 0,
      height: showing ? height : 0
    }
  });

  const [list, setList] = useState([]);
  const newItemRef = useRef(null);

  const listTransitions = useTransition(list, {
    config: config.gentle,
    from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    leave: { opacity: 0, height: 0, transform: "translate3d(25%, 0px, 0px)" },
    keys: list.map((item, index) => item.id)
  });

  return (
    <div>
      <button onClick={() => setShowing(val => !val)}>Toggle</button>
      <hr />

      {on ? (
        <animated.div style={{ ...slideInStyles, overflow: "hidden" }}>
          <div ref={elemRef}>
            This content will fade in and fade out with sliding 1

            Where does it come from?

            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

          </div>
        </animated.div>
      ) : undefined}


      {
        !on ? (
          <animated.div style={{ ...slideInStyles, overflow: "hidden" }}>
            <div ref={elemRef}>
              This content will fade in and fade out with sliding 2

              Where does it come from?


              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

            </div>
          </animated.div>
        ) : undefined
      }

      <button onClick={() => setOn(v => !v)}>toggle On</button>

      <hr />
      <h2>Transition Demo</h2>

      <input ref={newItemRef} />
      <button
        onClick={() =>
          setList(list => {
            var newItem = ({
              id: generateId(),
              value: newItemRef.current.value || "<empty>",
            });
            return list.concat(newItem);
          })
        }
      >
        Add item
      </button>
      <button
        onClick={() =>
          setList(list => list.filter((x, i) => i < list.length - 1))
        }
      >
        Remove last item
      </button>
      <ul>
        {listTransitions((styles, item) => (
          <animated.li id={item.id} style={styles}>{item.value}</animated.li>
        ))}
      </ul>
    </div>
  );
}

export function useHeight({ on = true /* no value means on */ } = {}) {
  const elemRef = useRef();
  const [height, setHeight] = useState(0);
  const heightRef = useRef(height);
  const [ro] = useState(function createRO() {
    var roInner = new ResizeObserver(function onResize(entries) {
      if (elemRef.current && elemRef.current.offsetHeight !== heightRef.current) {
        heightRef.current = elemRef.current.offsetHeight;
        setHeight(elemRef.current.offsetHeight);
      }
    });
    return roInner;
  });
  useLayoutEffect(function layout() {
    if (on && elemRef.current) {
      setHeight(elemRef.current.offsetHeight);
      ro.observe(elemRef.current, {});
    }
    return function cleanUp() {
      ro.disconnect();
    };
  }, [on, elemRef.current]);

  return [elemRef, height];
}






function generateId() {
  return Array.from({ length: 10 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
}
