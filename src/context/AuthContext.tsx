import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { Session } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';

// Define the shape of our auth context
interface AuthContextType {
  user: FirebaseUser | null;
  authJsSession: Session | null;
  loading: boolean;
  error: string | null;
  signInWithAuthJs: () => Promise<void>;
  signOutFromAuthJs: () => Promise<void>;
  isAuthenticated: boolean;
  authProvider: 'firebase' | 'authjs' | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  authJsSession: null,
  loading: true,
  error: null,
  signInWithAuthJs: async () => {},
  signOutFromAuthJs: async () => {},
  isAuthenticated: false,
  authProvider: null,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get session from next-auth
  const { data: authJsSession, status } = useSession();
  
  // Determine if user is authenticated through either method
  const isAuthenticated = !!user || !!authJsSession;
  
  // Determine which auth provider is being used
  const authProvider = user ? 'firebase' : authJsSession ? 'authjs' : null;

  useEffect(() => {
    // Monitor Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    }, (error) => {
      console.error('Firebase auth error:', error);
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auth.js sign in function
  const signInWithAuthJs = async () => {
    try {
      await signIn('google', { callbackUrl: window.location.origin });
    } catch (error: any) {
      console.error('Auth.js sign in error:', error);
      setError('Failed to sign in with Auth.js');
    }
  };

  // Auth.js sign out function
  const signOutFromAuthJs = async () => {
    try {
      await signOut({ callbackUrl: window.location.origin });
    } catch (error: any) {
      console.error('Auth.js sign out error:', error);
      setError('Failed to sign out from Auth.js');
    }
  };

  const value = {
    user,
    authJsSession,
    loading: loading || status === 'loading',
    error,
    signInWithAuthJs,
    signOutFromAuthJs,
    isAuthenticated,
    authProvider,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};