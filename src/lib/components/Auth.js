import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate, Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { FireactContext } from "./Fireact";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

    // authorized user state
    const [authUser, setAuthUser] = useState(
        {
            user: null,
            data: {},
            checked: false
        }
    );

    const { config } = useContext(FireactContext);

    const firebaseApp = firebase.initializeApp(config.firebaseConfig);

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
    },[firebaseApp]);

    return (
        <AuthContext.Provider value={{
            authUser, setAuthUser, firebaseApp
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthRoutes = ({ loader }) => {
    const { authUser } = useContext(AuthContext);
    const { config } = useContext(FireactContext);
    const signInPath = config.pathnames.SignIn;

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