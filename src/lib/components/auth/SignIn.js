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
import { getAuth, signInWithPopup, fetchSignInMethodsForEmail, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider, OAuthProvider, TwitterAuthProvider } from "firebase/auth";


const SignUp = ({logo, email, handleSuccess}) => {
    return (
        <>
            <Box>
                {logo}
                <Typography component="h1" variant="h5">Sign Up</Typography>
            </Box>
            <Box>
                <Stack spacing={2} mt={2}>
                    <TextField required fullWidth name="fullname" label="Full Name" autoComplete="name" type="text" margin="normal" />
                    <TextField required fullWidth name="password" label="New Password" autoComplete="new-password" type="password" margin="normal" />
                    <TextField required fullWidth name="confirm-password" label="Confirm Password" autoComplete="new-password" type="password" margin="normal" />
                    <Button type="button" fullWidth variant="contained" size="large" onClick={() => handleSuccess()}>Sign Up</Button>
                </Stack>
            </Box>
        </>
    );
}

const Password = ({logo, email, handleSuccess}) => {
    return (
        <>
            <Box>
                {logo}
                <Typography component="h1" variant="h5">Enter Password</Typography>
            </Box>
            <Box>
                <Stack spacing={2} mt={2}>
                    <TextField required fullWidth name="password" label="Password" type="password" autoComplete="current-password" margin="normal" />
                    <Button type="button" fullWidth variant="contained" size="large" onClick={() => handleSuccess()}>Sign In</Button>
                </Stack>
            </Box>
        </>
    );
}

export const SignIn = ({logo, providers}) => {
    const btWidth = "220px";

    const { setAuthUser } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [stage, setStage] = useState("sign-in");

    const singleSignOn = (providerName) => {
        setError(null);
        let provider = null;
        switch(providerName){
            case "google":
                provider = new GoogleAuthProvider();
                break;
            case "facebook":
                provider = new FacebookAuthProvider();
                break;
            case "github":
                provider = new GithubAuthProvider();
                break;
            case "apple":
                provider = new OAuthProvider('apple.com');
                provider.addScope('email');
                provider.addScope('name');
                break;
            case "microsoft":
                provider = new OAuthProvider('microsoft.com');
                break;
            case "twitter":
                provider = new TwitterAuthProvider();
                break;
            default:
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
                fetchSignInMethodsForEmail(auth, error.customData.email).then(methods => {
                    setError("Please use another sign-in method: "+methods[0]);
                }).catch(error => {
                    setError(error.message);
                })
            }else{
                setError(error.message);
            }
            
        })
    }

    return (
        <Container component="main" maxWidth="s">
            {stage==="sign-in" && 
                <>
                    <Box>
                        {logo}
                        <Typography component="h1" variant="h5">Sign In</Typography>
                    </Box>
                    <Box>
                        <Stack spacing={2} mt={2}>
                            {error !== null &&
                                <Alert severity="error">{error}</Alert>
                            }
                            <TextField required fullWidth name="email" label="Email Address" type="email" autoComplete="email" margin="normal" onChange={e => setEmail(e.target.value)} />
                            <Button type="button" fullWidth variant="contained" size="large" startIcon={<EmailIcon />} onClick={() => {
                                setError(null);
                                const auth = getAuth();
                                fetchSignInMethodsForEmail(auth, email).then(methods => {
                                    if(methods.length === 0){
                                        // non existing account
                                        setStage("sign-up");
                                    }else{
                                        // existing account
                                        setStage("password");
                                    }
                                }).catch(error => {
                                    setError(error.message);
                                });
                            }}>
                                <Typography component="span" style={{width: `${btWidth}`}}>
                                    Sign In With Email
                                </Typography>
                            </Button>
                            {providers &&
                                <Typography>OR</Typography>
                            }
                            {providers && providers.google && 
                                <Button type="button" fullWidth variant="outlined" startIcon={<img src={googleSvg} width="16" alt="Google" />} size="large" onClick={() => singleSignOn("google")}>
                                    <Typography component="span" style={{width: `${btWidth}`}}>
                                        Sign In With Google
                                    </Typography>
                                </Button>
                            }
                            {providers && providers.facebook && 
                                <Button type="button" fullWidth variant="outlined" startIcon={<FacebookIcon style={{color: "#4267B2"}} />} size="large" onClick={() => singleSignOn("facebook")}>
                                    <Typography component="span" style={{width: `${btWidth}`}}>
                                        Sign In With Facebook
                                    </Typography>
                                </Button>
                            }
                            {providers && providers.microsoft && 
                                <Button type="button" fullWidth variant="outlined" startIcon={<img src={microsoftSvg} width="16" alt="Microsoft" />} size="large" onClick={() => singleSignOn("microsoft")}>
                                    <Typography component="span" style={{width: `${btWidth}`}}>
                                        Sign In With Microsoft
                                    </Typography>
                                </Button>
                            }
                            {providers && providers.apple && 
                                <Button type="button" fullWidth variant="outlined" startIcon={<AppleIcon style={{color: "#555555"}} />} size="large" onClick={() => singleSignOn("apple")}>
                                    <Typography component="span" style={{width: `${btWidth}`}}>
                                        Sign In With Apple
                                    </Typography>
                                </Button>
                            }
                            {providers && providers.twitter && 
                                <Button type="button" fullWidth variant="outlined" startIcon={<TwitterIcon style={{color: "#1DA1F2"}} />} size="large" onClick={() => singleSignOn("twitter")}>
                                    <Typography component="span" style={{width: `${btWidth}`}}>
                                        Sign In With Twitter
                                    </Typography>
                                </Button>
                            }
                            {providers && providers.github && 
                                <Button type="button" fullWidth variant="outlined" startIcon={<GitHubIcon style={{color: "#000000"}} />} size="large" onClick={() => singleSignOn("github")}>
                                    <Typography component="span" style={{width: `${btWidth}`}}>
                                        Sign In With Github
                                    </Typography>
                                </Button>
                            }
                        </Stack>
                    </Box>
                </>
            }
            {stage==="sign-up" && 
                <SignUp logo={logo} email={email} handleSuccess={() => {setStage("sign-in")}} />
            }
            {stage==="password" && 
                <Password logo={logo} email={email} handleSuccess={() => document.location.href="/"} />
            }
        </Container>
    );
}