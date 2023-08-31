import "core-js/modules/web.dom-collections.iterator.js";
import React, { useContext, useState } from "react";
import { Alert, Button, Box, Stack, TextField, Typography, Grid, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { SetPageTitle } from "../SetPageTitle";
import { FireactContext } from "../Fireact";
export const ResetPassword = _ref => {
  let {
    logo
  } = _ref;
  const {
    config
  } = useContext(FireactContext);
  const pathnames = config.pathnames;
  const signInUrl = pathnames.SignIn;
  const title = "Reset Password";
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState("");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(SetPageTitle, {
    title: title
  }), logo, /*#__PURE__*/React.createElement(Typography, {
    component: "h1",
    variant: "h5"
  }, title)), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Stack, {
    spacing: 2,
    mt: 2
  }, error !== null && /*#__PURE__*/React.createElement(Alert, {
    severity: "error"
  }, error), success && /*#__PURE__*/React.createElement(Alert, {
    severity: "success"
  }, "A password reset email has been sent to the email address."), /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    margin: "normal",
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    fullWidth: true,
    variant: "contained",
    size: "large",
    disabled: processing,
    onClick: () => {
      setProcessing(true);
      setSuccess(false);
      setError(null);
      const auth = getAuth();
      sendPasswordResetEmail(auth, email).then(() => {
        setProcessing(false);
        setSuccess(true);
      }).catch(error => {
        switch (error.code) {
          case "auth/invalid-email":
            setError('The email address is badly formatted.');
            break;
          case "auth/missing-email":
            setError('The email address is missing.');
            break;
          case "auth/user-not-found":
            setError('There is no user record corresponding to this identifier. The user may have been deleted.');
            break;
          case "auth/too-many-requests":
            setError('We have blocked all requests from this device due to unusual activity. Try again later.');
            break;
          default:
            setError(error.message);
            break;
        }
        setProcessing(false);
      });
    }
  }, "Reset Password"), signInUrl && /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, signInUrl && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    textAlign: "left"
  }, /*#__PURE__*/React.createElement(Link, {
    to: signInUrl,
    component: RouterLink
  }, "Sign in with an existing account"))))));
};