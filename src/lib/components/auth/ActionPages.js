import React from "react";
import {Box, Stack, Typography } from "@mui/material";
import { SetPageTitle } from "../SetPageTitle";

export const ActionPages = ({logo}) => {
    let title = "Unknown Action";
    const params = (new URL(document.location)).searchParams;

    const mode = params.get('mode');
    const oobCode = params.get('oobCode');
    const apiKey = params.get('apiKey');
    const continueUrl = params.get('continueUrl');
    const lang = params.get('lang');

    return (
        <>
            <Box>
                <SetPageTitle title={title} />
                {logo}
                <Typography component="h1" variant="h5">{title}</Typography>
            </Box>
            <Box>
                <Stack spacing={2} mt={2}>

                </Stack>
            </Box>
        </>
    )
}