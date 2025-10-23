import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Auth0Provider
  domain="dev-pja2cg0hjy5e0xdr.us.auth0.com"
  clientId="OzH9ffEkSZna458cKFgBcBsuTNHOIeyk"
  redirectUri={window.location.origin}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>

);

/*
  <Auth0Provider
  domain="dev-pja2cg0hjy5e0xdr.us.auth0.com"
  clientId="OzH9ffEkSZna458cKFgBcBsuTNHOIeyk"
  redirectUri={window.location.origin}>
    
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

