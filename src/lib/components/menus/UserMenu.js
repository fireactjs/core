import { Avatar, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { AuthContext } from "../Auth";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export const UserMenu = ({profileUrl, customItems}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    return (
        <AuthContext.Consumer>
            {(context) => (
                <>
                    <IconButton ria-label="account of current user" aria-controls="menu-appbar" onClick={handleMenu} aria-haspopup="true">
                        <Avatar alt={context.authUser.user.displayName} src={context.authUser.user.photoURL?(context.authUser.user.photoURL):("https://ui-avatars.com/api/?name="+encodeURI(context.authUser.user.displayName)+"&background=007bff&size=64&color=f8f9fc")} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        {profileUrl && 
                            [
                            <MenuItem key="profile-menu-item" onClick={(e) => {
                                e.preventDefault();
                                handleClose();
                                navigate(profileUrl);
                            }}>
                                <AccountBoxIcon sx={{marginRight: "10px"}} /> Profile
                            </MenuItem>,
                            <Divider key="profile-menu-divider" />
                            ]
                        }
                        {customItems}
                        <MenuItem onClick={(e)=>{
                            e.preventDefault();
                            handleClose();
                            const auth = getAuth();
                            signOut(auth).then(() => {
                                document.location.href = "/";
                            });
                        }}>
                            <ExitToAppIcon sx={{marginRight: "10px"}} /> Sign Out
                        </MenuItem>
                    </Menu>
                </>
            )}
        </AuthContext.Consumer>
    )
}