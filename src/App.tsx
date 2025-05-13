import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './component/LoginPage';
import './App.css';

export default function App() {
  return (
    <SessionProvider>
      <AuthProvider>
        <div className="app-container">
          <LoginPage />
        </div>
      </AuthProvider>
    </SessionProvider>
  );
}
