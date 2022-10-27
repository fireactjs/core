import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const SignUp = ({logo, handleSuccess}) => {
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