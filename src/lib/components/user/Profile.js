import { List } from "@mui/material";
import React from "react";
import { AuthContext } from "../Auth";

export const UserProfile = () => {
    return (
        <AuthContext.Consumer>
            {context => (
                <List component={"nav"}>

                </List>
            )}
        </AuthContext.Consumer>
    )
}