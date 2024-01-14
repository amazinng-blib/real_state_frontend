import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';

// import '@mantine/core/dist/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-tyma42jam5zi8k52.us.auth0.com"
      clientId="2K4mgieH3QYf8Iv3FJEQf95N2GVM6aH6"
      authorizationParams={{
        redirect_uri: 'https://real-state-frontend-iota.vercel.app',
      }}
      audience="https://real-state-backend-phi.vercel.app"
      scope="openid profile email"
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
