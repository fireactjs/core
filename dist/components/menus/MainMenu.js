"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainMenu = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Home = _interopRequireDefault(require("@mui/icons-material/Home"));
var _AccountBox = _interopRequireDefault(require("@mui/icons-material/AccountBox"));
var _Fireact = require("../Fireact");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const MainMenu = _ref => {
  let {
    customItems
  } = _ref;
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const pathnames = config.pathnames;
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
  }))), customItems, profileUrl && [/*#__PURE__*/_react.default.createElement(_material.Divider, {
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