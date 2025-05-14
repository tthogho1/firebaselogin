import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../src/context/AuthContext';
import '../src/index.css';
import '../src/App.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}