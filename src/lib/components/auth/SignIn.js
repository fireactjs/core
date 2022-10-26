import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import googleSvg from "../../assets/images/google.svg";
import microsoftSvg from "../../assets/images/microsoft.svg";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

export const SignIn = ({logo, providers}) => {
    const btWidth = "220px";
    const btnMarginBottom = "15px";

    return (
        <Container component="main" maxWidth="s">
            <Box>
                {logo}
                <Typography component="h1" variant="h5">Sign In</Typography>
            </Box>
            <Box>
                <TextField required fullWidth name="email" label="Email Address" autoComplete="email" margin="normal" />
                <Button type="button" fullWidth variant="contained" size="large" startIcon={<EmailIcon />}>
                    <Typography component="span" style={{width: `${btWidth}`}}>
                        Sign In With Email
                    </Typography>
                </Button>
                {providers &&
                    <Typography p={2}>OR</Typography>
                }
                {providers && providers.google && 
                    <Button type="button" fullWidth variant="outlined" startIcon={<img src={googleSvg} width="16" alt="Google" />} style={{marginBottom: `${btnMarginBottom}`}} size="large">
                        <Typography component="span" style={{width: `${btWidth}`}}>
                            Sign In With Google
                        </Typography>
                    </Button>
                }
                {providers && providers.facebook && 
                    <Button type="button" fullWidth variant="outlined" startIcon={<FacebookIcon style={{color: "#4267B2"}} />} style={{marginBottom: `${btnMarginBottom}`}} size="large">
                        <Typography component="span" style={{width: `${btWidth}`}}>
                            Sign In With Facebook
                        </Typography>
                    </Button>
                }
                {providers && providers.microsoft && 
                    <Button type="button" fullWidth variant="outlined" startIcon={<img src={microsoftSvg} width="16" alt="Microsoft" />} style={{marginBottom: `${btnMarginBottom}`}} size="large">
                        <Typography component="span" style={{width: `${btWidth}`}}>
                            Sign In With Microsoft
                        </Typography>
                    </Button>
                }
                {providers && providers.apple && 
                    <Button type="button" fullWidth variant="outlined" startIcon={<AppleIcon style={{color: "#555555"}} />} style={{marginBottom: `${btnMarginBottom}`}} size="large">
                        <Typography component="span" style={{width: `${btWidth}`}}>
                            Sign In With Apple
                        </Typography>
                    </Button>
                }
                {providers && providers.twitter && 
                    <Button type="button" fullWidth variant="outlined" startIcon={<TwitterIcon style={{color: "#1DA1F2"}} />} style={{marginBottom: `${btnMarginBottom}`}} size="large">
                        <Typography component="span" style={{width: `${btWidth}`}}>
                            Sign In With Twitter
                        </Typography>
                    </Button>
                }
                {providers && providers.github && 
                    <Button type="button" fullWidth variant="outlined" startIcon={<GitHubIcon style={{color: "#000000"}} />} style={{marginBottom: `${btnMarginBottom}`}} size="large">
                        <Typography component="span" style={{width: `${btWidth}`}}>
                            Sign In With Github
                        </Typography>
                    </Button>
                }
            </Box>
        </Container>
    );
}