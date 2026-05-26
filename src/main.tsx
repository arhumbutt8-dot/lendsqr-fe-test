import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { UsersProvider } from '@/context/UsersContext';
import { App } from './App';
import '@/styles/global.scss';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in the document.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <App />
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
