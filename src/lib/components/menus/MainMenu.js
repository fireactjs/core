import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { FireactContext } from "../Fireact";

export const MainMenu = () => {
    const { config } = useContext(FireactContext);
    const pathnames = config.pathnames;
    const profileUrl = pathnames.UserProfile;
    return (
        <List component="nav">
            <NavLink to="/" style={{textDecoration:'none'}} key="home">
                <ListItemButton>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary={<Typography color="textPrimary">Home</Typography>} />
                </ListItemButton>
            </NavLink>
            {profileUrl && [
                <Divider key="profile-divider"/>,
                <NavLink to={profileUrl} style={{textDecoration:'none'}} key="profile">
                    <ListItemButton>
                        <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                        <ListItemText primary={<Typography color="textPrimary">My Profile</Typography>} />
                    </ListItemButton>
                </NavLink>
            ]}
        </List>
    )
}