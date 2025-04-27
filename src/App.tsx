import React, { useState, useEffect } from 'react';
import LoginPage from './component/LoginPage'; // Update the path to the correct location of LoginPage
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './config/firebaseConfig'; // Update the path to the correct location of firebaseConfig

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{user ? <LoginPage /> : <LoginPage />}</div>;
}
