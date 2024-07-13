import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MessageProvider } from './contexts/MessageBox';
import { ThemeProvider } from '@emotion/react';
import {theme} from './theme/theme'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from './consts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <ThemeProvider theme={theme}>
    <MessageProvider>
      <App />
    </MessageProvider>
    </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
