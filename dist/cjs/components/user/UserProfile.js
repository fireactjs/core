import "core-js/modules/web.dom-collections.iterator.js";
import { Alert, Grid, List, ListItem, Box, Avatar, Typography, Divider, Paper, Container } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth";
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from "react-router-dom";
import { SetPageTitle } from "../SetPageTitle";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { FireactContext } from "../Fireact";
export const UserProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [sendVerification, setSendVerification] = useState({
    'success': false,
    'error': null
  });
  const {
    config
  } = useContext(FireactContext);
  const pathnames = config.pathnames;
  return /*#__PURE__*/React.createElement(AuthContext.Consumer, null, context => /*#__PURE__*/React.createElement(Container, {
    maxWidth: "md"
  }, /*#__PURE__*/React.createElement(SetPageTitle, {
    title: "User Profile"
  }), /*#__PURE__*/React.createElement(Paper, null, sendVerification.error !== null && /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React.createElement(Alert, {
    severity: "error"
  }, sendVerification.error)), sendVerification.success && /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, /*#__PURE__*/React.createElement(Alert, {
    severity: "success"
  }, "Please check your email inbox to verify the email address. Refresh this page after you verified your email address.")), /*#__PURE__*/React.createElement(List, {
    component: "nav"
  }, /*#__PURE__*/React.createElement(ListItem, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(Box, {
    p: 1
  }, /*#__PURE__*/React.createElement("strong", null, "AVATAR"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Typography, {
    color: "textSecondary"
  }, "Update via social login")), /*#__PURE__*/React.createElement(Box, {
    p: 1
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    alt: context.authUser.user.displayName,
    src: context.authUser.user.photoURL ? context.authUser.user.photoURL : "https://ui-avatars.com/api/?name=" + encodeURI(context.authUser.user.displayName) + "&background=007bff&size=64&color=f8f9fc",
    style: {
      height: '64px',
      width: '64px'
    }
  })))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(ListItem, {
    button: true,
    onClick: () => {
      navigate(pathnames.UserUpdateName);
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(Box, {
    p: 1
  }, /*#__PURE__*/React.createElement("strong", null, "NAME"), /*#__PURE__*/React.createElement("br", null), context.authUser.user.displayName)), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(EditIcon, null)))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(ListItem, {
    button: true,
    onClick: () => {
      navigate(pathnames.UserUpdateEmail);
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(Box, {
    p: 1
  }, /*#__PURE__*/React.createElement("strong", null, "EMAIL"), /*#__PURE__*/React.createElement("br", null), context.authUser.user.email)), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(EditIcon, null)))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(ListItem, {
    button: true,
    onClick: () => {
      if (!context.authUser.user.emailVerified) {
        setSendVerification({
          'success': false,
          'error': null
        });
        sendEmailVerification(auth.currentUser).then(() => {
          setSendVerification({
            'success': true,
            'error': null
          });
        }).catch(error => {
          switch (error.code) {
            case "auth/too-many-requests":
              setSendVerification({
                'success': false,
                'error': "We have blocked all requests from this device due to unusual activity. Try again later."
              });
              break;
            default:
              setSendVerification({
                'success': false,
                'error': error.message
              });
              break;
          }
        });
      }
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(Box, {
    p: 1
  }, /*#__PURE__*/React.createElement("strong", null, "EMAIL VERIFIED"), /*#__PURE__*/React.createElement("br", null), context.authUser.user.emailVerified ? " Verified" : "Unverified email")), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, context.authUser.user.emailVerified ? /*#__PURE__*/React.createElement(VerifiedUserIcon, null) : /*#__PURE__*/React.createElement(SendIcon, null)))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(ListItem, {
    button: true,
    onClick: () => {
      navigate(pathnames.UserUpdatePassword);
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(Box, {
    p: 1
  }, /*#__PURE__*/React.createElement("strong", null, "PASSWORD"), /*#__PURE__*/React.createElement("br", null), "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022")), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(EditIcon, null)))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(ListItem, {
    button: true,
    onClick: () => {
      navigate(pathnames.UserDelete);
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    item: true,
    xs: 12,
    md: 4
  }, /*#__PURE__*/React.createElement(Box, {
    p: 1
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "error"
  }, /*#__PURE__*/React.createElement("strong", null, "DELETE ACCOUNT"))))))))));
};