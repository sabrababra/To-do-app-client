import React, { createContext, useEffect, useState } from 'react';
import {getAuth,onAuthStateChanged,signInWithPopup, signOut} from 'firebase/auth';
import app from '../firebase/firebase.config';


export const AuthContext=createContext();
const auth=getAuth(app);

const AuthProvider = ({children}) => {
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(null);

    const googleSignIn = (googleProvider) =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const authInfo={
        googleSignIn,logOut,loading,user
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;