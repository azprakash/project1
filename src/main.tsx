// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import './index.css';

// Configure Cognito User Pool connection
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'ap-south-1_RGUJ3bzqY', // Replace with your User Pool ID
      userPoolClientId: '758982998837', // Replace with your Client ID
      loginWith: {
        email: true,
        phone: true,
      }
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
