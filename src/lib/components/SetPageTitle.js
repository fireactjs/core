import React, { useContext, useEffect } from "react"
import { AuthContext } from "./Auth"

export const SetPageTitle = ({title}) => {
    const { brand } = useContext(AuthContext);
    useEffect(() => {
        document.title = brand?(`${title} - ${brand}`):(title);
    }, [title, brand]);
    return (<></>);
}