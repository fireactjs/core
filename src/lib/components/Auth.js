import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/functions";

export const AuthContext = React.createContext();

export const AuthProvider = ({firebaseConfig, children}) => {

    const firebaseApp = firebase.initializeApp(firebaseConfig);

    // authorized user state
    const [authUser, setAuthUser] = useState(
        {
            'user': null,
            'checked': false
        }
    );

    

    return (
        <AuthContext.Provider value={{
            authUser, setAuthUser, firebaseApp
        }}>
            {children}
        </AuthContext.Provider>
    )
}