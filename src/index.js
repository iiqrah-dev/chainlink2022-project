import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";



ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId="1nQ2ns2B8ol4A85mY7L6azEOr1DkofNIcgko3Yfv" serverUrl="https://had3wrolmufr.usemoralis.com:2053/server">
          <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
