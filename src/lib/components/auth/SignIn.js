import { Alert, Button, Box, Container, Grid, Stack, TextField, Typography, Link } from "@mui/material";
import React, { useContext, useState } from "react";
import googleSvg from "../../assets/images/google.svg";
import microsoftSvg from "../../assets/images/microsoft.svg";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AuthContext } from "../Auth";
import { getAuth, signInWithPopup, fetchSignInMethodsForEmail, signInWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider, OAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { FireactContext } from "../Fireact";

export const SignIn = ({logo, successUrl}) => {
    const { config } = useContext(FireactContext);
    const pathnames = config.pathnames;
    const providers = config.authProviders;

    const signUpUrl = pathnames.SignUp;
    const resetPasswordUrl = pathnames.ResetPassword;

    const btWidth = "220px";
    const title = "Sign In";

    const { setAuthUser } = useContext(AuthContext);
    
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const params = (new URL(document.location)).searchParams;
    const re = params.get('re') || successUrl || "/"; // redirect to parameter "re", successUrl or homepage after sign in

    const singleSignOn = (providerName) => {
        setProcessing(true);
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
            document.location.href = re.substr(0,1)==='/'&&re.substr(1,1)!=='/'?re:'/';
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
            setProcessing(false);
        })
    }

    return (
        <Container component="main" maxWidth="s">
            <SetPageTitle title={title} />
            <Box>
                {logo}
                <Typography component="h1" variant="h5">{title}</Typography>
            </Box>
            <Box>
                <Stack spacing={2} mt={2}>
                    {error !== null &&
                        <Alert severity="error">{error}</Alert>
                    }
                    <TextField required fullWidth name="email" label="Email" type="email" autoComplete="email" margin="normal" onChange={e => setEmail(e.target.value)} />
                    <TextField required fullWidth name="password" label="Password" type="password" autoComplete="current-password" margin="normal" onChange={e => setPassword(e.target.value)} />
                    <Button type="button" fullWidth variant="contained" size="large" startIcon={<EmailIcon />} disabled={processing} onClick={() => {
                        setError(null);
                        setProcessing(true);
                        const auth = getAuth();
                        signInWithEmailAndPassword(auth, email, password).then((result) => {
                            const user = result.user;
                            setAuthUser(prevState => ({
                                ...prevState,
                                user: {
                                    email: user.email,
                                    name: user.displayName,
                                    photoURL: user.photoURL
                                }
                            }));
                            document.location.href = re.substr(0,1)==='/'&&re.substr(1,1)!=='/'?re:'/';
                        }).catch(error => {
                            switch(error.code){
                                case "auth/invalid-email":
                                    setError("The email address is badly formatted.");
                                    break;
                                case "auth/internal-error":
                                    if(password === ""){
                                        setError("The password is empty.");
                                    }else{
                                        setError("An internal AuthError has occurred.");
                                    }
                                    break;
                                case "auth/wrong-password":
                                    setError("The password is invalid or the user does not have a password.");
                                    break;
                                case "auth/user-not-found":
                                    setError("There is no user record corresponding to this identifier. The user may have been deleted.");
                                    break;
                                default:
                                    setError(error.message);
                                    break;
                            }
                            setProcessing(false);
                        })
                    }}>
                        <Typography component="span" style={{width: `${btWidth}`}}>
                            Sign In With Email
                        </Typography>
                    </Button>
                    {(signUpUrl || resetPasswordUrl) && 
                        <Grid container>
                            {signUpUrl &&
                                <Grid item xs textAlign="left">
                                    <Link to={signUpUrl} component={RouterLink}>Sign up a new account</Link>
                                </Grid>
                            }
                            {resetPasswordUrl && 
                                <Grid item textAlign="left">
                                    <Link to={resetPasswordUrl} component={RouterLink}>Reset password</Link>
                                </Grid>
                            }
                        </Grid>
                    }
                    {providers &&
                        <Typography>OR</Typography>
                    }
                    {providers && providers.google && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<img src={googleSvg} width="16" alt="Google" />} size="large" onClick={() => singleSignOn("google")} disabled={processing}>
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Google
                            </Typography>
                        </Button>
                    }
                    {providers && providers.facebook && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<FacebookIcon style={{color: "#4267B2"}} />} size="large" onClick={() => singleSignOn("facebook")} disabled={processing}>
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Facebook
                            </Typography>
                        </Button>
                    }
                    {providers && providers.microsoft && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<img src={microsoftSvg} width="16" alt="Microsoft" />} size="large" onClick={() => singleSignOn("microsoft")} disabled={processing}>
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Microsoft
                            </Typography>
                        </Button>
                    }
                    {providers && providers.apple && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<AppleIcon style={{color: "#555555"}} />} size="large" onClick={() => singleSignOn("apple")} disabled={processing}>
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Apple
                            </Typography>
                        </Button>
                    }
                    {providers && providers.twitter && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<TwitterIcon style={{color: "#1DA1F2"}} />} size="large" onClick={() => singleSignOn("twitter")} disabled={processing}>
                            <Typography component="span" style={{width: `${btWidth}`}}>
                                Sign In With Twitter
                            </Typography>
                        </Button>
                    }
                    {providers && providers.github && 
                        <Button type="button" fullWidth variant="outlined" startIcon={<GitHubIcon style={{color: "#000000"}} />} size="large" onClick={() => singleSignOn("github")} disabled={processing}>
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