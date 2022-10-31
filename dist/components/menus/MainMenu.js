"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainMenu = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Home = _interopRequireDefault(require("@mui/icons-material/Home"));
var _AccountBox = _interopRequireDefault(require("@mui/icons-material/AccountBox"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MainMenu = _ref => {
  let {
    pathnames
  } = _ref;
  const profileUrl = pathnames.UserProfile;
  return /*#__PURE__*/_react.default.createElement(_material.List, {
    component: "nav"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: "/",
    style: {
      textDecoration: 'none'
    },
    key: "home"
  }, /*#__PURE__*/_react.default.createElement(_material.ListItemButton, null, /*#__PURE__*/_react.default.createElement(_material.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_Home.default, null)), /*#__PURE__*/_react.default.createElement(_material.ListItemText, {
    primary: /*#__PURE__*/_react.default.createElement(_material.Typography, {
      color: "textPrimary"
    }, "Home")
  }))), profileUrl && [/*#__PURE__*/_react.default.createElement(_material.Divider, {
    key: "profile-divider"
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: profileUrl,
    style: {
      textDecoration: 'none'
    },
    key: "profile"
  }, /*#__PURE__*/_react.default.createElement(_material.ListItemButton, null, /*#__PURE__*/_react.default.createElement(_material.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_AccountBox.default, null)), /*#__PURE__*/_react.default.createElement(_material.ListItemText, {
    primary: /*#__PURE__*/_react.default.createElement(_material.Typography, {
      color: "textPrimary"
    }, "My Profile")
  })))]);
};
exports.MainMenu = MainMenu;