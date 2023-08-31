import "core-js/modules/web.dom-collections.iterator.js";
import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { deleteUser, getAuth } from "firebase/auth";
import { FireactContext } from "../Fireact";
export const UserDelete = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const title = "Delete Account";
  const navigate = useNavigate();
  const auth = getAuth();
  const {
    config
  } = useContext(FireactContext);
  const pathnames = config.pathnames;
  return /*#__PURE__*/React.createElement(Container, {
    maxWidth: "md"
  }, /*#__PURE__*/React.createElement(SetPageTitle, {
    title: title
  }), /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    component: "h1",
    variant: "h4",
    align: "center"
  }, title)), error !== null && /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React.createElement(Alert, {
    severity: "error"
  }, error)), /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React.createElement(Typography, null, "Please confirm your email address to delete your user account."), /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "email",
    label: "Email Address",
    type: "email",
    autoComplete: "email",
    margin: "normal",
    onChange: e => setEmail(e.target.value)
  })), /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    color: "secondary",
    variant: "outlined",
    disabled: processing,
    onClick: () => {
      navigate(pathnames.UserProfile);
    }
  }, "Back")), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    color: "error",
    variant: "contained",
    disabled: processing,
    onClick: () => {
      setProcessing(true);
      setError(null);
      if (auth.currentUser.email !== email) {
        setError("The email address does not match with your email address.");
        setProcessing(false);
      } else {
        deleteUser(auth.currentUser).then(() => {
          // refresh page
          document.location.href = "/";
        }).catch(error => {
          switch (error.code) {
            case "auth/requires-recent-login":
              setError("This operation is sensitive and requires recent authentication. Log in again before retrying this request.");
              break;
            default:
              setError(error.message);
              break;
          }
          setProcessing(false);
        });
      }
    }
  }, "Delete User Account"))))));
};