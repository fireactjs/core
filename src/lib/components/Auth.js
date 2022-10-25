import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Navigate, Outlet } from "react-router-dom";

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

export const AuthRoutes = ({ signInPath }) => {
    const { authUser } = useContext(AuthContext);

    if(authUser.checked){
        console.log(authUser);
        if(authUser.user !== null){
            return <Outlet />
        }else{
            return <Navigate to={signInPath+"?re="+document.location.pathname+document.location.search+document.location.hash} />
        }
    }else{
        return <div>Loading...</div>
    }
}