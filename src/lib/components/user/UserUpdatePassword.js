import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { getAuth, updatePassword } from "firebase/auth";
import { FireactContext } from "../Fireact";

export const UserUpdatePassword = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const title = "Change Password";
    const navigate = useNavigate();

    const auth = getAuth();

    const { config } = useContext(FireactContext);
    const pathnames = config.pathnames;

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
                        <Alert severity="success">Your password has been updated successfully.</Alert>
                    </Box>
                }
                <Box p={2}>
                    <TextField required fullWidth name="password" label="New Password" autoComplete="new-password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
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
                                const passwordNumericRegex = /\d+/;
                                const passwordUppercaseRegex = /[A-Z]+/;
                                const passwordLowercaseRegex = /[a-z]+/;
                                const passwordSpecialRegex = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/;
                                setProcessing(true);
                                setSuccess(false);
                                setError(null);
                                if(!passwordNumericRegex.test(String(password)) ||
                                !passwordUppercaseRegex.test(String(password)) ||
                                !passwordLowercaseRegex.test(String(password)) ||
                                !passwordSpecialRegex.test(String(password)) || password.length < 8){
                                    setError('The password must contain at least 8 characters with letters (both uppercase and lowercase), numbers, and symbols.');
                                    setProcessing(false);
                                }else{
                                    updatePassword(auth.currentUser, password).then(() => {
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
                                    })
                                }
                            }}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}