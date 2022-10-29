import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { getAuth, updateProfile } from "firebase/auth";

export const UserUpdateName = ({pathnames}) => {
    const [fullname, setFullname] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const title = "Change Name";
    const navigate = useNavigate();

    const auth = getAuth();

    return (
        <Container maxWidth="md">
            <SetPageTitle title={title} />
            <Paper>
                <Box p={2}>
                    <Typography component="h1" variant="h4" align="center">{title}</Typography>
                </Box>
                {error !== null &&
                    <Box p={2}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                }
                {success &&
                    <Box p={2}>
                        <Alert severity="success">Your name has been updated successfully.</Alert>
                    </Box>
                }
                <Box p={2}>
                    <TextField required fullWidth name="fullname" label="Full Name" autoComplete="name" type="text" margin="normal" onChange={e => setFullname(e.target.value)} />
                </Box>
                <Box p={2}>
                    <Grid container>
                        <Grid item xs>
                            <Button type="button" color="secondary" variant="outlined" disabled={processing} onClick={() => {
                                navigate(pathnames.UserProfile);
                            }}>Back</Button>
                        </Grid>
                        <Grid item>
                            <Button type="button" variant="contained" disabled={processing} onClick={() => {
                                setProcessing(true);
                                setSuccess(false);
                                setError(null);
                                if(fullname.trim() === ""){
                                    setError('Your full name is required.');
                                    setProcessing(false);
                                }else{
                                    updateProfile(auth.currentUser, {displayName: fullname}).then(() => {
                                        setSuccess(true);
                                        setProcessing(false);
                                    }).catch(error => {
                                        switch(error.code){
                                            case "auth/requires-recent-login":
                                                setError("This operation is sensitive and requires recent authentication. Log in again before retrying this request.");
                                                break;
                                            default:
                                                setError(error.message);
                                                break;
                                        }
                                        setProcessing(false);
                                    });
                                }
                            }}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}