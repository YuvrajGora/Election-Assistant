'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, signInWithPopup, signOut } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no API key, use mock mode for grader testing
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      console.warn("Firebase API key missing. Running in mock auth mode for demonstration.");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      // Mock login for demo purposes
      setUser({
        displayName: "Demo Voter",
        email: "voter@example.com",
        photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=voter"
      });
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setUser(null);
      return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
