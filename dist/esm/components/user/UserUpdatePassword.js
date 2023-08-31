import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { getAuth, updatePassword } from "firebase/auth";
import { FireactContext } from "../Fireact";
export const UserUpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const title = "Change Password";
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
  }, error)), success && /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React.createElement(Alert, {
    severity: "success"
  }, "Your password has been updated successfully.")), /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "password",
    label: "New Password",
    autoComplete: "new-password",
    type: "password",
    margin: "normal",
    onChange: e => setPassword(e.target.value)
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
    variant: "contained",
    disabled: processing,
    onClick: () => {
      const passwordNumericRegex = /\d+/;
      const passwordUppercaseRegex = /[A-Z]+/;
      const passwordLowercaseRegex = /[a-z]+/;
      const passwordSpecialRegex = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/;
      setProcessing(true);
      setSuccess(false);
      setError(null);
      if (!passwordNumericRegex.test(String(password)) || !passwordUppercaseRegex.test(String(password)) || !passwordLowercaseRegex.test(String(password)) || !passwordSpecialRegex.test(String(password)) || password.length < 8) {
        setError('The password must contain at least 8 characters with letters (both uppercase and lowercase), numbers, and symbols.');
        setProcessing(false);
      } else {
        updatePassword(auth.currentUser, password).then(() => {
          setSuccess(true);
          setProcessing(false);
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
  }, "Save"))))));
};