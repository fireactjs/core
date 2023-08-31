import "core-js/modules/web.dom-collections.iterator.js";
import { Avatar, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FireactContext } from "../Fireact";
export const UserMenu = _ref => {
  let {
    customItems
  } = _ref;
  const {
    config
  } = useContext(FireactContext);
  const pathnames = config.pathnames;
  const profileUrl = pathnames.UserProfile;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  return /*#__PURE__*/React.createElement(AuthContext.Consumer, null, context => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
    "ria-label": "account of current user",
    "aria-controls": "menu-appbar",
    onClick: handleMenu,
    "aria-haspopup": "true"
  }, /*#__PURE__*/React.createElement(Avatar, {
    alt: context.authUser.user.displayName,
    src: context.authUser.user.photoURL ? context.authUser.user.photoURL : "https://ui-avatars.com/api/?name=" + encodeURI(context.authUser.user.displayName) + "&background=007bff&size=64&color=f8f9fc"
  })), /*#__PURE__*/React.createElement(Menu, {
    id: "menu-appbar",
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    keepMounted: true,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    open: open,
    onClose: handleClose
  }, profileUrl && [/*#__PURE__*/React.createElement(MenuItem, {
    key: "profile-menu-item",
    onClick: e => {
      e.preventDefault();
      handleClose();
      navigate(profileUrl);
    }
  }, /*#__PURE__*/React.createElement(AccountBoxIcon, {
    sx: {
      marginRight: "10px"
    }
  }), " Profile"), /*#__PURE__*/React.createElement(Divider, {
    key: "profile-menu-divider"
  })], customItems, /*#__PURE__*/React.createElement(MenuItem, {
    onClick: e => {
      e.preventDefault();
      handleClose();
      const auth = getAuth();
      signOut(auth).then(() => {
        document.location.href = "/";
      });
    }
  }, /*#__PURE__*/React.createElement(ExitToAppIcon, {
    sx: {
      marginRight: "10px"
    }
  }), " Sign Out"))));
};