import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.string.trim.js";
import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { getAuth, updateProfile } from "firebase/auth";
import { FireactContext } from "../Fireact";
export const UserUpdateName = () => {
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const title = "Change Name";
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
  }, "Your name has been updated successfully.")), /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React.createElement(TextField, {
    required: true,
    fullWidth: true,
    name: "fullname",
    label: "Full Name",
    autoComplete: "name",
    type: "text",
    margin: "normal",
    onChange: e => setFullname(e.target.value)
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
      setProcessing(true);
      setSuccess(false);
      setError(null);
      if (fullname.trim() === "") {
        setError('Your full name is required.');
        setProcessing(false);
      } else {
        updateProfile(auth.currentUser, {
          displayName: fullname
        }).then(() => {
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