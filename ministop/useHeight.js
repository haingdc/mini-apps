export default function useHeight({ on = true } = {}) {
  const ref = React.useRef();
  const [height, set] = React.useState(0);
  const heightRef = React.useRef(height);
  const [ro] = React.useState(
    () =>
      new ResizeObserver(_packet => {
        if (ref.current && heightRef.current !== ref.current.offsetHeight) {
          heightRef.current = ref.current.offsetHeight;
          set(ref.current.offsetHeight);
        }
      })
  );
  React.useLayoutEffect(() => {
    if (on && ref.current) {
      set(ref.current.offsetHeight);
      ro.observe(ref.current, {});
    }
    return () => ro.disconnect();
  }, [on, ref.current]);

  return [ref, height];
}