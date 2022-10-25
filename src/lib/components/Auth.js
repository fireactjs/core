import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/functions";

export const AuthContext = React.createContext();

export const AuthProvider = ({firebaseConfig, children}) => {

    // authorized user state
    const [authUser, setAuthUser] = useState(
        {
            user: null,
            data: {},
            checked: false
        }
    );

    useEffect(() => {
        const firebaseApp = firebase.initializeApp(firebaseConfig);

        firebaseApp.auth().onAuthStateChanged((user) => {
            if(user !== null){
                user.getIdToken().then(token => {
                    setAuthUser(prevState => ({
                       ...prevState,
                       user: user,
                       checked: true
                    }));
                });
            }else{
                setAuthUser(prevState => ({
                    ...prevState,
                    user: null,
                    checked: true
                 }));
            }
        });
    },[firebaseConfig]);

    return (
        <AuthContext.Provider value={{
            authUser, setAuthUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}