import React from 'react';
import ReactDOM from 'react-dom/client';

// OAuth
import { GoogleOAuthProvider } from '@react-oauth/google';

// Router
import { BrowserRouter } from 'react-router-dom';

// Blocks
import App from './blocks/App';

// Components
import { UserProvider } from './components/user/use-user-context';

// Styles
import './assets/scss/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="406964939970-o6jsp1hbf3gvtp5b010tf903npskda6v.apps.googleusercontent.com">
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
