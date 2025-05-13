import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './component/LoginPage';

export default function App() {
  return (
    <SessionProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
          <LoginPage />
        </div>
      </AuthProvider>
    </SessionProvider>
  );
}
