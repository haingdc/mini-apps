export function If({children, condition}) {
  if (condition) {
    // render children if the condition is truthy
    return children;
  }

  return null;
}