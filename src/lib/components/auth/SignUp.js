import React, { useState } from "react";
import { Alert, Button, Box, Stack, TextField, Typography, Grid, Link } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link as RouterLink } from "react-router-dom";

export const SignUp = ({logo, successUrl, signInUrl, resetPasswordUrl}) => {

    const re = successUrl || "/"; // redirect successUrl or homepage after sign in

    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Box>
                {logo}
                <Typography component="h1" variant="h5">Sign Up</Typography>
            </Box>
            <Box>
                <Stack spacing={2} mt={2}>
                    {error !== null &&
                        <Alert severity="error">{error}</Alert>
                    }
                    <TextField required fullWidth name="email" label="Email" type="email" autoComplete="email" margin="normal" onChange={e => setEmail(e.target.value)} />
                    <TextField required fullWidth name="fullname" label="Full Name" autoComplete="name" type="text" margin="normal" onChange={e => setFullname(e.target.value)} />
                    <TextField required fullWidth name="password" label="New Password" autoComplete="new-password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
                    <Button type="button" fullWidth variant="contained" size="large" disabled={processing} onClick={() => {
                        setProcessing(true);
                        setError(null);
                        const passwordNumericRegex = /\d+/;
                        const passwordUppercaseRegex = /[A-Z]+/;
                        const passwordLowercaseRegex = /[a-z]+/;
                        const passwordSpecialRegex = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/;
                        if(fullname.trim() === ""){
                            setError('Your full name is required.');
                            setProcessing(false);
                        }else if(!passwordNumericRegex.test(String(password)) ||
                        !passwordUppercaseRegex.test(String(password)) ||
                        !passwordLowercaseRegex.test(String(password)) ||
                        !passwordSpecialRegex.test(String(password)) || password.length < 8){
                            setError('The password must contain at least 8 characters with letters (both uppercase and lowercase), numbers, and symbols.');
                            setProcessing(false);
                        }else{;
                            const auth = getAuth();
                            createUserWithEmailAndPassword(auth, email, password).then(result => {
                                console.log(result.user);
                                return updateProfile(result.user, {displayName: fullname});
                            }).then(() => {
                                document.location.href = re;
                            }).catch(error => {
                                switch(error.code){
                                    case "auth/invalid-email":
                                        setError('The email address is badly formatted.');
                                        break;
                                    case "auth/missing-email":
                                        setError('The email address is missing.');
                                        break;
                                    case "auth/email-already-in-use":
                                        setError('The email address is already in use by another account.');
                                        break;
                                    default:
                                        setError(error.message);
                                        break;
                                }
                                setProcessing(false);
                            });
                        }
                    }}>Sign Up</Button>
                    {(signInUrl || resetPasswordUrl) && 
                        <Grid container>
                            {signInUrl &&
                                <Grid item xs textAlign="left">
                                    <Link to={signInUrl} component={RouterLink}>Sign in with an existing account</Link>
                                </Grid>
                            }
                            {resetPasswordUrl && 
                                <Grid item textAlign="left">
                                    <Link to={resetPasswordUrl} component={RouterLink}>Reset password</Link>
                                </Grid>
                            }
                        </Grid>
                    }
                </Stack>
            </Box>
        </>
    );
}