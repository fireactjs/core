import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const MainMenu = ({profileUrl}) => {
    return (
        <List component="nav">
            <NavLink to="/" style={{textDecoration:'none'}}>
                <ListItem button key="home">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary={<Typography color="textPrimary">My Accounts</Typography>} />
                </ListItem>
            </NavLink>
            {profileUrl && [
                <Divider />,
                <NavLink to={profileUrl} style={{textDecoration:'none'}}>
                    <ListItem button key="profile">
                        <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                        <ListItemText primary={<Typography color="textPrimary">My Profile</Typography>} />
                    </ListItem>
                </NavLink>
            ]}
        </List>
    )
}