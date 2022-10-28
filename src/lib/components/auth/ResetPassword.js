import React, { useState } from "react";
import { Alert, Button, Stack, TextField, Typography, Grid, Link } from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const ResetPassword = ({logo, signInUrl}) => {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState("");

    return (
        <>
            <Box>
                {logo}
                <Typography component="h1" variant="h5">Reset Password</Typography>
            </Box>
            <Box>
                <Stack spacing={2} mt={2}>
                    {error !== null &&
                        <Alert severity="error">{error}</Alert>
                    }
                    {success &&
                        <Alert severity="success">A password reset email has been sent to the email address.</Alert>
                    }
                    <TextField required fullWidth name="email" label="Email" type="email" autoComplete="email" margin="normal" onChange={e => setEmail(e.target.value)} />
                    <Button type="button" fullWidth variant="contained" size="large" disabled={processing} onClick={() => {
                        setProcessing(true);
                        setSuccess(false);
                        setError(null);
                        const auth = getAuth();
                        sendPasswordResetEmail(auth, email).then(() => {
                            setProcessing(false);
                            setSuccess(true);
                        }).catch(error => {
                            switch(error.code){
                                case "auth/invalid-email":
                                    setError('The email address is badly formatted.');
                                    break;
                                case "auth/missing-email":
                                    setError('The email address is missing.');
                                    break;
                                case "auth/user-not-found":
                                    setError('There is no user record corresponding to this identifier. The user may have been deleted.');
                                    break;
                                case "auth/too-many-requests":
                                    setError('We have blocked all requests from this device due to unusual activity. Try again later.');
                                    break;
                                default:
                                    setError(error.message);
                                    break;
                            }
                            setProcessing(false);
                        });
                    }}>Reset Password</Button>
                    {(signInUrl && 
                        <Grid container>
                            {signInUrl &&
                                <Grid item xs textAlign="left">
                                    <Link to={signInUrl} component={RouterLink}>Sign in with an existing account</Link>
                                </Grid>
                            }
                        </Grid>
                    )}
                </Stack>
            </Box>
        </>
    );
}