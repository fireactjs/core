import React from "react";

export const FireactContext = React.createContext();

export const FireactProvider = ({config, children}) => {
    return (
        <FireactContext.Provider value={{config}}>
            {children}
        </FireactContext.Provider>
    )
}