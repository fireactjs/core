import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const MainMenu = ({profileUrl}) => {
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