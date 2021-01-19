import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@reach/dialog/styles.css";
import "./main-styles.scss";

import { setDefaultClient, Client } from "micro-graphql-react";

const client = new Client({
  endpoint: "https://mylibrary.io/graphql-public",
  fetchOptions: { mode: "cors" }
});

setDefaultClient(client);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
