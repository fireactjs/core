import React, { useState } from "react";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const SignUp = ({logo, handleSuccess}) => {

    const [error, setError] = useState(null);
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
                    <Button type="button" fullWidth variant="contained" size="large" onClick={() => handleSuccess()}>Sign Up</Button>
                </Stack>
            </Box>
        </>
    );
}