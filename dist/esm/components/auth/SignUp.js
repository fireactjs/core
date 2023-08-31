import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.string.trim.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import React, { useContext, useState } from "react";
import { Alert, Button, Box, Stack, TextField, Typography, Grid, Link } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { FireactContext } from "../Fireact";
export const SignUp = _ref => {
  let {
    logo,
    successUrl
  } = _ref;
  const {
    config
  } = useContext(FireactContext);
  const pathnames = config.pathnames;
  const title = "Sign Up";
  const signInUrl = pathnames.SignIn;
  const resetPasswordUrl = pathnames.ResetPassword;
  const re = successUrl || "/"; // redirect successUrl or homepage after sign in

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
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
  }, error), /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    margin: "normal",
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "fullname",
    label: "Full Name",
    autoComplete: "name",
    type: "text",
    margin: "normal",
    onChange: e => setFullname(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "password",
    label: "New Password",
    autoComplete: "new-password",
    type: "password",
    margin: "normal",
    onChange: e => setPassword(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    fullWidth: true,
    variant: "contained",
    size: "large",
    disabled: processing,
    onClick: () => {
      setProcessing(true);
      setError(null);
      const passwordNumericRegex = /\d+/;
      const passwordUppercaseRegex = /[A-Z]+/;
      const passwordLowercaseRegex = /[a-z]+/;
      const passwordSpecialRegex = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/;
      if (fullname.trim() === "") {
        setError('Your full name is required.');
        setProcessing(false);
      } else if (!passwordNumericRegex.test(String(password)) || !passwordUppercaseRegex.test(String(password)) || !passwordLowercaseRegex.test(String(password)) || !passwordSpecialRegex.test(String(password)) || password.length < 8) {
        setError('The password must contain at least 8 characters with letters (both uppercase and lowercase), numbers, and symbols.');
        setProcessing(false);
      } else {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then(result => {
          return updateProfile(result.user, {
            displayName: fullname
          });
        }).then(() => {
          document.location.href = re.substr(0, 1) === '/' && re.substr(1, 1) !== '/' ? re : '/';
        }).catch(error => {
          switch (error.code) {
            case "auth/invalid-email":
              setError('The email address is badly formatted.');
              break;
            case "auth/missing-email":
              setError('The email address is missing.');
              break;
            case "auth/email-already-in-use":
              setError('The email address is already in use by another account.');
              break;
            default:
              setError(error.message);
              break;
          }
          setProcessing(false);
        });
      }
    }
  }, "Sign Up"), (signInUrl || resetPasswordUrl) && /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, signInUrl && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    textAlign: "left"
  }, /*#__PURE__*/React.createElement(Link, {
    to: signInUrl,
    component: RouterLink
  }, "Sign in with an existing account")), resetPasswordUrl && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    textAlign: "left"
  }, /*#__PURE__*/React.createElement(Link, {
    to: resetPasswordUrl,
    component: RouterLink
  }, "Reset password"))))));
};