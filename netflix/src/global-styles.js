import { createGlobalStyle } from 'styled-components';

export var GlobalStyles = createGlobalStyle`
  html, body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
    background-color: black;
    color: #333;
    font-size: 16px;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --cursor-stroke: #fff;
    --cursor-fill: none;
    --cursor-stroke-width: 1px;
  }

  .cursor {
    display: none;
  }

  @media (any-pointer: fine) {
    .cursor {
      position: fixed;
      top: 0;
      left: 0;
      display: block;
      pointer-events: none;
      z-index: 9999;
    }
    .cursor__inner {
      fill: var(--cursor-fill);
      stroke: var(--cursor-stroke);
      stroke-width: var(--cursor-stroke-width);
      opacity: 1;
    }
    .no-js .cursor {
      display: none;
    }
  }
`;