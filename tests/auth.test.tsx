import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../src/context/AuthContext';
import LoginPage from '../src/component/LoginPage';

// Mock next-auth
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: null, status: 'unauthenticated' };
    }),
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
});

// Mock firebase
jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({
      signOut: jest.fn(),
    })),
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback(null);
      return jest.fn();
    }),
    GoogleAuthProvider: jest.fn(() => ({})),
    signInWithPopup: jest.fn(),
  };
});

describe('LoginPage', () => {
  it('renders login options when not authenticated', () => {
    render(
      <SessionProvider>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </SessionProvider>
    );
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Firebase Authentication')).toBeInTheDocument();
    expect(screen.getByText('Auth.js Authentication')).toBeInTheDocument();
  });
});