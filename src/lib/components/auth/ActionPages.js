import React, { useContext, useEffect, useState } from "react";
import {Alert, Box, Stack, Typography, TextField, Button } from "@mui/material";
import { SetPageTitle } from "../SetPageTitle";
import { getAuth, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { FireactContext } from "../Fireact";

export const ActionPages = ({logo}) => {
    let title = "Unknown Action";
    const params = (new URL(document.location)).searchParams;

    const mode = params.get('mode');
    const actionCode = params.get('oobCode');
    // const apiKey = params.get('apiKey');
    // const continueUrl = params.get('continueUrl');
    // const lang = params.get('lang') || 'en';

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
                    {mode === 'resetPassword' && 
                        <ResetPassword actionCode={actionCode} />
                    }
                </Stack>
            </Box>
        </>
    )
}

const ResetPassword = ({actionCode}) => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [stage, setStage] = useState('verifying');

    const { config } = useContext(FireactContext);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const auth = getAuth();
        verifyPasswordResetCode(auth, actionCode).then(() => {
            setStage('form');
        }).catch(error => {
            setStage('');
            setError(error.message);
        })
    },[actionCode]);

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            {stage === 'verifying' && 
                <Typography>Please wait while verifying your request...</Typography>
            }
            {stage === 'form' && <>
                <TextField required fullWidth name="newPassword" label="New Password" type="password" autoComplete="new-password" margin="normal" onChange={e => setNewPassword(e.target.value)} />
                <TextField required fullWidth name="confirmPassword" label="Confirm Password" type="password" autoComplete="" margin="normal" onChange={e => setConfirmPassword(e.target.value)} />
                <Button type="button" fullWidth variant="contained" size="large" disabled={processing} onClick={() =>{
                    setProcessing(true);
                    setError(null);
                    const passwordNumericRegex = /\d+/;
                    const passwordUppercaseRegex = /[A-Z]+/;
                    const passwordLowercaseRegex = /[a-z]+/;
                    const passwordSpecialRegex = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/;
                    if(!passwordNumericRegex.test(String(newPassword)) ||
                        !passwordUppercaseRegex.test(String(newPassword)) ||
                        !passwordLowercaseRegex.test(String(newPassword)) ||
                        !passwordSpecialRegex.test(String(newPassword)) || newPassword.length < 8){
                        setError('The password must contain at least 8 characters with letters (both uppercase and lowercase), numbers, and symbols.');
                        setProcessing(false);
                    }else if(newPassword !== confirmPassword){
                        setError('Confirm password does not match with new password.');
                        setProcessing(false);
                    }else{
                        const auth = getAuth();
                        confirmPasswordReset(auth, actionCode, newPassword).then(() => {
                            setStage('success');
                        }).catch(error => {
                            setError(error.message);
                            setProcessing(false);
                        })
                    }
                }}>Reset Password</Button>
            </>}
            {stage === 'success' &&
                <Alert severity="success">Your email is verified. Please <NavLink to={config.pathnames.SignIn}>sign in</NavLink> with your new password.</Alert>
            }
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