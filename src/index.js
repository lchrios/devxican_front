import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { Auth0Provider } from "@auth0/auth0-react";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Auth0Provider
    domain="eel-tec.auth0.com"
    clientId={process.env.REACT_APP_AUTH0_CLIENT}
    redirectUri={process.env.REACT_APP_CALLBACK_URL}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
