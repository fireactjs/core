import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import googleIcon from "../../assets/images/google.svg";
import FacebookIcon from '@mui/icons-material/Facebook';

export const SignIn = ({logo, providers}) => {
    return (
        <Container component="main" maxWidth="s">
            <Box>
                {logo}
                <Typography component="h1" variant="h5">Sign In</Typography>
            </Box>
            <Box>
                <TextField required fullWidth name="email" label="Email Address" autoComplete="email" margin="normal" />
                <Button type="button" fullWidth variant="contained">Sign In With Email</Button>
                {providers &&
                    <Typography p={2}>OR</Typography>
                }
                {providers && providers.google && 
                    <Button type="button" fullWidth variant="outlined" startIcon={<img src={googleIcon} width="15" alt="Google" />} style={{marginBottom: "10px"}}>Sign In With Google</Button>
                }
                {providers && providers.facebook && 
                    <Button type="button" fullWidth variant="outlined" startIcon={<FacebookIcon style={{color: "#4267B2"}} />} style={{marginBottom: "10px"}}>Sign In With Facebook</Button>
                }
            </Box>
        </Container>
    );
}