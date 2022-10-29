import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export const UserUpdateEmail = () => {
    const [email, setEmail] = useState("");

    return (
        <Container maxWidth="md">
            <Paper>
                <Box p={2}>
                    <Typography component="h1" variant="h4" align="center">Update Email</Typography>
                </Box>
                <Box p={2}>
                    <TextField required fullWidth name="email" label="Email" type="email" autoComplete="email" margin="normal" onChange={e => setEmail(e.target.value)} />
                </Box>
                <Box p={2}>
                    <Grid container>
                        <Grid item xs>
                            <Button type="button" color="secondary" variant="outlined" >Back</Button>
                        </Grid>
                        <Grid item>
                            <Button type="button" variant="contained" >Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}