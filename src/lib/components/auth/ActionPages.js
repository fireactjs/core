import React, { useContext, useEffect, useState } from "react";
import {Alert, Box, Stack, Typography } from "@mui/material";
import { SetPageTitle } from "../SetPageTitle";
import { getAuth, applyActionCode } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { FireactContext } from "../Fireact";

export const ActionPages = ({logo}) => {
    let title = "Unknown Action";
    const params = (new URL(document.location)).searchParams;

    const [mode, setMode] = useState(params.get('mode'));
    const actionCode = params.get('oobCode');
    const apiKey = params.get('apiKey');
    const continueUrl = params.get('continueUrl');
    const lang = params.get('lang') || 'en';

    const config = {
        'apiKey': apiKey
    }
    console.log('actionCode: '+actionCode);

    switch(mode){
        case 'resetPassword':
            title = "Reset Password";
            break;
        case 'recoverEmail':
            title = 'Recover Email';
            break;
        case 'verifyEmail':
            title = 'Verfiy Email';
            break;
        default:
            break;
    }

    return (
        <>
            <Box>
                <SetPageTitle title={title} />
                {logo}
                <Typography component="h1" variant="h5">{title}</Typography>
            </Box>
            <Box>
                <Stack spacing={2} mt={2}>
                    {(mode === 'verifyEmail' || mode === 'recoverEmail') && <HandleAction actionCode={actionCode} mode={mode} />}
                </Stack>
            </Box>
        </>
    )
}

const HandleAction = ({mode, actionCode}) => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { config } = useContext(FireactContext);

    let processingMessage = 'Please wait';
    let successMessage = 'Done';

    switch(mode){
        case 'verifyEmail':
            processingMessage = 'Please wait while verifying your email...';
            successMessage = <>Your email is verified. Please <NavLink to={config.pathnames.SignIn}>sign in</NavLink> again.</>
            break;
        case 'recoverEmail':
            processingMessage = 'Please wait while resotring your email...';
            successMessage = <>Your email is restored. Please <NavLink to={config.pathnames.ResetPassword}>reset password</NavLink> to ensure your account is secured.</>
            break;
        default:
            break;
    }

    useEffect(() => {
        setProcessing(true);
        setError(null);
        setSuccess(false);
        const auth = getAuth();
        applyActionCode(auth, actionCode).then(() => {
            setSuccess(true);
            setProcessing(false);
        }).catch(error => {
            setError(error.message);
            setProcessing(false);
        })

    },[actionCode]);

    return (
        <>
            {processing?(
                <Typography>{processingMessage}</Typography>
            ):(
                success?(
                    <Alert severity="success">{successMessage}</Alert>
                ):(
                    error?(
                        <Alert severity="error">{error}</Alert>
                    ):(
                        <Alert severity="error">Something went wrong</Alert>
                    )
                )
            )}
        </>
    )
}