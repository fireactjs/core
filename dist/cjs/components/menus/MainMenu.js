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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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