import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Prevent render race conditions

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false); // ✅ Wait for auth check before rendering children
    });

    return () => unsubscribe();
  }, []);

  // Auth methods
  const createNewUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const userLogin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const updateUserProfile = updatedData =>
    updateProfile(auth.currentUser, updatedData);

  const passwordResetEmail = email =>
    sendPasswordResetEmail(auth, email);

  const logOut = () => signOut(auth);

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
  const signInWithGithub = () => signInWithPopup(auth, githubProvider);

  const authInfo = {
    user,
    setUser,
    loading,
    createNewUser,
    userLogin,
    updateUserProfile,
    passwordResetEmail,
    logOut,
    signInWithGoogle,
    signInWithGithub
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children} {/* ✅ Only render children after auth check */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
