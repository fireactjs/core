import { Alert, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import googleSvg from "../../assets/images/google.svg";
import microsoftSvg from "../../assets/images/microsoft.svg";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AuthContext } from "../Auth";
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";


export const SignIn = ({logo, providers}) => {
    const btWidth = "220px";

    const { setAuthUser } = useContext(AuthContext);

    const [error, setError] = useState(null);

    const buttonClick = (providerName) => {
        let provider = null;
        let providerObj = null;
        switch(providerName){
            case "google":
                provider = new GoogleAuthProvider();
                providerObj = GoogleAuthProvider;
                break;
            case "facebook":
                provider = new FacebookAuthProvider();
                providerObj = FacebookAuthProvider;
                break;
            case "github":
                provider = new GithubAuthProvider();
                providerObj = GithubAuthProvider;
                break;
        }
        const auth = getAuth();
        signInWithPopup(auth, provider).then(result => {
            const user = result.user;
            setAuthUser(prevState => ({
                ...prevState,
                user: {
                    email: user.email,
                    name: user.displayName,
                    photoURL: user.photoURL
                }
            }));
            document.location.href = "/"; // redirect back to the homepage
        }).catch(error => {
            if(error.code === 'auth/account-exists-with-different-credential'){
                setError('Please use Google as your sign-in method.');
            }else{
                setError(error.message);
            }
            
        })
    }

    return (
        <Container component="main" maxWidth="s">
            <Box>
                {logo}
                <Typography component="h1" variant="h5">Sign In</Typography>
            </Box>
            <Box>
                <Stack spacing={2} mt={2}>
                    {error !== null &&
                        <Alert severity="error">{error}</Alert>
                    }
                    <TextField required fullWidth name="email" label="Email Address" autoComplete="email" margin="normal" />
                    <Button type="button" fullWidth variant="contained" size="large" startIcon={<EmailIcon />}>
                        <Typography component="span" style={{width: `${btWidth}`}}>
                            Sign In With Email
                        </Typography>
                    </Button>
                    {providers &&
                        <Typography>OR</Typography>
                    }
                    {providers && providers.google && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<img src={googleSvg} width="16" alt="Google" />} size="large" onClick={() => buttonClick("google")}>
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Google
                            </Typography>
                        </Button>
                    }
                    {providers && providers.facebook && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<FacebookIcon style={{color: "#4267B2"}} />} size="large" onClick={() => buttonClick("facebook")}>
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Facebook
                            </Typography>
                        </Button>
                    }
                    {providers && providers.microsoft && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<img src={microsoftSvg} width="16" alt="Microsoft" />} size="large">
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Microsoft
                            </Typography>
                        </Button>
                    }
                    {providers && providers.apple && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<AppleIcon style={{color: "#555555"}} />} size="large">
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Apple
                            </Typography>
                        </Button>
                    }
                    {providers && providers.twitter && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<TwitterIcon style={{color: "#1DA1F2"}} />} size="large">
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Twitter
                            </Typography>
                        </Button>
                    }
                    {providers && providers.github && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<GitHubIcon style={{color: "#000000"}} />} size="large" onClick={() => buttonClick("github")}>
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Github
                            </Typography>
                        </Button>
                    }
                </Stack>
                
            </Box>
        </Container>
    );
}