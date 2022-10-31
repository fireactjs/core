import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate, Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({firebaseConfig, brand, children}) => {

    // authorized user state
    const [authUser, setAuthUser] = useState(
        {
            user: null,
            data: {},
            checked: false
        }
    );

    const firebaseApp = firebase.initializeApp(firebaseConfig);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if(user !== null){
                user.getIdToken().then(token => {
                    const db = getFirestore(firebaseApp);
                    const userDoc = doc(db, 'users', user.uid);
                    setAuthUser(prevState => ({
                        ...prevState,
                        user: user,
                        checked: true
                     }));
                    setDoc(userDoc, {
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email
                    },{merge: true});
                });
            }else{
                setAuthUser(prevState => ({
                    ...prevState,
                    user: null,
                    checked: true
                 }));
            }
        });
    },[firebaseConfig, firebaseApp]);

    return (
        <AuthContext.Provider value={{
            authUser, setAuthUser, firebaseApp, brand
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthRoutes = ({ signInPath, loader }) => {
    const { authUser } = useContext(AuthContext);

    if(authUser.checked){
        if(authUser.user !== null){
            return <Outlet />
        }else{
            return <Navigate to={signInPath+"?re="+document.location.pathname+document.location.search+document.location.hash} />
        }
    }else{
        return (
            <Box mt={10}>
                <Container maxWidth="sm">
                    <Box component="span" m={5} textAlign="center">
                        {loader}
                    </Box>
                </Container>
            </Box>
        )
    }
}