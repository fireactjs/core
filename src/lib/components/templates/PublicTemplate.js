import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const PublicTemplate = () => {
    return (
        <Box mt={10}>
            <Container maxWidth="sm">
                <Box component="span" m={5} textAlign="center">
                    <Outlet />
                </Box>
            </Container>
        </Box>
    )
}