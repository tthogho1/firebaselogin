import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { AuthProvider } from '../context/AuthContext';
import { SessionProvider } from 'next-auth/react';

// Mock the auth context
jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    authJsSession: null,
    loading: false,
    error: null,
    signInWithAuthJs: jest.fn(),
    signOutFromAuthJs: jest.fn(),
    isAuthenticated: false,
    authProvider: null,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('LoginPage', () => {
  test('renders login options when not authenticated', () => {
    render(
      <SessionProvider>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </SessionProvider>
    );
    
    // Check that the login page title is rendered
    expect(screen.getByText('Login')).toBeInTheDocument();
    
    // Check that both authentication options are displayed
    expect(screen.getByText('Firebase Authentication')).toBeInTheDocument();
    expect(screen.getByText('Auth.js Authentication')).toBeInTheDocument();
    
    // Check that both login buttons are rendered
    expect(screen.getByText('Login with Google (Firebase)')).toBeInTheDocument();
    expect(screen.getByText('Login with Google (Auth.js)')).toBeInTheDocument();
  });
});