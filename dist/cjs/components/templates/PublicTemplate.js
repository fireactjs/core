import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
export const PublicTemplate = () => {
  return /*#__PURE__*/React.createElement(Box, {
    mt: 10
  }, /*#__PURE__*/React.createElement(Container, {
    maxWidth: "sm"
  }, /*#__PURE__*/React.createElement(Box, {
    component: "span",
    m: 5,
    textAlign: "center"
  }, /*#__PURE__*/React.createElement(Outlet, null))));
};