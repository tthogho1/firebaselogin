import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; // Import Firebase configuration
import { useAuth } from '../context/AuthContext'; // Import our custom auth context

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
      <div className="max-w-3xl mx-auto p-8 text-center bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Logged In</h1>
        <p className="text-lg">Welcome, {displayName}!</p>
        <p className="mt-4 italic text-gray-600">Authenticated with: {provider}</p>
        <button 
          className="mt-6 px-6 py-3 bg-logout-red text-white rounded font-medium hover:bg-logout-red-hover transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  // If not logged in, show login options
  return (
    <div className="max-w-3xl mx-auto p-8 text-center bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Login</h1>
      <div className="flex justify-around flex-wrap gap-8">
        <div className="flex-1 min-w-[250px] p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-6 text-lg font-medium text-gray-700">Firebase Authentication</h2>
          <button 
            className="px-6 py-3 bg-firebase-yellow text-gray-800 rounded font-medium hover:bg-firebase-yellow-hover transition-colors"
            onClick={handleFirebaseGoogleSignIn}
          >
            Login with Google (Firebase)
          </button>
        </div>
        
        <div className="flex-1 min-w-[250px] p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-6 text-lg font-medium text-gray-700">Auth.js Authentication</h2>
          <button 
            className="px-6 py-3 bg-authjs-blue text-white rounded font-medium hover:bg-authjs-blue-hover transition-colors"
            onClick={handleAuthJsGoogleSignIn}
          >
            Login with Google (Auth.js)
          </button>
        </div>
      </div>
      
      {(error || authError) && (
        <p className="mt-6 text-logout-red font-medium">Error: {error || authError}</p>
      )}
    </div>
  );
};

export default LoginPage;
