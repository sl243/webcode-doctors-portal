import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

const auth = getAuth(app);

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // User Create
    const userCreate = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Google sign in 
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // User Sign In 
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // User Log Out
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    // User update profile
    const updateUserProfile = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }

    // User Manage
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe();
    }, [])


    const AuthInfo = {
        userCreate,
        googleSignIn,
        signIn,
        logOut,
        updateUserProfile,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;