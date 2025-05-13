import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the auth context
jest.mock('./context/AuthContext', () => ({
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

test('renders login page', () => {
  render(<App />);
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});
