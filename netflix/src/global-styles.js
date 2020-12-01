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
`;