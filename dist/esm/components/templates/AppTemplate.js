import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.symbol.description.js";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useContext, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { AppBar as MuiAppBar, Box, CssBaseline, Drawer as MuiDrawer, IconButton, Toolbar, Divider, Typography, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Outlet, useNavigate } from "react-router-dom";
import { FireactContext } from "../Fireact";
const drawerWidth = 240;
const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});
const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: "calc(".concat(theme.spacing(7), " + 1px)"),
  [theme.breakpoints.up('sm')]: {
    width: "calc(".concat(theme.spacing(9), " + 1px)")
  }
});
const DrawerHeader = styled('div')(_ref => {
  let {
    theme
  } = _ref;
  return _objectSpread({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1)
  }, theme.mixins.toolbar);
});
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(_ref2 => {
  let {
    theme,
    open
  } = _ref2;
  return _objectSpread({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }, open && {
    marginLeft: drawerWidth,
    width: "calc(100% - ".concat(drawerWidth, "px)"),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  });
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(_ref3 => {
  let {
    theme,
    open
  } = _ref3;
  return _objectSpread(_objectSpread({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box'
  }, open && _objectSpread(_objectSpread({}, openedMixin(theme)), {}, {
    '& .MuiDrawer-paper': openedMixin(theme)
  })), !open && _objectSpread(_objectSpread({}, closedMixin(theme)), {}, {
    '& .MuiDrawer-paper': closedMixin(theme)
  }));
});
export const AppTemplate = _ref4 => {
  let {
    logo,
    drawerMenu,
    toolbarChildren,
    toolBarMenu
  } = _ref4;
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const {
    config
  } = useContext(FireactContext);
  const brand = config.brand;
  const navigate = useNavigate();
  return /*#__PURE__*/React.createElement(Box, {
    sx: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(AppBar, {
    position: "fixed",
    open: open
  }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(IconButton, {
    color: "inherit",
    "aria-label": "open drawer",
    onClick: handleDrawerOpen,
    edge: "start",
    sx: _objectSpread({
      marginRight: '36px'
    }, open && {
      display: 'none'
    })
  }, /*#__PURE__*/React.createElement(MenuIcon, null)), toolbarChildren, /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      marginRight: "0px"
    }
  }, toolBarMenu))), /*#__PURE__*/React.createElement(Drawer, {
    variant: "permanent",
    open: open
  }, /*#__PURE__*/React.createElement(DrawerHeader, null, open && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: '0px',
      marginRight: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      color: "#000000"
    },
    onClick: () => navigate("/")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      paddingRight: '20px'
    }
  }, logo), /*#__PURE__*/React.createElement(Typography, {
    variant: "h6"
  }, brand))), /*#__PURE__*/React.createElement(IconButton, {
    onClick: handleDrawerClose
  }, theme.direction === 'rtl' ? /*#__PURE__*/React.createElement(ChevronRightIcon, null) : /*#__PURE__*/React.createElement(ChevronLeftIcon, null))), /*#__PURE__*/React.createElement(Divider, null), drawerMenu, /*#__PURE__*/React.createElement(Divider, null)), /*#__PURE__*/React.createElement(Box, {
    component: "main",
    sx: {
      flexGrow: 1,
      backgroundColor: theme => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
      height: '100vh',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement(DrawerHeader, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    mt: 5,
    ml: 3,
    mr: 3,
    mb: 3
  }, /*#__PURE__*/React.createElement(Outlet, null)))));
};