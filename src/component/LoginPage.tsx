import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; // Import Firebase configuration

const googleProvider = new GoogleAuthProvider();

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Monitor changes in user's authentication state
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
        console.log('Logged in user:', authUser);
        // Perform post-login actions here (e.g., redirect)
      } else {
        setUser(null);
        console.log('Not logged in');
      }
    });

    // Detach listener when component is unmounted
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log('Google sign-in successful:', { user, token });
      // The login state is handled by onAuthStateChanged in useEffect
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  if (user) {
    return (
      <div>
        <h1>Logged In</h1>
        <p>Welcome, {user.displayName}!</p>
        <button onClick={() => auth.signOut()}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleSignIn}>Login with Google</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default LoginPage;
