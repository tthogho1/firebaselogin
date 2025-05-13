import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; // Import Firebase configuration
import { useAuth } from '../context/AuthContext'; // Import our custom auth context

import '../styles/LoginPage.css'; // We'll create this file later

const googleProvider = new GoogleAuthProvider();

const LoginPage: React.FC = () => {
  const { user, authJsSession, error: authError, signInWithAuthJs, signOutFromAuthJs, authProvider } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Firebase Google sign-in handler
  const handleFirebaseGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log('Firebase Google sign-in successful:', { user, token });
    } catch (err: any) {
      console.error('Firebase Google sign-in error:', err);
      setError(err.message || 'Failed to sign in with Google via Firebase');
    }
  };

  // Auth.js Google sign-in handler
  const handleAuthJsGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithAuthJs();
    } catch (err: any) {
      console.error('Auth.js Google sign-in error:', err);
      setError(err.message || 'Failed to sign in with Google via Auth.js');
    }
  };

  // Handle logout based on which provider is being used
  const handleLogout = async () => {
    if (authProvider === 'firebase') {
      await auth.signOut();
    } else if (authProvider === 'authjs') {
      await signOutFromAuthJs();
    }
  };

  // If user is authenticated with either method, show logged in view
  if (user || authJsSession) {
    const displayName = user?.displayName || authJsSession?.user?.name || 'User';
    const provider = authProvider === 'firebase' ? 'Firebase' : 'Auth.js';
    
    return (
      <div className="login-container logged-in">
        <h1>Logged In</h1>
        <p>Welcome, {displayName}!</p>
        <p className="provider-info">Authenticated with: {provider}</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // If not logged in, show login options
  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-options">
        <div className="login-option">
          <h2>Firebase Authentication</h2>
          <button className="login-button firebase" onClick={handleFirebaseGoogleSignIn}>
            Login with Google (Firebase)
          </button>
        </div>
        
        <div className="login-option">
          <h2>Auth.js Authentication</h2>
          <button className="login-button authjs" onClick={handleAuthJsGoogleSignIn}>
            Login with Google (Auth.js)
          </button>
        </div>
      </div>
      
      {(error || authError) && (
        <p className="error-message">Error: {error || authError}</p>
      )}
    </div>
  );
};

export default LoginPage;
