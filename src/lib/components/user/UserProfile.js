import { Grid, List, ListItem, Box, Avatar, Typography, Divider, Paper, Container } from "@mui/material";
import React from "react";
import { AuthContext } from "../Auth";
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from "react-router-dom";

export const UserProfile = ({pathnames}) => {
    const navigate = useNavigate();

    return (
        <AuthContext.Consumer>
            {context => (
                <Container maxWidth="md">
                    <Paper>
                        <List component={"nav"}>
                            <ListItem>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Box p={1}><strong>AVATAR</strong><br /><Typography color="textSecondary">Update via social login</Typography></Box>
                                        <Box p={1}></Box>
                                    </Grid>
                                    <Grid item sx={{flexDirection: "column", display: "flex", justifyContent: "center"}}>
                                        <Avatar alt={context.authUser.user.displayName} src={context.authUser.user.photoURL?(context.authUser.user.photoURL):("https://ui-avatars.com/api/?name="+encodeURI(context.authUser.user.displayName)+"&background=007bff&size=64&color=f8f9fc")} style={{height:'64px',width:'64px'}} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={() => {
                                navigate(pathnames.UserUpdateName);
                            }}>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Box p={1}><strong>NAME</strong><br />{context.authUser.user.displayName}</Box>
                                    </Grid>
                                    <Grid item sx={{flexDirection: "column", display: "flex", justifyContent: "center"}}>
                                        <EditIcon />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={() => {
                                navigate(pathnames.UserUpdateEmail);
                            }}>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Box p={1}><strong>EMAIL</strong><br />{context.authUser.user.email}</Box>
                                    </Grid>
                                    <Grid item sx={{flexDirection: "column", display: "flex", justifyContent: "center"}}>
                                        <EditIcon />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Box p={1}><strong>EMAIL VERIFIED</strong><br />{(context.authUser.user.emailVerified?" Verified":"Unverified email")}</Box>
                                    </Grid>
                                    <Grid item sx={{flexDirection: "column", display: "flex", justifyContent: "center"}}>
                                    {context.authUser.user.emailVerified?(<VerifiedUserIcon />):(<SendIcon />)}
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Box p={1}><strong>PASSWORD</strong><br />••••••••</Box>
                                    </Grid>
                                    <Grid item sx={{flexDirection: "column", display: "flex", justifyContent: "center"}}>
                                        <EditIcon />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <Grid container spacing={1}>
                                    <Grid container item xs={12} md={4}>
                                        <Box p={1}><Typography color="error"><strong>DELETE ACCOUNT</strong></Typography></Box>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                    </Paper>
                </Container>
            )}
        </AuthContext.Consumer>
    )
}