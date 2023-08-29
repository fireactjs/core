import React, { useEffect, useState, useContext } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { FireactContext } from "./Fireact";
import { getFunctions } from "firebase/functions";

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
    const [firebaseApp, setFirebaseApp] = useState(null);
    const [authInstance, setAuthInstance] = useState(null);
    const [firestoreInstance, setFirestoreInstance] = useState(null);
    const [functionsInstance, setFunctionsInstance] = useState(null);

    useEffect(() => {
        const app = initializeApp(config.firebaseConfig);
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        const functions = getFunctions(app);

        setFirebaseApp(app);
        setAuthInstance(auth);
        setFirestoreInstance(firestore);
        setFunctionsInstance(functions);
    
        onAuthStateChanged(auth, (user) => {
            if(user !== null){
                user.getIdToken().then(token => {
                    const userDoc = doc(firestore, 'users', user.uid);
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
    },[config.firebaseConfig]);

    return (
        <AuthContext.Provider value={{
            authUser, setAuthUser, firebaseApp, authInstance, firestoreInstance, functionsInstance
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