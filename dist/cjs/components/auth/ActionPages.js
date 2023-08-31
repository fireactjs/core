import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/web.url.js";
import "core-js/modules/web.url-search-params.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Stack, Typography, TextField, Button } from "@mui/material";
import { SetPageTitle } from "../SetPageTitle";
import { getAuth, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { FireactContext } from "../Fireact";
export const ActionPages = _ref => {
  let {
    logo
  } = _ref;
  let title = "Unknown Action";
  const params = new URL(document.location).searchParams;
  const mode = params.get('mode');
  const actionCode = params.get('oobCode');
  // const apiKey = params.get('apiKey');
  // const continueUrl = params.get('continueUrl');
  // const lang = params.get('lang') || 'en';

  switch (mode) {
    case 'resetPassword':
      title = "Reset Password";
      break;
    case 'recoverEmail':
      title = 'Recover Email';
      break;
    case 'verifyEmail':
      title = 'Verfiy Email';
      break;
    default:
      break;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(SetPageTitle, {
    title: title
  }), logo, /*#__PURE__*/React.createElement(Typography, {
    component: "h1",
    variant: "h5"
  }, title)), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Stack, {
    spacing: 2,
    mt: 2
  }, (mode === 'verifyEmail' || mode === 'recoverEmail') && /*#__PURE__*/React.createElement(HandleAction, {
    actionCode: actionCode,
    mode: mode
  }), mode === 'resetPassword' && /*#__PURE__*/React.createElement(ResetPassword, {
    actionCode: actionCode
  }))));
};
const ResetPassword = _ref2 => {
  let {
    actionCode
  } = _ref2;
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState('verifying');
  const {
    config
  } = useContext(FireactContext);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
    const auth = getAuth();
    verifyPasswordResetCode(auth, actionCode).then(() => {
      setStage('form');
    }).catch(error => {
      setStage('');
      setError(error.message);
    });
  }, [actionCode]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, error && /*#__PURE__*/React.createElement(Alert, {
    severity: "error"
  }, error), stage === 'verifying' && /*#__PURE__*/React.createElement(Typography, null, "Please wait while verifying your request..."), stage === 'form' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "newPassword",
    label: "New Password",
    type: "password",
    autoComplete: "new-password",
    margin: "normal",
    onChange: e => setNewPassword(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    autoComplete: "",
    margin: "normal",
    onChange: e => setConfirmPassword(e.target.value)
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
      if (!passwordNumericRegex.test(String(newPassword)) || !passwordUppercaseRegex.test(String(newPassword)) || !passwordLowercaseRegex.test(String(newPassword)) || !passwordSpecialRegex.test(String(newPassword)) || newPassword.length < 8) {
        setError('The password must contain at least 8 characters with letters (both uppercase and lowercase), numbers, and symbols.');
        setProcessing(false);
      } else if (newPassword !== confirmPassword) {
        setError('Confirm password does not match with new password.');
        setProcessing(false);
      } else {
        const auth = getAuth();
        confirmPasswordReset(auth, actionCode, newPassword).then(() => {
          setStage('success');
        }).catch(error => {
          setError(error.message);
          setProcessing(false);
        });
      }
    }
  }, "Reset Password")), stage === 'success' && /*#__PURE__*/React.createElement(Alert, {
    severity: "success"
  }, "Your email is verified. Please ", /*#__PURE__*/React.createElement(NavLink, {
    to: config.pathnames.SignIn
  }, "sign in"), " with your new password."));
};
const HandleAction = _ref3 => {
  let {
    mode,
    actionCode
  } = _ref3;
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const {
    config
  } = useContext(FireactContext);
  let processingMessage = 'Please wait';
  let successMessage = 'Done';
  switch (mode) {
    case 'verifyEmail':
      processingMessage = 'Please wait while verifying your email...';
      successMessage = /*#__PURE__*/React.createElement(React.Fragment, null, "Your email is verified. Please ", /*#__PURE__*/React.createElement(NavLink, {
        to: config.pathnames.SignIn
      }, "sign in"), " again.");
      break;
    case 'recoverEmail':
      processingMessage = 'Please wait while resotring your email...';
      successMessage = /*#__PURE__*/React.createElement(React.Fragment, null, "Your email is restored. Please ", /*#__PURE__*/React.createElement(NavLink, {
        to: config.pathnames.ResetPassword
      }, "reset password"), " to ensure your account is secured.");
      break;
    default:
      break;
  }
  useEffect(() => {
    setProcessing(true);
    setError(null);
    setSuccess(false);
    const auth = getAuth();
    applyActionCode(auth, actionCode).then(() => {
      setSuccess(true);
      setProcessing(false);
    }).catch(error => {
      setError(error.message);
      setProcessing(false);
    });
  }, [actionCode]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, processing ? /*#__PURE__*/React.createElement(Typography, null, processingMessage) : success ? /*#__PURE__*/React.createElement(Alert, {
    severity: "success"
  }, successMessage) : error ? /*#__PURE__*/React.createElement(Alert, {
    severity: "error"
  }, error) : /*#__PURE__*/React.createElement(Alert, {
    severity: "error"
  }, "Something went wrong"));
};