import { Alert, Grid, List, ListItem, Box, Avatar, Typography, Divider, Paper, Container } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth";
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { FireactContext } from "../Fireact";

export const UserProfile = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [sendVerification, setSendVerification] = useState({
        'success': false,
        'error': null
    })

    const { config } = useContext(FireactContext);
    const pathnames = config.pathnames;

    return (
        <AuthContext.Consumer>
            {context => (
                <Container maxWidth="md">
                    <SetPageTitle title="User Profile" />
                    <Paper>
                        {sendVerification.error !== null &&
                            <Box p={2}>
                                <Alert severity="error">{sendVerification.error}</Alert>
                            </Box>
                        }
                        {sendVerification.success &&
                            <Box p={2}>
                                <Alert severity="success">Please check your email inbox to verify the email address. Refresh this page after you verified your email address.</Alert>
                            </Box>
                        }
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
                            <ListItem button onClick={() => {
                                if(!context.authUser.user.emailVerified){
                                    setSendVerification({
                                        'success': false,
                                        'error': null
                                    });
                                    sendEmailVerification(auth.currentUser).then(() => {
                                        setSendVerification({
                                            'success': true,
                                            'error': null
                                        });
                                    }).catch(error => {
                                        switch(error.code){
                                            case "auth/too-many-requests":
                                                setSendVerification({
                                                    'success': false,
                                                    'error': "We have blocked all requests from this device due to unusual activity. Try again later."
                                                });
                                               break;
                                            default:
                                                setSendVerification({
                                                    'success': false,
                                                    'error': error.message
                                                });
                                                break;
                                        }
                                    });
                                }
                            }}>
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
                            <ListItem button onClick={() => {
                                navigate(pathnames.UserUpdatePassword);
                            }}>
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
                            <ListItem button onClick={() => {
                                navigate(pathnames.UserDelete);
                            }}>
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