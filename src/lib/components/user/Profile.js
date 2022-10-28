import { Grid, List, ListItem, Box, Avatar, Typography, Divider } from "@mui/material";
import React from "react";
import { AuthContext } from "../Auth";
import EditIcon from '@mui/icons-material/Edit';


export const UserProfile = () => {
    return (
        <AuthContext.Consumer>
            {context => (
                <List component={"nav"}>
                    <ListItem>
                        <Grid container spacing={1}>
                            <Grid container item xs={12} md={4}>
                                <Box p={2}><strong>AVATAR</strong><br /><Typography color="textSecondary">Update via social login</Typography></Box>
                            </Grid>
                            <Grid container item xs={12} md={4}>
                                <Box p={2}></Box>
                            </Grid>
                            <Grid container item xs={12} md={4}>
                                <Box p={2} style={{marginLeft: "auto", marginRight: "0px",}}>
                                    <Avatar alt={context.authUser.user.displayName} src={context.authUser.user.photoURL?(context.authUser.user.photoURL):("https://ui-avatars.com/api/?name="+encodeURI(context.authUser.user.displayName)+"&background=007bff&size=64&color=f8f9fc")} style={{height:'64px',width:'64px'}} />
                                </Box>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <Grid container spacing={1}>
                            <Grid container item xs={12} md={4}>
                                <Box p={2}><strong>NAME</strong></Box>
                            </Grid>
                            <Grid container item xs={12} md={4}>
                                <Box p={2}>{context.authUser.user.displayName}</Box>
                            </Grid>
                            <Grid container item xs={12} md={4}>
                                <Box p={2} style={{marginLeft: "auto", marginRight: "0px",}}>
                                    <EditIcon />
                                </Box>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            )}
        </AuthContext.Consumer>
    )
}