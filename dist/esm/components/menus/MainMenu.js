import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { FireactContext } from "../Fireact";
export const MainMenu = _ref => {
  let {
    customItems
  } = _ref;
  const {
    config
  } = useContext(FireactContext);
  const pathnames = config.pathnames;
  const profileUrl = pathnames.UserProfile;
  return /*#__PURE__*/React.createElement(List, {
    component: "nav"
  }, /*#__PURE__*/React.createElement(NavLink, {
    to: "/",
    style: {
      textDecoration: 'none'
    },
    key: "home"
  }, /*#__PURE__*/React.createElement(ListItemButton, null, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(HomeIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
    primary: /*#__PURE__*/React.createElement(Typography, {
      color: "textPrimary"
    }, "Home")
  }))), customItems, profileUrl && [/*#__PURE__*/React.createElement(Divider, {
    key: "profile-divider"
  }), /*#__PURE__*/React.createElement(NavLink, {
    to: profileUrl,
    style: {
      textDecoration: 'none'
    },
    key: "profile"
  }, /*#__PURE__*/React.createElement(ListItemButton, null, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(AccountBoxIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
    primary: /*#__PURE__*/React.createElement(Typography, {
      color: "textPrimary"
    }, "My Profile")
  })))]);
};